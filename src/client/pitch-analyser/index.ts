import { detectAudioContext, detectGetUserMedia } from './detector';

import {
  calculateFrequency,
  calculateNote,
  calculateCents,
  toDecimals,
  throwError,
  logError,
} from './helpers';

export interface Pitch {
  frequency: number | null;
  note?: string;
  cents?: string | number;
}

// Default of options
export interface PitchAnaylserOptions {
  microphone: boolean;
  audioFile: boolean;
  callback: ((value: Pitch) => void);
  returnNote: boolean;
  returnCents: boolean;
  interval: number;
  decimals: number;
}

const defaultOptions = {
	microphone: true,
	audioFile: false,
	returnNote: true,
	returnCents: false,
	decimals: 2,
} as PitchAnaylserOptions;


class PitchAnalyser {
  lastFrequency?: number;
  audioContext?: AudioContext | null;
  audioAnalyser?: AnalyserNode | null;
  audioStream?: MediaStream;
  amplitude?: Uint8Array;
  audioSource?: MediaStreamAudioSourceNode;
  frequencies?: Float32Array;
  options?: PitchAnaylserOptions;
  lastFrame?: number;

  constructor(args: Partial<PitchAnaylserOptions>) {
    // Pass user given arguments to the options
    // A callback needs to be passed during the development stage
    if (!args.callback) {
      throw new Error("A callback needs to be passed");
    }

    this.options = { ...defaultOptions, ...args };
  }

  initAnalyser(callback?: Function) {
    return this.initialize().then(() => callback && callback());
  }

  startAnalyser = (callback?: Function) => {
    if (callback) {
      callback();
    }

    window.requestAnimationFrame(this.analysePitch);
  }

  resumeAnalyser(callback?: Function) {
    if (this.audioContext?.state === 'suspended') {
      this.audioContext.resume().then(() => {
        if (callback) {
          callback();
        }

        this.startAnalyser();
      });
    }
  }

  pauseAnalyser(callback?: Function) {
    if (this.audioContext?.state === 'running') {
      this.audioContext.suspend().then(() => callback && callback());
    }
  }

  stopAnalyser(callback?: Function) {
    this.audioContext?.close().then(() => {
      if (callback) {
        callback();
      }

      this.audioContext = null;
    });
  }

  // Get the frequencies and return values based on options
  analysePitch = (frame: number) => {
    if (this.lastFrame && (frame - this.lastFrame) < (this.options?.interval ||0)) {
      window.requestAnimationFrame(this.analysePitch);
      return;
    }

    this.lastFrame = frame;
    if (!this.frequencies) {
      return;
    }
    if (!this.audioAnalyser) {
      throw new Error("Audio analyser not initialized");
    }
    this.audioAnalyser.getFloatTimeDomainData(this.frequencies);

    const frequency = calculateFrequency(this.frequencies, { rate: this.audioContext?.sampleRate});

    if (frequency) {
      const { returnCents, returnNote, decimals, callback } = this.options!;

      const returnValue = {
        frequency: toDecimals(frequency, decimals),
      } as Pitch;

      if (returnNote) {
        const note = calculateNote(frequency);
        returnValue.note = note;
      }

      if (returnNote && returnCents) {
        if (this.lastFrequency) {
          const cents = calculateCents(frequency, this.lastFrequency);
          returnValue.cents = toDecimals(cents, decimals);
        }
        this.lastFrequency = frequency;
      }

      // Execute the callback. (Intended for returning the output)
      callback && callback(returnValue);
    }

    // Tells the browser we wish to perform an animation. Call callback before re-paint
    if (this.audioContext && this.audioContext.state === 'running') {
      window.requestAnimationFrame(this.analysePitch);
    }
  }
  frequencies1(frequencies: any) {
    throw new Error('Method not implemented.');
  }

  initialize() {
    // Feature detect and pass AudioContext to audioContext
    this.audioContext = detectAudioContext() || null;
    const getUserMedia = detectGetUserMedia();

    if (!(this instanceof PitchAnalyser)) {
      throwError("constructor needs to be called with the 'new' keyword");
    }


    // Check whether the browser does support the feature. audioContext = false or window.AudioContext
    if (!this.audioContext) {
      logError('Your browser does not support Audio Context');
    }

    // getUserMedia = window.getUserMedia(went through feature detects) or false
    if (!getUserMedia) {
      throw new Error('Your brower does not support getUserMedia');
    }


    // Start media stream
    return getUserMedia({ audio: true })
      .then((stream) => this.initiateStream(stream))
      .catch(throwError);
  }

  initiateStream(stream: MediaStream) {
    // Set the stream to audioStream
    this.audioStream = stream;

    if (!this.audioContext) {
      throw new Error("Audio stream not available");
    }

    // Initialize and assign a audio analyser
    this.audioAnalyser = this.audioContext.createAnalyser();


    // Create frequencies arrayholder
    this.frequencies = new Float32Array(this.audioAnalyser.frequencyBinCount);

    this.amplitude = new Uint8Array(this.audioAnalyser.frequencyBinCount);

    // Assign a stream source as main source
    this.audioSource = this.audioContext.createMediaStreamSource(this.audioStream);

    // Connect the audio to our analyser
    this.audioSource.connect(this.audioAnalyser);
  }
}

export default PitchAnalyser;

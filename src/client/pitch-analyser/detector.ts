const detectAudioContext = () => {
	// Safari still needs a prefix for this feature
	window.AudioContext = window.AudioContext || (window as any).webkitAudioContext;

	if (window.AudioContext) return new window.AudioContext();

	return false;
};

const mediaPromise = (constraints: MediaStreamConstraints)  => new Promise((resolve, reject) => {
	navigator.getUserMedia(constraints, resolve, reject);
});

const detectGetUserMedia = (): ((constraints: MediaStreamConstraints) => Promise<MediaStream>) | false => {
	navigator.getUserMedia = navigator.getUserMedia
	|| (navigator as any).webkitGetUserMedia
	|| (navigator as any).mozGetUserMedia;

	if ((navigator.mediaDevices && navigator.mediaDevices.getUserMedia) || navigator.getUserMedia) {
		return (navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
			? navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices)
			: mediaPromise as (constraints: MediaStreamConstraints) => Promise<MediaStream>;
	}

	return false;
};

export {
	detectAudioContext,
	detectGetUserMedia,
};

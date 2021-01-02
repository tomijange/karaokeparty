const A4 = 440;
const C0 = Math.round(A4 * Math.pow(2, -4.75)); // 16

export function frequencyToPitch(frequency: number) {
    const semiTonesAway = 12 * Math.log2(frequency / C0);
    return semiTonesAway;
}

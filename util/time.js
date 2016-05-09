export function secondsToTime(seconds) {
  let h = Math.floor(seconds / 3600);
  let m = Math.floor((seconds - (h * 3600)) / 60);
  let s = seconds - (h * 3600) - (m * 60);

  if (m < 10) { m = `0${m}`; }
  if (s < 10) { s = `0${s}`; }
  if (h <= 0) {
    if (h < 10) { h = `0${h}`; }
    return `${m}:${s}`;
  }
  return `${h}:${m}:${s}`;
}

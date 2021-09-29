export function playWinSound() {
  const el = document.getElementById('audio-win');
  if (el.play) {
    el.volume = 0.5;
    el.play();
  }
}

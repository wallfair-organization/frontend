export function playWinSound() {
  const el = document.getElementById('audio-win');
  if (el.play) {
    el.play();
  }
}

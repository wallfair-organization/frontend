export function playWinSound(volumeLevel = 0.2) {
  try {
    const el = document.getElementById('audio-win');
    if (el.play) {
      el.volume = volumeLevel;
      el.play();
    }
  } catch (e) {
    console.error(e);
  }
}

export function playWinSound() {
  try {
    const el = document.getElementById('audio-win');
    if (el.play) {
      el.volume = 0.5;
      el.play();
    }
  } catch (e) {
    console.error(e);
  }
}

export function playCrashSound() {
  try {
    const el = document.getElementById('audio-explode');
    if (el.play) {
      el.volume = 0.5;
      el.play();
    }
  } catch (e) {
    console.error(e);
  }
}

export function playFailSound() {
  try {
    const el = document.getElementById('audio-fail');
    if (el.play) {
      el.volume = 0.5;
      el.play();
    }
  } catch (e) {
    console.error(e);
  }
}

export function playWinSound(volumeLevel) {
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

export function playCrashSound(volumeLevel) {
  try {
    const el = document.getElementById('audio-explode');
    if (el.play) {
      el.volume = volumeLevel;
      el.play();
    }
  } catch (e) {
    console.error(e);
  }
}

export function playFailSound(volumeLevel = 0.5) {
  try {
    const el = document.getElementById('audio-fail');
    if (el.play) {
      el.volume = volumeLevel;
      el.play();
    }
  } catch (e) {
    console.error(e);
  }
}

export function playFlyingSound(volumeLevel = 0.5, seek = 0) {
  try {
    const el = document.getElementById('audio-flying');
    if (el.play) {
      el.volume = volumeLevel;
      el.play();
      if (seek > 1) {
        console.log(seek.toFixed());
        el.currentTime = seek.toFixed(0);
      }
    }
  } catch (e) {
    console.error(e);
  }
}

export function stopFlyingSound() {
  try {
    const el = document.getElementById('audio-flying');
    if (el.play) {
      el.pause();
      el.currentTime = 0;
    }
  } catch (e) {
    console.error(e);
  }
}

export function silenceAllSounds() {
  try {
    const el = document.getElementById('audio-flying');
    if (el.play) {
      el.volume = 0.0;
    }
  } catch (e) {
    console.error(e);
  }
}

export function resetAllSounds() {
  try {
    const el = document.getElementById('audio-flying');
    if (el.play) {
      el.volume = 0.5;
    }
  } catch (e) {
    console.error(e);
  }
}

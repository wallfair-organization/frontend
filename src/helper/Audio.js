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

export function playBetSound(volumeLevel) {
  try {
    const el = document.getElementById('audio-bet');
    if (el.play) {
      el.volume = volumeLevel;
      el.play();
    }
  } catch (e) {
    console.error(e);
  }
}

export function playLoseSound(volumeLevel) {
  try {
    const el = document.getElementById('audio-lose');
    if (el.play) {
      el.volume = volumeLevel;
      el.play();
    }
  } catch (e) {
    console.error(e);
  }
}

export function playGameoverSound(volumeLevel) {
  try {
    const el = document.getElementById('audio-gameover');
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

export function playFlyingSound(volumeLevel = 0.5, seek = 0, musicIndex = 0) {
  try {
    let el = document.getElementById('audio-flying');
    const r = Math.random();
    if (musicIndex === 1) {
      el = document.getElementById('audio-bgm');
    }
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
    const el2 = document.getElementById('audio-bgm');
    if (el?.play) {
      el.pause();
      el.currentTime = 0;
    }
    if (el2?.play) {
      el2.pause();
      el2.currentTime = 0;
    }
  } catch (e) {
    console.error(e);
  }
}

export function silenceAllSounds() {
  try {
    const el = document.getElementById('audio-flying');
    const el2 = document.getElementById('audio-bgm');
    if (el.play) {
      el.volume = 0.0;
      el2.volume = 0.0;
    }
  } catch (e) {
    console.error(e);
  }
}

export function resetAllSounds() {
  try {
    const el = document.getElementById('audio-flying');
    const el2 = document.getElementById('audio-bgm');
    if (el.play) {
      el.volume = 0.5;
      el2.volume = 0.5;
    }
  } catch (e) {
    console.error(e);
  }
}

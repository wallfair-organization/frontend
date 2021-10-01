import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

const VideoPlayer = props => {
  const {
    channel,
    video,
    autoPlay,
    className,
    title,
    muted,
    controls,
    loop,
    playsInline,
  } = props;
  const embedUrl = new URL(video);

  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);

  const options = {
    autoplay: autoPlay || true,
    controls: controls || false,
    muted: muted || true,
    responsive: true,
    fluid: true,
    loop: loop || false,
    playsInline: playsInline || true,
    sources: [
      {
        src: embedUrl.toString(),
      },
    ],
  };

  const onReady = player => {
    playerRef.current = player;

    player.on('waiting', () => {});

    player.on('dispose', () => {});
  };

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // init only once!
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
      }));
    } else {
      // const player = playerRef.current;
      // player.play();
      // player.src(options.sources);
    }
  }, [options]);

  return (
    <div className={classNames(styles.videoPlayerContainer)}>
      <video
        autoPlay={autoPlay}
        ref={videoRef}
        className={classNames(
          'video-js',
          'vjs-big-play-centered',
          styles.videoPlayer,
          className
        )}
        controls
        playsInline={options.playsInline}
      ></video>
    </div>
  );
};

export default VideoPlayer;

import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

const YoutubeVideo = props => {
  const {
    channel,
    video,
    embeddingDomains,
    targetId,
    autoPlay,
    muted,
    className,
    title,
    controls,
  } = props;
  const videoUrl = new URL(video);

  const getVideoId = () => {
    return videoUrl.searchParams.get('v');
  };

  const embedUrl = new URL(`https://www.youtube.com/embed/${getVideoId()}`);

  if (autoPlay) {
    embedUrl.searchParams.set('autoplay', 'true');
  }

  if (!controls) {
    embedUrl.searchParams.set('controls', '0');
  }

  return (
    <iframe
      title={title}
      className={classNames(styles.videoIframe, className)}
      allow={`accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture`}
      allowFullScreen={true}
      frameBorder={0}
      height="100%"
      src={embedUrl.toString()}
      width="100%"
    />
  );
};

export default YoutubeVideo;

import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

const DacastVideo = props => {
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
  const embedUrl = new URL(video);

  if (autoPlay) {
    embedUrl.searchParams.set('autoplay', 'true');
  }

  if (!controls) {
    embedUrl.searchParams.set('controls', 'false');
  }

  return (
    <iframe
      title={title}
      scrolling={'no'}
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

export default DacastVideo;

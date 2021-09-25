import React from 'react';
import _ from 'lodash';
import styles from './styles.module.scss';
import classNames from 'classnames';

const TwitchVideo = props => {
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

  const getStreamChannel = () => {
    let streamChannel = channel;

    if (!streamChannel) {
      streamChannel = video.split('/').pop();
    }

    return streamChannel;
  };

  const getId = () => {
    let id = 'twitch-embed';

    if (targetId) {
      id = id + '-' + targetId;
    }

    return id;
  };

  const urlObj = new URL('https://embed.twitch.tv');

  if (autoPlay) {
    urlObj.searchParams.set('autoplay', 'true');
  }

  if (muted) {
    urlObj.searchParams.set('muted', 'true');
  }

  urlObj.searchParams.set('video', video);
  urlObj.searchParams.set('allowfullscreen', 'true');
  urlObj.searchParams.set('channel', getStreamChannel());
  urlObj.searchParams.set('layout', 'video');

  urlObj.searchParams.set('controls', 'false');

  if (controls) {
    urlObj.searchParams.set('controls', 'true');
  }

  let urlParamParent = '';

  _.each(embeddingDomains, domain => {
    urlParamParent += `&parent=${domain}`;
  });

  return (
    <iframe
      sandbox="allow-modals allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      title={title}
      className={classNames(styles.videoIframe, className)}
      allow={`accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture`}
      allowFullScreen={true}
      frameBorder={0}
      height="100%"
      src={urlObj.toString() + urlParamParent}
      width="100%"
    />
  );
};

export default TwitchVideo;

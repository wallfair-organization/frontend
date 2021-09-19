import React from 'react';
import classNames from 'classnames';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';
import styles from './styles.module.scss';

const TwitchEmbedVideo = ({
  targetId,
  className,
  video,
  channel,
  autoPlay = true,
  muted = false,
  ...props
}) => {
  const embeddingDomains = ['main.wallfair.io', 'staging.wallfair.io'];

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

  return (
    <ReactTwitchEmbedVideo
      controls={true}
      {...props}
      targetId={getId()}
      targetClass={classNames(styles.twitchStream, className)}
      width={'100%'}
      height={'100%'}
      video={video}
      channel={getStreamChannel()}
      theme={'dark'}
      autoplay={autoPlay}
      muted={muted}
      allowfullscreen={true}
      layout={'video'}
      parent={embeddingDomains}
    />
  );
};

export default TwitchEmbedVideo;

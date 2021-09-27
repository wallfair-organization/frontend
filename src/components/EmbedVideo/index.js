import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import _ from 'lodash';

import Twitch from './Twitch';
import Trovo from './Trovo';
import Youtube from './Youtube';
import Dacast from './Dacast';
//try to guess not-supported stream and use some generic way to play the video
import Unknown from './Unknown';
import VideoPlayer from './VideoPlayer';

const VideoComponents = {
  twitch: Twitch,
  youtube: Youtube,
  trovo: Trovo,
  dacast: Dacast,
  unknown: Unknown,
  video_player: VideoPlayer,
};

const checkStreamType = url => {
  const urlObj = new URL(url);
  const host = _.get(urlObj, 'host');
  const pathname = _.get(urlObj, 'pathname');

  if (host.indexOf('youtube') > -1) {
    return 'youtube';
  } else if (host.indexOf('twitch') > -1) {
    return 'twitch';
  } else if (host.indexOf('trovo') > -1) {
    return 'trovo';
  } else if (host.indexOf('dacast') > -1) {
    return 'dacast';
  } else if (pathname.indexOf('m3u8') > -1) {
    return 'video_player';
  } else {
    return 'unknown';
  }
};

const UniversalVideoEmbed = props => {
  const {
    targetId,
    className,
    video,
    channel,
    autoPlay = true,
    muted = false,
    controls,
  } = props;

  const streamType = checkStreamType(video);
  const embeddingDomains = [
    'main.wallfair.io',
    'staging.wallfair.io',
    'demo.wallfair.io',
    'play.wallfair.io',
    'localhost',
  ];

  const SelectedComponent = _.get(VideoComponents, streamType);

  return (
    <div className={classNames(styles.universalStream, className)}>
      <SelectedComponent
        {...props}
        width={'100%'}
        height={'100%'}
        video={video}
        controls={controls}
        embeddingDomains={embeddingDomains}
        autoplay={autoPlay}
        muted={muted}
      />
    </div>
  );
};

export default React.memo(UniversalVideoEmbed);

import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import _ from 'lodash';

import Twitch from './Twitch';
import Trovo from './Trovo';
import Youtube from './Youtube';
import Dacast from './Dacast';

const VideoComponents = {
  twitch: Twitch,
  youtube: Youtube,
  trovo: Trovo,
  dacast: Dacast,
  unknown: null,
};

const checkStreamType = url => {
  const urlObj = new URL(url);
  const host = _.get(urlObj, 'host');

  if (host.indexOf('youtube') > -1) {
    return 'youtube';
  } else if (host.indexOf('twitch') > -1) {
    return 'twitch';
  } else if (host.indexOf('trovo') > -1) {
    return 'trovo';
  } else if (host.indexOf('dacast') > -1) {
    return 'dacast';
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

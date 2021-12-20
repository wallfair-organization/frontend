import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { useIsMount } from '../hoc/useIsMount';
import _ from 'lodash';
import classNames from 'classnames';
import ShareType from './ShareType';
import { FacebookIcon } from 'react-share';
import { TwitterIcon } from 'react-share';
import { TelegramIcon } from 'react-share';
import { RedditIcon } from 'react-share';
import { FacebookShareButton } from 'react-share';
import { TwitterShareButton } from 'react-share';
import { TelegramShareButton } from 'react-share';
import { RedditShareButton } from 'react-share';
import { PopupActions } from '../../store/actions/popup';

import InputBox from '../InputBox';
import InputBoxTheme from '../InputBox/InputBoxTheme';

const SharePopup = props => {
  const {
    className,
    shareIconTypes,
    hidePopup,
    visible,
    shortUrl,
    realUrl,
    dynamicTitle,
    dynamicText,
    dynamicHashtags,
  } = props;
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (visible) {
    }
  }, [visible]);

  let isNativeShare = false;

  // if (navigator.share) {
  //   isNativeShare = true;
  // }

  // const handleNativeShare = () => {
  //   if (navigator.share) {
  //     navigator
  //       .share({
  //         title: dynamicTitle,
  //         text: dynamicText,
  //         url: realUrl,
  //       })
  //       .then(() => console.log('Successful share'))
  //       .catch(error => console.log('Error sharing', error));
  //   } else {
  //     console.log('Share not supported on this browser, do it the old way.');
  //   }
  // };

  const renderShareIcon = shareIconType => {
    const iconSize = 26;

    switch (shareIconType) {
      // @formatter:off
      case ShareType.facebook:
        return (
          <FacebookShareButton
            title={dynamicTitle}
            url={realUrl}
            openShareDialogOnClick={isNativeShare ? false : true}
            // beforeOnClick={handleNativeShare}
          >
            <FacebookIcon size={iconSize} round={true} />
          </FacebookShareButton>
        );
      case ShareType.twitter:
        return (
          <TwitterShareButton
            title={dynamicTitle}
            url={realUrl}
            openShareDialogOnClick={isNativeShare ? false : true}
            // beforeOnClick={handleNativeShare}
          >
            <TwitterIcon size={iconSize} round={true} />
          </TwitterShareButton>
        );
      case ShareType.telegram:
        return (
          <TelegramShareButton
            title={dynamicTitle}
            url={realUrl}
            openShareDialogOnClick={isNativeShare ? false : true}
            // beforeOnClick={handleNativeShare}
          >
            <TelegramIcon size={iconSize} round={true} />
          </TelegramShareButton>
        );
      case ShareType.reddit:
        return (
          <RedditShareButton
            title={dynamicTitle}
            url={realUrl}
            openShareDialogOnClick={isNativeShare ? false : true}
            // beforeOnClick={handleNativeShare}
          >
            <RedditIcon size={iconSize} round={true} />
          </RedditShareButton>
        );
    }
  };

  const renderShareIcons = () => {
    return _.map(shareIconTypes, (shareIconType, index) => (
      <div className={styles.shareIcon} key={index + shareIconType}>
        {renderShareIcon(shareIconType)}
      </div>
    ));
  };

  return (
    <div className={classNames(styles.sharePopupContainer, className)}>
      <h3 className={styles.headline}>Share With Your Friends</h3>
      <div>
        <div className={styles.shareButtons}>{renderShareIcons()}</div>
      </div>
      <div className={styles.separator}></div>
      <div
        className={copied ? styles.inputContainerCopied : styles.inputContainer}
      >
        <InputBox
          type={'text'}
          value={shortUrl}
          onClick={(e, val) => {
            setCopied(true);
            document.getSelection().removeAllRanges();
          }}
          theme={InputBoxTheme.copyToClipboardInput}
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    type: state.popup.popupType,
    visible: state.popup.visible,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: (popupType, options) => {
      dispatch(
        PopupActions.show({
          popupType,
          options,
        })
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SharePopup);

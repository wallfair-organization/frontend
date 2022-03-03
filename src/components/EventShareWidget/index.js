import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import {ReactComponent as GiftIcon} from 'data/icons/gift-icon.svg';
import {ReactComponent as CloseIcon} from 'data/icons/close.svg';
import InputBoxTheme from 'components/InputBox/InputBoxTheme';
import InputBox from 'components/InputBox';
import ShareType from 'components/Share/ShareType';
import { FacebookIcon, FacebookShareButton, RedditIcon, RedditShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton } from 'react-share';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import { shortenerTinyUrl } from 'api';
import { TOKEN_NAME } from 'constants/Token';
import { currencyDisplay } from 'helper/Currency';

const EventShareWidget = ({authentication}) => {

  const defaultSharing = ['facebook', 'twitter', 'telegram', 'reddit'];
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(true);
  const location = useLocation();

  const urlOrigin = window.location.origin;
  const urlPath = location.pathname;

  const userId = _.get(authentication, 'userId');

  let realUrl = new URL(urlOrigin + urlPath);
  
  if (userId) {
    realUrl.searchParams.set('ref', userId);
  }

  let isNativeShare = false;

  useEffect(() => {
    (async () => {
        const shorterUrl = await shortenerTinyUrl(realUrl.toString()).catch(
          err => {
            console.error('[Share shortenerTinyUrl]', err);
          }
        );

        setShortUrl(_.get(shorterUrl, 'response.data', null));
    })();
  }, []);

  const renderShareIcon = shareIconType => {
    const iconSize = 26;

    switch (shareIconType) {
      // @formatter:off
      case ShareType.facebook:
        return (
          <FacebookShareButton
            title={''}
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
            title={''}
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
            title={''}
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
            title={''}
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
    return _.map(defaultSharing, (shareIconType, index) => (
      <div className={styles.shareIcon} key={index + shareIconType}>
        {renderShareIcon(shareIconType)}
      </div>
    ));
  };

  return (
    <div className={classNames(styles.eventShareContainer, !visible ? styles.closed : null)}>
      {/* <CloseIcon onClick={() => { setVisible(false) }} className={styles.closeIcon} /> */}
      <div className={styles.leftContainer}>
        <GiftIcon />
        <span>Share this event <span className={styles.yellow}>and get 50 {currencyDisplay(TOKEN_NAME)}</span></span>
      </div>
      <div className={styles.rightContainer}>
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
          theme={InputBoxTheme.copyToClipboardInputBoxSmall}
        />
        </div>
        <div>
          <div className={styles.shareButtons}>{renderShareIcons()}</div>
        </div>
      </div>

    </div>
  );
};

const mapStateToProps = state => {
  return {
    authentication: state.authentication,
  };
};

export default connect(mapStateToProps, null)(EventShareWidget);

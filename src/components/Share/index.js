import React, { useEffect, useState, useRef, useCallback } from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames';
import Popup from './popup';
import { PopupActions } from '../../store/actions/popup';
import PopupTheme from '../Popup/PopupTheme';
import { useIsMount } from '../hoc/useIsMount';
import { shortenerTinyUrl } from '../../api';
import { useHistory, useLocation } from 'react-router';
import Icon from '../Icon';
import IconType from '../Icon/IconType';
import IconTheme from '../Icon/IconTheme';
import { useOutsideClick } from 'hooks/useOutsideClick';
import { isMobile } from 'react-device-detect';

const Share = props => {
  const {
    className,
    shareIconTypes,
    authentication,
    popupPosition,
    directUrl,
    dynamicTitle,
    dynamicText,
    skipCalculatePos,
  } = props;

  const defaultSharing = ['facebook', 'twitter', 'telegram', 'reddit'];
  const shareButtonRef = useRef();

  const [shortUrl, setShortUrl] = useState();
  const [showPopover, setShowPopover] = useState(false);
  const isMounted = useIsMount();
  const location = useLocation();

  const urlOrigin = window.location.origin;
  const urlPath = location.pathname;

  const userId = _.get(authentication, 'userId');

  let realUrl = new URL(urlOrigin + urlPath);

  if (directUrl) {
    realUrl = new URL(directUrl);
  }

  realUrl.searchParams.set('ref', userId);

  const closeOutside = useOutsideClick(() => {
    setShowPopover(false);
  });

  useEffect(() => {
    (async () => {
      if (isMounted) {
        const shorterUrl = await shortenerTinyUrl(realUrl.toString()).catch(
          err => {
            console.error('[Share shortenerTinyUrl]', err);
          }
        );

        setShortUrl(_.get(shorterUrl, 'response.data', null));
      }
    })();
  }, [isMounted]);

  let popoverTopSpacing = 0;

  if (shareButtonRef.current) {
    const target = shareButtonRef.current;
    const coords = target.getBoundingClientRect();
    popoverTopSpacing = coords.top + coords.height + 15;
  }

  let matchMedia = window.matchMedia(`(max-width: ${768}px)`).matches;

  const handleShareClicked = useCallback(
    async event => {
      const shareData = {
        title: dynamicTitle,
        text: dynamicText,
        url: realUrl,
      };

      try {
        if (navigator.canShare && isMobile) {
          await navigator.share(shareData);
          setShowPopover(false);
          return;
        } else {
          setShowPopover(show => !show);
        }
      } catch (err) {
        console.log(`native share error`, err);
        if (!err.toString().includes('AbortError')) {
          setShowPopover(show => !show);
        }
      }
    },
    [dynamicTitle, dynamicText, realUrl]
  );

  return (
    <div
      ref={closeOutside}
      className={classNames(styles.shareTrigger, className)}
    >
      <div className={styles.ShareButtonContainer}>
        <div
          ref={shareButtonRef}
          className={classNames(styles.shareButton)}
          onClick={handleShareClicked}
        >
          <div className={styles.shareIcon}>
            <Icon iconType={IconType.shareLink} iconTheme={IconTheme.primary} />
          </div>{' '}
          Share
          <div
            onClick={e => {
              e.stopPropagation();
            }}
            style={_.extend(
              {
                display: showPopover ? 'block' : 'none',
              },
              matchMedia && !skipCalculatePos
                ? {
                    top: `${popoverTopSpacing}px`,
                    position: 'fixed',
                  }
                : {}
            )}
            className={classNames(
              styles.sharePopover,
              styles[`popup-position-${popupPosition}`]
            )}
          >
            <Popup
              mobileTopSpacing={popoverTopSpacing}
              shareIconTypes={shareIconTypes || defaultSharing}
              realUrl={realUrl.toString()}
              shortUrl={shortUrl}
              popupPosition={popupPosition}
              dynamicTitle={dynamicTitle || ''}
              dynamicText={dynamicText || ''}
            />
          </div>
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

const mapDispatchToProps = dispatch => {
  return {
    showPopup: (popupType, options) => {
      dispatch(
        PopupActions.show({
          popupType,
          options,
        })
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Share);

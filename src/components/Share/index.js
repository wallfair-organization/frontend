import React, { useEffect, useState, useRef } from 'react';
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

  return (
    <div
      ref={closeOutside}
      className={classNames(styles.shareTrigger, className)}
    >
      <div className={styles.ShareButtonContainer}>
        <div
          ref={shareButtonRef}
          className={classNames(styles.shareButton)}
          onClick={e => {
            setShowPopover(show => !show);
          }}
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
                opacity: showPopover ? 1 : 0,
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

import _ from 'lodash';
import ReactCanvasConfetti from 'react-canvas-confetti';
import styles from './styles.module.scss';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from '../Popup/PopupTheme';
import { connect } from 'react-redux';
import useConfettiAnimation from 'hooks/useConfettiAnimation';
import { Link, useLocation } from 'react-router-dom';
import BetCard from 'components/BetCard';
import ShareType from 'components/Share/ShareType';
import { FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton } from 'react-share';
import ConfirmCongrat from '../../data/images/confirm-congrat.png';
import { useEffect, useState } from 'react';
import { useIsMount } from 'components/hoc/useIsMount';
import { shortenerTinyUrl } from 'api';

const EventConfirmationView = ({ authentication, visible, hidePopup, options }) => {
  const defaultSharing = ['facebook', 'twitter', 'discord'];
  const { getAnimationInstance, canvasStyles } = useConfettiAnimation({
    visible,
  });

  const [shortUrl, setShortUrl] = useState('');

  const {event} = options;
  const location = useLocation();
  const isMounted = useIsMount();

  const urlOrigin = window.location.origin;
  const urlPath = location.pathname;

  const userId = _.get(authentication, 'userId');

  let realUrl = new URL(urlOrigin + urlPath);
  
  let isNativeShare = false;

  useEffect(() => {
    (async () => {
      if (isMounted) {
        let realUrl = new URL(`${urlOrigin}${urlPath}${userId ? `?ref=${userId}` : ``}`);
        
        const shorterUrl = await shortenerTinyUrl(realUrl.toString()).catch(
          err => {
            console.error('[Share shortenerTinyUrl]', err);
          }
        );

        setShortUrl(_.get(shorterUrl, 'response.data', null));
      }
    })();
  }, [isMounted]);

  const renderBetCard = () => {
    const bet = event?.bet;
    const betId = _.get(event?.bet, 'id');
    const eventSlug = _.get(event, 'slug');
    const tags = _.get(event, 'tags');
    const marketQuestion = _.get(bet, 'market_question');
    const outcomes = _.get(bet, 'outcomes');

    return (
      <Link
        key={betId}
        to={{
          pathname: `/trade/${eventSlug}`,
          state: { fromLocation: location },
        }}
        className={styles.eventLink}
      >
        <BetCard
          key={betId}
          betId={betId}
          title={marketQuestion}
          organizer={''}
          image={event?.preview_image_url}
          eventEnd={bet?.end_date}
          outcomes={outcomes}
          eventCardClass={styles.eventCardHome}
          category={event?.category ? event.category : 'all'}
          isBookmarked={!!bet?.bookmarks?.includes(userId)}
          tags={tags}
          onBookmark={() => {}}
          onBookmarkCancel={() => {}}
        />
      </Link>
    );
  };
  
  const renderShareIcon = shareIconType => {
    const iconSize = 26;

    switch (shareIconType) {
      // @formatter:off
      case ShareType.facebook:
        return (
          <FacebookShareButton
            quote={''}
            url={shortUrl}
            tag={'wallfair'}
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
            url={shortUrl}
            hashtags={['wallfair']}
            openShareDialogOnClick={isNativeShare ? false : true}
            // beforeOnClick={handleNativeShare}
          >
            <TwitterIcon size={iconSize} round={true} />
          </TwitterShareButton>
        );
      case ShareType.discord:
        return (
          <TelegramShareButton
            title={''}
            url={shortUrl}
            openShareDialogOnClick={isNativeShare ? false : true}
            // beforeOnClick={handleNativeShare}
          >
            <TelegramIcon size={iconSize} round={true} />
          </TelegramShareButton>
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
    <div className={styles.eventCreateContainer}>
      <span className={styles.headLine}>
        Awesome! <br />
        Share your new event to your <br />
        friends
      </span>

      <div className={styles.eventOverview}>
        {renderBetCard()}
        <img src={ConfirmCongrat} alt='confirm-congrat' />
      </div>

      <div className={styles.shareButtons}>{renderShareIcons()}</div>
      
      <span className={styles.skipButton} onClick={hidePopup}>Skip for now</span>

      <ReactCanvasConfetti
        refConfetti={getAnimationInstance}
        style={canvasStyles}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
  };
};

const mapStateToProps = state => {
  return {
    authentication: state.authentication,
    visible:
      state.popup.popupType === PopupTheme.eventConfirmation && state.popup.visible,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventConfirmationView);

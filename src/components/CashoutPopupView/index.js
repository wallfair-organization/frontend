import _ from 'lodash';
import styles from './styles.module.scss';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from '../Popup/PopupTheme';
import { connect, useSelector } from 'react-redux';
import useConfettiAnimation from 'hooks/useConfettiAnimation';
import { Link, useLocation } from 'react-router-dom';
import BetCard from 'components/BetCard';
import ShareType from 'components/Share/ShareType';
import { FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton } from 'react-share';
import ConfirmCongrat from '../../data/images/coins-popup.png';
import ShadowAmount from '../../data/images/cashout-amount-shadow.png';
import { TOKEN_NAME } from 'constants/Token';
import { convertAmount, currencyDisplay } from 'helper/Currency';
import { useEffect, useState } from 'react';
import { shortenerTinyUrl } from 'api';
import { useIsMount } from 'components/hoc/useIsMount';
import { formatToFixed } from 'helper/FormatNumbers';
import { selectUser } from 'store/selectors/authentication';
import { selectPrices } from 'store/selectors/info-channel';

const CashoutPopupView = ({ authentication, visible, hidePopup, options }) => {
  const defaultSharing = ['facebook', 'twitter', 'discord'];
  const [shortUrl, setShortUrl] = useState('');
  // const { getAnimationInstance, canvasStyles } = useConfettiAnimation({
  //   visible,
  // });

  const { gamesCurrency } = useSelector(selectUser);
  const prices = useSelector(selectPrices);
  
  const { multiplier, amount, game } = options;

  const location = useLocation();
  const isMounted = useIsMount();

  const urlOrigin = window.location.origin;
  const urlPath = location.pathname;

  const userId = _.get(authentication, 'userId');

  let isNativeShare = false;

  const shareMessage = `I have won ${amount} ${currencyDisplay(TOKEN_NAME)} with a multiple of ${multiplier}x! Play ${game} now!`;

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
  
  const renderShareIcon = shareIconType => {
    const iconSize = 26;

    switch (shareIconType) {
      // @formatter:off
      case ShareType.facebook:
        return (
          <FacebookShareButton
            quote={`${shareMessage} #wallfair`}
            url={shortUrl}
            hashtag="wallfair"
            openShareDialogOnClick={isNativeShare ? false : true}
            // beforeOnClick={handleNativeShare}
          >
            <FacebookIcon size={iconSize} round={true} />
          </FacebookShareButton>
        );
      case ShareType.twitter:
        return (
          <TwitterShareButton
            title={shareMessage}
            url={shortUrl}
            hashtags={["wallfair"]}
            openShareDialogOnClick={isNativeShare ? false : true}
            // beforeOnClick={handleNativeShare}
          >
            <TwitterIcon size={iconSize} round={true} />
          </TwitterShareButton>
        );
      case ShareType.discord:
        return (
          <TelegramShareButton
            title={`${shareMessage} #wallfair`}
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
    <div className={styles.cashoutPopupContainer}>
      <span className={styles.headLine}>
        Congratulations! <br />
        You have won
      </span>

      <div className={styles.cashoutContent}>
        <span className={styles.cashoutAmount}>
          <img src={ShadowAmount} className={styles.shadow} alt="amount" />
          {/* <span className={styles.amount}>{`${amount} ${currencyDisplay(TOKEN_NAME)}`}</span> */}
          <span className={styles.amount}>
            {gamesCurrency !== TOKEN_NAME
            ? `${convertAmount(
                amount,
                prices[gamesCurrency]
              )} ${gamesCurrency}`
            : `${formatToFixed(amount, 0, true)} ${currencyDisplay(
                TOKEN_NAME
            )}`}
          </span>
        </span>
        <span className={styles.multiplier}>
          {multiplier}x
        </span>
        <img className={styles.congratsConfetti} src={ConfirmCongrat} alt='confirm-congrat' />
      </div>

      <div className={styles.shareContainer}>
        <span>Share your success:</span>
        <div className={styles.shareButtons}>
          {renderShareIcons()}
        </div>
      </div>
      
      <span className={styles.skipButton} onClick={hidePopup}>Keep playing</span>

      {/* <ReactCanvasConfetti
        refConfetti={getAnimationInstance}
        style={canvasStyles}
      /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(CashoutPopupView);

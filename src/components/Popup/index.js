import classNames from 'classnames';
import Icon from '../Icon';
import IconTheme from '../Icon/IconTheme';
import IconType from '../Icon/IconType';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { PopupActions } from '../../store/actions/popup';
import { useEffect } from 'react';
import PopupTheme from './PopupTheme';
import BetView from '../BetView';
import _ from 'lodash';
import ReferralList from '../ReferralList';
import BetApproveView from '../BetApproveView';
import WelcomeView from '../WelcomeView';
import SignUpPopup from '../SignUpPopup';
import TradeDetailView from '../TradeDetailView';
import TradeViewPopup from '../TradeViewPopup';
import EventDetailView from '../EventDetailView';
import WithdrawalSuccessPopup from '../WithdrawalSuccessPopup';
import DepositSuccessPopup from '../DepositSuccessPopup';
import EvaluateEventPopup from '../EvaluateEventPopup';
import ReportEventPopup from '../ReportEventPopup';
import JoinPopup from '../JoinPopup';
import VerifyEmailPopup from '../VerifyEmailPopup';
import PulloutApprovePopup from '../PulloutApprovePopup';
import DialogActionPopup from '../DialogActionPopup';
import DialogActions from 'components/DialogActionPopup/DialogActions';
import LotteryGamePopup from '../LotteryGamePopup';
import NewEventPopup from '../NewEventPopup';
import EditEventPopup from '../EditEventPopup';
import NewBetPopup from '../NewBetPopup';
import EditBetPopup from '../EditBetPopup';
import AuthenticationPopup from '../AuthenticationPopup';
import ViewImagePopup from 'components/ViewImagePopup';
import ResolveBetPopup from 'components/ResolveBetPopup';
import { useOutsideClick } from 'hooks/useOutsideClick';
import AuthenticationType from 'components/Authentication/AuthenticationType';
import ExplanationViewPopup from 'components/ExplanationViewPopup';
import DisclaimerPopupView from 'components/DisclaimerPopupView';
import UsernamePopup from 'components/UsernamePopup';
import AlphaPlatformPopup from 'components/AlphaPlatformPopup';
import RequestTokensPopup from '../RequestTokensPopup';
import LastGamesDetailPopup from '../LastGamesDetailPopup';
import AlpacaBuilderPopup from 'components/AlpacaBuilderPopup';
import WalletBuyWfairPopup from 'components/WalletBuyWfairPopup/WalletBuyWfairPopup';
import FairnessPopup from "../FairnessPopup";
import SingleGameDetailPopup from "../SingleGameDetailPopup";
import TransakSuccess from "../TransakSuccess";
import TxModal from 'components/TxModal';
import WalletWithdrawPopup from 'components/WalletBuyWfairPopup/WalletWithdrawPopup';
import ToSPopup from 'components/ToSPopup';

const Popup = ({ type, visible, options = {}, hidePopup }) => {
  const small = _.get(options, 'small', false);
  const maxWidth = _.get(options, 'maxWidth', false);

  useEffect(() => {
    const close = e => {
      if ([PopupTheme.disclaimer, PopupTheme.acceptToS].includes(type)) return;
      // Keycode is deprecated: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
      // Adding still for older browsers
      if (e?.keyCode === 27 || e?.key === 'Escape') {
        hidePopup();
      }
    };

    visible && window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [hidePopup, visible]);

  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [visible]);

  const popupElement = useOutsideClick(() => {
    if (
      PopupTheme.newEvent ||
      PopupTheme.editEvent ||
      PopupTheme.newBet ||
      PopupTheme.editBet
    )
      return;
    hidePopup();
  });

  const renderPopup = () => {
    const eventId = _.get(options, 'eventId');
    const betId = _.get(options, 'betId', _.get(options, 'tradeId'));
    const initialSellTab = _.get(options, 'initialSellTab', false);
    const withdrawalSuccessOptions = { ...options?.withdrawal };
    const depositSuccessOptions = { ...options?.deposit };
    const evaluateEventOptions = { ...options?.bet };
    if (!visible) {
      return null;
    }

    switch (type) {
      case PopupTheme.betApprove:
        return <BetApproveView options={options} />;

      case PopupTheme.betView:
        return (
          <BetView
            isPopup={true}
            closed={!visible}
            initialSellTab={initialSellTab}
            forceSellView={initialSellTab}
            disableSwitcher={initialSellTab}
          />
        );

      case PopupTheme.eventDetails:
        return <EventDetailView eventId={eventId} />;

      case PopupTheme.referralList:
        return <ReferralList closed={!visible} />;

      case PopupTheme.tradeDetails:
        return <TradeDetailView tradeId={betId} />;

      case PopupTheme.welcome:
        return (
          <WelcomeView
            closed={!visible}
            initialReward={options?.initialReward}
          />
        );
      case PopupTheme.signUpNotificationFirst:
      case PopupTheme.signUpNotificationSecond:
        return <SignUpPopup closed={!visible} />;
      case PopupTheme.tradeView:
        return (
          <TradeViewPopup
            eventId={eventId}
            betId={betId}
            openBets={_.get(options, 'openBets', [])}
          />
        );

      case PopupTheme.withdrawalSuccess:
        return (
          <WithdrawalSuccessPopup
            amountReceived={withdrawalSuccessOptions.amountReceived}
            currency={withdrawalSuccessOptions.currency}
            wfairAmount={withdrawalSuccessOptions.wfairAmount}
            btcEquivalent={withdrawalSuccessOptions.btcEquivalent}
            fee={withdrawalSuccessOptions.fee}
          />
        );
      case PopupTheme.deposit:
        return <DepositSuccessPopup address={depositSuccessOptions.address} />;
      case PopupTheme.evaluateEvent:
        return (
          <EvaluateEventPopup
            betQuestion={evaluateEventOptions.question}
            hidePopup={hidePopup}
          />
        );
      case PopupTheme.reportEvent:
        return <ReportEventPopup />;
      case PopupTheme.lastGamesDetail:
        return <LastGamesDetailPopup data={options?.data} />;
      case PopupTheme.fairnessPopup:
        return <FairnessPopup data={options?.data} />;
      case PopupTheme.singleGamesDetail:
        return <SingleGameDetailPopup data={options?.data} />;
      case PopupTheme.loginRegister:
        return <JoinPopup />;
      case PopupTheme.verifyEmail:
        return <VerifyEmailPopup closed={false} />;

      case PopupTheme.pulloutApprove:
        return <PulloutApprovePopup betData={_.get(options, 'betData')} />;

      case PopupTheme.lotteryGameAnswered:
        return (
          <LotteryGamePopup hidePopup={hidePopup} rewardId={options.rewardId} />
        );
      case PopupTheme.newEvent:
        return <NewEventPopup eventType={options.eventType} />;
      case PopupTheme.editEvent:
        return <EditEventPopup />;
      case PopupTheme.deleteEvent:
        return (
          <DialogActionPopup
            data={options?.event}
            actionType={DialogActions.deleteEvent}
          />
        );
      case PopupTheme.disableSharing:
        return <DialogActionPopup actionType={DialogActions.disableSharing} />;
      case PopupTheme.newBet:
        return <NewBetPopup />;
      case PopupTheme.editBet:
        return <EditBetPopup />;
      case PopupTheme.viewImage:
        return <ViewImagePopup imageURL={options.imageURL} />;
      case PopupTheme.resolveBet:
        return (
          <ResolveBetPopup betId={options.tradeId} eventId={options.eventId} />
        );
      case PopupTheme.cancelBet:
        return (
          <DialogActionPopup
            data={options?.bet}
            actionType={DialogActions.cancelBet}
          />
        );
      case PopupTheme.deleteBet:
        return (
          <DialogActionPopup
            data={options?.bet}
            actionType={DialogActions.deleteBet}
          />
        );
      case PopupTheme.auth:
        return (
          <AuthenticationPopup
            authenticationType={
              options.authenticationType || AuthenticationType.register
            }
            preloadEmailSignUp={options?.preloadEmailSignUp}
          />
        );
      case PopupTheme.explanation:
        return <ExplanationViewPopup type={options.type} closed={!visible} />;
      case PopupTheme.alphaPlatform:
        return <AlphaPlatformPopup />;
      case PopupTheme.disclaimer:
        return <DisclaimerPopupView />;
      case PopupTheme.username:
        return <UsernamePopup initialReward={options.initialReward} />;
      case PopupTheme.requestTokens:
        return <RequestTokensPopup />;
      case PopupTheme.alpacaBuilder:
        return <AlpacaBuilderPopup {...options}/>;

      case PopupTheme.walletBuyWfair:
        return <WalletBuyWfairPopup />;
      case PopupTheme.walletWithdraw:
        return <WalletWithdrawPopup />;
      case PopupTheme.transakSuccess:
        return <TransakSuccess options={options} />;
      case PopupTheme.txModal:
        return <TxModal />;
      case PopupTheme.acceptToS:
        return <ToSPopup isOnboarding={options?.isOnboarding} />;
    }

    return null;
  };

  return (
    <>
      <div
        className={classNames(
          styles.modal,
          visible ? null : styles.hidden,
          type === PopupTheme.disclaimer ? styles.disclaimerContainer : null
        )}
      >
        <div
          ref={popupElement}
          className={classNames(
            styles.modalDialog,
            type === PopupTheme.walletBuyWfair ? styles.walletBuyWfair : null,
            type === PopupTheme.disclaimer ? styles.disclaimerContainer : null,
            type === PopupTheme.explanation
              ? styles.explanationPopupVisual
              : null,
            type === PopupTheme.alphaPlatform
              ? styles.alphaPlatformPopupVisual
              : null,
            type === PopupTheme.signUpNotificationFirst ||
              type === PopupTheme.signUpNotificationSecond
              ? styles.signUpPopupContainer
              : null,
            type === PopupTheme.loginRegister
              ? styles.joinPopupContainer
              : null,
            type === PopupTheme.welcome ? styles.welcomeContainer : null,
            type === PopupTheme.betApprove ? styles.betApproveContainer : null,
            type === PopupTheme.username ? styles.usernamePopup : null,
            type === PopupTheme.alpacaBuilder ? styles.alpacaBuilderPopup : null,
            small ? styles.small : null,
            maxWidth ? styles.maxWidth : null,
            type === PopupTheme.auth &&
              styles.registrationPopupContainer,
            [
              PopupTheme.signUpNotificationFirst,
              PopupTheme.signUpNotificationSecond,
            ].includes(type) && styles.signUpNotificationPopupContainer
          )}
        >
          <div className={styles.modalContent}>
            <div className={styles.closeButtonContainer}>
              {![
                PopupTheme.signUpNotificationSecond,
                PopupTheme.disclaimer,
                PopupTheme.acceptToS,
              ].includes(type)
                 && (
                  <Icon
                    width={30}
                    height={30}
                    className={styles.closeButton}
                    iconType={IconType.close}
                    onClick={hidePopup}
                  />
                )}
            </div>

            {renderPopup()}
          </div>
        </div>
      </div>
      <div
        className={classNames(
          styles.modalBackdrop,
          visible ? null : styles.hidden
        )}
      ></div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    type: state.popup.popupType,
    options: state.popup.options,
    visible: state.popup.visible,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Popup);

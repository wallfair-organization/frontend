import React            from 'react';
import classNames       from 'classnames';
import Icon             from '../Icon';
import IconTheme        from '../Icon/IconTheme';
import IconType         from '../Icon/IconType';
import styles           from './styles.module.scss';
import { connect }      from 'react-redux';
import { PopupActions } from '../../store/actions/popup';
import { useEffect }    from 'react';
import PopupTheme       from './PopupTheme';
import BetCreation      from '../BetCreation';
import BetView          from '../BetView';
import _                from 'lodash';
import ReferralList     from '../ReferralList';
import BetApproveView   from '../BetApproveView';
import WelcomeView      from '../WelcomeView';
import SignUpPopup      from '../SignUpPopup';
import TradeDetailView  from '../TradeDetailView';
import TradeViewPopup   from '../TradeViewPopup';
import EventDetailView  from '../EventDetailView';
import WalletConnectView from '../WalletConnectView';

const Popup = ({ type, visible, options, events, hidePopup }) => {
    useEffect(() => {
        document.body.style.overflow = visible ? 'hidden' : null;

        return () => {
            document.body.style.overflow = null;
        };
    }, [visible]);

    const renderPopup = () => {
        const eventId          = _.get(options, 'eventId');
        const betId            = _.get(options, 'betId', _.get(options, 'tradeId'));
        const investmentAmount = _.get(options, 'investmentAmount');
        const outcome          = _.get(options, 'outcome');
        const initialSellTab   = _.get(options, 'initialSellTab', false);

        switch (type) {
            case PopupTheme.betApprove:
                return (
                    <BetApproveView
                        closed={!visible}
                        betId={betId}
                        investmentAmount={investmentAmount}
                        outcome={outcome}
                    />
                );

            case PopupTheme.betCreation:
                return (
                    <BetCreation
                        closed={!visible}
                        eventId={eventId}
                    />
                );

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
                return (
                    <EventDetailView eventId={eventId} />
                );

            case PopupTheme.referralList:
                return (
                    <ReferralList closed={!visible} />
                );

            case PopupTheme.tradeDetails:
                return (
                    <TradeDetailView tradeId={betId} />
                );

            case PopupTheme.connectWallet:
                return (
                    <WalletConnectView closed={!visible}/>
                );

            case PopupTheme.welcome:
                return (
                    <WelcomeView
                        closed={!visible}
                    />
                );
            
            case PopupTheme.signUpNotificationFirst:
            case PopupTheme.signUpNotificationSecond:
                return (
                    <SignUpPopup
                        closed={!visible}
                    />
                );

            case PopupTheme.tradeView:
                return (
                    <TradeViewPopup
                        closed={false}
                    />
                );

        }

        return null;
    };

    if(type === PopupTheme.tradeView) {
        return (
            <div
                className={classNames(
                    styles.popupFullScreenContainer,
                    visible ? null : styles.hidden,
                )}
            >
                <div className={classNames(
                    styles.popupContainer, 
                    styles.tradeViewContainer)}>
                        <Icon
                            width={30}
                            height={30}
                            className={styles.closeButton}
                            iconType={IconType.arrowLeft}
                            iconTheme={IconTheme.primary}
                            onClick={hidePopup}
                        />
                    <div className={styles.popupContentContainer}>
                        {renderPopup()}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={classNames(
                styles.popupFullScreenContainer,
                visible ? null : styles.hidden,
            )}
        >
            <div className={classNames(styles.popupContainer, 
                type === PopupTheme.signUpNotificationFirst || type === PopupTheme.signUpNotificationSecond ? styles.signUpPopupContainer : null)}>
                {type !== PopupTheme.signUpNotificationSecond && 
                    <Icon
                        width={30}
                        height={30}
                        className={styles.closeButton}
                        iconType={IconType.deleteInput}
                        iconTheme={IconTheme.primary}
                        onClick={hidePopup}
                    />
                }
                <div className={styles.popupContentContainer}>
                    {renderPopup()}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        type:    state.popup.popupType,
        options: state.popup.options,
        visible: state.popup.visible,
        events:  state.event.events,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        hidePopup: () => {
            dispatch(PopupActions.hide());
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Popup);

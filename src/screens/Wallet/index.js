import _                        from 'lodash';
import AccountBalance           from '../../components/AccountBalanceView';
import Highlight                from '../../components/Highlight';
import HighlightType            from '../../components/Highlight/HighlightType';
import Icon                     from '../../components/Icon';
import IconTheme                from '../../components/Icon/IconTheme';
import IconType                 from '../../components/Icon/IconType';
import PaymentAction            from '../../constants/PaymentAction';
import PaymentProvider          from '../../constants/PaymentProvider';
import PopupTheme               from '../../components/Popup/PopupTheme';
import React                    from 'react';
import Routes                   from '../../constants/Routes';
import ScreenWithHeader         from '../../components/ScreenWithHeaderContainer';
import styles                   from './styles.module.scss';
import SwitchableContainer      from '../../components/SwitchableContainer';
import SwitchableHelper         from '../../helper/SwitchableHelper';
import WalletCard               from '../../components/WalletCard';
import WalletPaymentCard        from '../../components/WalletPaymentCard';
import { connect }              from 'react-redux';
import { PopupActions }         from '../../store/actions/popup';
import { useHistory }           from 'react-router';
import { useState }             from 'react';
import ReferralLinkCopyInputBox from '../../components/ReferralLinkCopyInputBox';
import { LOGGED_IN } from 'constants/AuthState';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';

const Wallet = ({ balance, authState, referralCount, showPopup, transactionCount, walletAddress }) => {
    const history                           = useHistory();
    const [paymentAction, setPaymentAction] = useState(PaymentAction.deposit);

    if(authState !== LOGGED_IN) {
        history.push(Routes.home);
    }

    const onPaymentActionSwitch = (newIndex) => {
        if (newIndex === 0) {
            setPaymentAction(PaymentAction.deposit);
        } else {
            setPaymentAction(PaymentAction.withdrawal);
        }
    };

    const renderConditionalWalletCards = () => {
        if (paymentAction === PaymentAction.deposit) {
            const referralText = <>
                Invite your friends using your referral link and <strong>get 50 EVNT token</strong> for each user who joined over your link.
            </>;

            return (
                <>
                    <WalletCard
                        title={'+50 EVNT Tokens: Invite your friends'}
                        subtitle={'50 EVNT tokens for inviting people'}
                        text={referralText}
                        buttonText={'Share with your friends'}
                        onClick={onReferralListClick}
                    >
                        <ReferralLinkCopyInputBox className={styles.referralLinkList} />
                    </WalletCard>
                </>
            );
        }
    };

    const renderShortcutListItem = (text, onClick, iconType = IconType.activities) => {
        return (
            <div
                className={styles.shortcutButton}
                onClick={onClick}
            >
                <Highlight
                    width={'auto'}
                    highlightType={HighlightType.highlightSettingsMyWallet}
                />
                <Icon
                    width={'auto'}
                    iconTheme={IconTheme.primary}
                    iconType={iconType}
                />
                <span className={styles.shortcutText}>
                    {text}
                </span>
                <i>
                </i>
            </div>
        );
    };

    const onHistoryListClick = () => {
        history.push(Routes.betOverview + '?view=1');
    };

    const onReferralListClick = () => {
        showPopup(PopupTheme.referralList);
    };

    const onPaymentCardClickCallback = (paymentProvider) => {
        return () => {
            let route = Routes.walletDeposit;

            if (paymentAction === PaymentAction.withdrawal) {
                route = Routes.walletWithdrawal;
            }

            history.push(Routes.getRouteWithParameters(
                route,
                {
                    paymentProvider,
                },
            ));
        };
    };

    const renderShortcutList = () => {
        return (
            <>
                {
                    renderShortcutListItem(
                        <>
                            Transaction history ({transactionCount})
                        </>,
                        onHistoryListClick,
                    )
                }
                {
                    renderShortcutListItem(
                        <>
                            See all <strong>{referralCount} referrals</strong>
                        </>,
                        onReferralListClick,
                        IconType.chat,
                    )
                }
            </>
        );
    };

    const renderSwitchableView = () => {
        const switchableViews = [
            SwitchableHelper.getSwitchableView(
                'Deposit',
                IconType.deposit,
            ),
            SwitchableHelper.getSwitchableView(
                'Withdrawal',
                IconType.withdrawal,
            ),
        ];
        const selectedIndex   = paymentAction === PaymentAction.deposit ? 0 : 1;

        return (
            <SwitchableContainer
                switchableViews={switchableViews}
                currentIndex={selectedIndex}
                setCurrentIndex={onPaymentActionSwitch}
            />
        );
    };

    const renderWalletPaymentCard = (paymentProvider) => {
        return (
            <WalletPaymentCard
                provider={paymentProvider}
                action={paymentAction}
                onClick={onPaymentCardClickCallback(paymentProvider)}
            />
        );
    };

    return (
        <BaseContainerWithNavbar withPaddingTop={true}>
            <ScreenWithHeader
                title={'My Wallet'}
                subtitle={walletAddress}
                returnRoute={Routes.home}
            >
                <div className={styles.walletContainer}>
                    <AccountBalance
                        balance={balance}
                    />
                    {renderShortcutList()}
                </div>
                {renderSwitchableView()}
                <div className={styles.cardContainer}>
                    {renderConditionalWalletCards()}
                    {/* Deactivated for now @see: https://wallfair-product.atlassian.net/browse/ML-124 {renderWalletPaymentCard(PaymentProvider.evntToken)} */}
                    {renderWalletPaymentCard(PaymentProvider.crypto)}
                    {renderWalletPaymentCard(PaymentProvider.paypal)}
                    {renderWalletPaymentCard(PaymentProvider.debitCreditCard)}
                </div>
            </ScreenWithHeader>
        </BaseContainerWithNavbar>
    );
};

const mapStateToProps = (state) => {
    const referralCount    = _.size(state.authentication.referralList);
    const transactionCount = _.size(state.transaction.transactions);

    return {
        balance:   state.authentication.balance,
        authState: state.authentication.authState,
        walletAddress: state.authentication.walletAddress,
        referralCount,
        transactionCount,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showPopup: (popupType) => {
            dispatch(PopupActions.show({ popupType }));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Wallet);

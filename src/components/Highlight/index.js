import classNames from 'classnames';
import HighlightType from './HighlightType';
import React from 'react';
import SelectionHelper from '../../helper/SelectionHelper';
import styles from './styles.module.scss';
import { ReactComponent as HighlightHomeCtaBet } from '../../data/backgrounds/highlight-home-cta-bet.svg';
import { ReactComponent as HighlightMenuAddEventOrBet } from '../../data/backgrounds/highlight-menu-add-event-or-bet.svg';
import { ReactComponent as HighlightSettingsChangeMailAddress } from '../../data/backgrounds/highlight-settings-change-mail-address.svg';
import { ReactComponent as HighlightSettingsChangePhoneNumber } from '../../data/backgrounds/highlight-settings-change-phone-number.svg';
import { ReactComponent as HighlightSettingsChangePushNotification } from '../../data/backgrounds/highlight-settings-change-push-notification.svg';
import { ReactComponent as HighlightSettingsMyBets } from '../../data/backgrounds/highlight-settings-my-bets.svg';
import { ReactComponent as HighlightSettingsMyProfile } from '../../data/backgrounds/highlight-settings-my-profile.svg';
import { ReactComponent as HighlightSettingsMyWallet } from '../../data/backgrounds/highlight-settings-my-wallet.svg';
import { ReactComponent as HighlightSettingsSupport } from '../../data/backgrounds/highlight-settings-support.svg';
import { ReactComponent as HighlightPlaceBet } from '../../data/backgrounds/highlight-place-bet.svg';
import { ReactComponent as HighlightDeposit } from '../../data/backgrounds/highlight-deposit.svg';
import { ReactComponent as HighlightModalButton } from '../../data/backgrounds/highlight-modal-button.svg';
import { ReactComponent as HighlightAuthButton } from '../../data/backgrounds/highlight-auth.svg';
import HighlightTheme from './HighlightTheme';

const Highlight = ({
  className,
  highlightType,
  highlightTheme,
  width,
  height,
  onClick,
}) => {
  const renderHighlight = () => {
    return SelectionHelper.get(highlightType, {
      [HighlightType.highlightHomeCtaBet]: <HighlightHomeCtaBet />,
      [HighlightType.highlightMenuAddEventOrBet]: (
        <HighlightMenuAddEventOrBet />
      ),
      [HighlightType.highlightSettingsChangeMailAddress]: (
        <HighlightSettingsChangeMailAddress />
      ),
      [HighlightType.highlightSettingsChangePhoneNumber]: (
        <HighlightSettingsChangePhoneNumber />
      ),
      [HighlightType.highlightSettingsChangePushNotification]: (
        <HighlightSettingsChangePushNotification />
      ),
      [HighlightType.highlightSettingsMyBets]: <HighlightSettingsMyBets />,
      [HighlightType.highlightSettingsMyProfile]: (
        <HighlightSettingsMyProfile />
      ),
      [HighlightType.highlightSettingsMyWallet]: <HighlightSettingsMyWallet />,
      [HighlightType.highlightSettingsSupport]: <HighlightSettingsSupport />,
      [HighlightType.highlightPlaceBet]: <HighlightPlaceBet />,
      [HighlightType.highlightDeposit]: <HighlightDeposit />,
      [HighlightType.highlightModalButton]: <HighlightModalButton />,
      [HighlightType.highlightAuthButton]: <HighlightAuthButton />,
    });
  };

  const getHighlightStyle = () => {
    return {
      width: width,
      height: height,
    };
  };

  return (
    <span
      style={getHighlightStyle()}
      className={classNames(
        styles.highlight,
        className,
        SelectionHelper.get(highlightTheme, {
          [HighlightTheme.fillRed]: styles.highlightFillRed,
          [HighlightTheme.fillGray]: styles.highlightFillGray,
        })
      )}
      onClick={onClick}
    >
      {renderHighlight()}
    </span>
  );
};

export default Highlight;

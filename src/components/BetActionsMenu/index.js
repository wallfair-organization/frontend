import classNames from 'classnames';
import Icon from 'components/Icon';
import BetState from 'constants/BetState';
import _ from 'lodash';
import { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { PopupActions } from '../../store/actions/popup';
import IconTheme from '../Icon/IconTheme';
import IconType from '../Icon/IconType';
import PopupTheme from '../Popup/PopupTheme';
import styles from './styles.module.scss';

/**
 * @typedef {'edit' | 'resolve' | 'cancel' | 'delete'} BetManagementActions
 */

const BetActionsMenu = ({ event, bet, showPopup }) => {
  const [menuOpened, setMenuOpened] = useState(false);

  const userCreator = useSelector(
    state => state.authentication.userId === bet.creator
  );
  const isAdmin = useSelector(state => state.authentication.admin);
  const canResolve = [
    BetState.active,
    BetState.closed,
    BetState.waitingResolution,
  ].includes(bet?.status);
  const canCancel = [
    BetState.active,
    BetState.closed,
    BetState.waitingResolution,
  ].includes(bet?.status);

  /** @param {BetManagementActions} name */
  const action = name => () => {
    setMenuOpened(false);
    switch (name) {
      case 'resolve':
        return showPopup(PopupTheme.resolveBet, {
          bet,
          event,
        });
      case 'cancel':
        return showPopup(PopupTheme.cancelBet, { bet, event });
    }
  };

  const toggleMenu = e => {
    e.stopPropagation();
    setMenuOpened(!menuOpened);
  };

  const menuItem = (label, onClick, iconType, width = 16, height = 16) => (
    <div className={styles.menuItem} onClick={onClick}>
      <Icon
        className={styles.menuInfoIcon}
        iconType={iconType}
        iconTheme={IconTheme.black}
        width={width}
        height={height}
      />
      <span>{label}</span>
    </div>
  );

  // dont render anything if no actions are available
  if (!userCreator && !isAdmin) {
    return null;
  }

  return (
    <div className={styles.menu}>
      {menuOpened && (
        <div
          className={styles.underlay}
          onClick={() => setMenuOpened(false)}
        ></div>
      )}
      <Icon
        iconType={IconType.menu}
        iconTheme={null}
        onClick={toggleMenu}
        className={styles.menuIcon}
      />
      <div
        className={classNames(
          styles.menuBox,
          menuOpened ? styles.menuBoxOpened : null
        )}
      >
        {canResolve &&
          menuItem('Resolve', action('resolve'), IconType.hourglass)}
        {canCancel &&
          menuItem('Cancel', action('cancel'), IconType.cross, 14, 14)}
      </div>
    </div>
  );
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

export default connect(null, mapDispatchToProps)(BetActionsMenu);

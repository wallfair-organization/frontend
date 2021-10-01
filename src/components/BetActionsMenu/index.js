import classNames from 'classnames';
import Icon from 'components/Icon';
import BetState from 'constants/BetState';
import _ from 'lodash';
import { useState } from 'react';
import { connect } from 'react-redux';
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

  const canEdit = ![BetState.canceled, BetState.resolved].includes(bet?.status);
  const canResolve = [BetState.active, BetState.closed].includes(bet?.status);
  const canCancel = [BetState.active, BetState.closed].includes(bet?.status);
  const canDelete = [BetState.canceled].includes(bet?.status);

  /** @param {BetManagementActions} name */
  const action = name => () => {
    setMenuOpened(false);
    switch (name) {
      case 'edit':
        return showPopup(PopupTheme.editBet, { event, bet });
      case 'resolve':
        return showPopup(PopupTheme.resolveBet, {
          eventId: event._id,
          tradeId: bet._id,
        });
      case 'cancel':
        return showPopup(PopupTheme.cancelBet, { bet });
      case 'delete':
        return showPopup(PopupTheme.deleteBet, { bet });
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
  if (!canEdit && !canResolve && !canCancel && !canDelete) {
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
        {canEdit && menuItem('Edit', action('edit'), IconType.edit)}
        {canResolve &&
          menuItem('Resolve', action('resolve'), IconType.hourglass)}
        {canCancel &&
          menuItem('Cancel', action('cancel'), IconType.cross, 14, 14)}
        {canDelete && menuItem('Delete', action('delete'), IconType.trash)}
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

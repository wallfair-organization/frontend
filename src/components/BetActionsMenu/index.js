import classNames from 'classnames';
import Button from 'components/Button';
import ButtonTheme from 'components/Button/ButtonTheme';
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
  const canEdit = ![
    BetState.canceled, 
    BetState.resolved
  ].includes(bet?.status);
  const canDelete = [
    BetState.canceled
  ].includes(bet?.status);
  const canResolve = [
    BetState.upcoming,
    BetState.active,
    BetState.waitingResolution,
  ].includes(bet?.status);
  const canCancel = [
    BetState.upcoming,
    BetState.active,
    BetState.resolved,
    BetState.disputed,
    BetState.waitingResolution,
  ].includes(bet?.status);
  const canClose = [
    BetState.resolved,
    BetState.disputed,
  ].includes(bet?.status) && isAdmin;

  /** @param {BetManagementActions} name */
  const action = name => () => {
    setMenuOpened(false);
    switch (name) {
      case 'edit':
        return showPopup(PopupTheme.eventForms, { bet, event })
      case 'resolve':
      case 'close':
        return showPopup(PopupTheme.resolveBet, {
          bet,
          event,
          action: name,
        });
      case 'cancel':
        return showPopup(PopupTheme.cancelBet, { bet, event });
      case 'delete':
        showPopup(PopupTheme.deleteBet, { bet });
        //return showPopup(PopupTheme.deleteEvent, { event });
        
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
  if ((!userCreator && !isAdmin) || bet?.status === BetState.closed) {
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
      <Button
        theme={ButtonTheme.secondaryButton}
        className={styles.menuButton}
        onClick={toggleMenu}
      >
        <Icon
          iconType={IconType.menu}
          className={styles.menuIcon}
        />
      </Button>
      <div
        className={classNames(
          styles.menuBox,
          menuOpened ? styles.menuBoxOpened : null
        )}
      >
        {canEdit && 
          menuItem('Edit', action('edit'), IconType.edit)}
        {canResolve &&
          menuItem('Resolve', action('resolve'), IconType.hourglass)}
        {canCancel &&
          menuItem('Cancel', action('cancel'), IconType.cross, 14, 14)}
        {canClose &&
          menuItem('Close', action('close'), IconType.success)}
        {canDelete && 
          menuItem('Delete', action('delete'), IconType.trash)}
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

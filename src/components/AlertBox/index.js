import AlertType from './AlertType';
import Icon from '../Icon';
import IconType from '../Icon/IconType';
import React from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { AlertActions } from '../../store/actions/alert';
import NotificationCard from '../NotificationCard';
import { ChatActions } from 'store/actions/chat';

const AlertBox = ({ alerts, removeAlert, setMessageRead }) => {
  // just format test
  const renderAlertIcon = alert => {
    switch (alert.type) {
      case AlertType.success:
        return (
          <Icon className={styles.alertIcon} iconType={IconType.success} />
        );

      case AlertType.error:
        return (
          <Icon className={styles.alertIcon} iconType={IconType.attention} />
        );

      case AlertType.info:
        return <Icon className={styles.alertIcon} iconType={IconType.info} />;
    }

    return null;
  };

  const onAlertXClick = id => removeAlert({ id });

  const renderAlert = (alert, index) => {
    return alert.notification ? (
      <NotificationCard
        key={alert.id ?? index}
        notification={alert.notification}
        onMarkAsRead={() => {
          onAlertXClick(alert.id);
          setMessageRead(alert.notification.messageId);
        }}
      ></NotificationCard>
    ) : (
      <div className={styles.alertContainer} key={alert.id}>
        {renderAlertIcon(alert)}
        <span className={styles.alertMessage}>{alert.message}</span>
        <Icon
          className={styles.closeIcon}
          iconType={IconType.deleteInput}
          onClick={() => onAlertXClick(alert.id)}
        />
      </div>
    );
  };

  return (
    <div className={styles.alertBoxContainer}>
      {alerts && alerts.map(renderAlert)}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    alerts: state.alert.alerts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeAlert: id => {
      dispatch(AlertActions.removeAlert(id));
    },
    setMessageRead: messageId => {
      dispatch(
        ChatActions.setMessageRead({
          messageId,
        })
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertBox);

import React from 'react';
import styles from './styles.module.scss';
import _ from 'lodash';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { formatToFixed } from '../../helper/FormatNumbers';
import { TOKEN_NAME } from '../../constants/Token';

const TokenValueSelector = ({
  className,
  values,
  activeValue,
  onSelect,
  balance,
}) => {
  const onTokenValueClick = (value, enabled) => {
    if (enabled) {
      return () => onSelect(value);
    }
  };

  const renderValue = (valueObject, index) => {
    const value = _.get(valueObject, 'value', valueObject);
    const valueName = _.get(valueObject, 'valueName', value);
    const isEnabled = _.get(valueObject, 'enabled', true);
    const isHighlighted = _.get(valueObject, 'highlighted', false);
    let isSelected = false;
    if (formatToFixed(activeValue) === formatToFixed(value)) {
      isSelected = true;
    }

    return (
      <div
        className={classNames(
          styles.tokenValueSelectorBox,
          isSelected ? styles.tokenValueSelectorBoxSelected : null,
          !isEnabled ? styles.tokenValueSelectorBoxDisabled : null,
          isHighlighted ? styles.tokenValueSelectorBoxHighlighted : null
        )}
        onClick={onTokenValueClick(value, isEnabled)}
        key={index}
      >
        <span className={styles.value}>{valueName}</span>
        <span className={styles.label}>{TOKEN_NAME}</span>
      </div>
    );
  };

  const renderMaxValue = () => {
    const valueObject = {
      value: formatToFixed(balance),
      valueName: 'MAX',
      enabled: true,
      highlighted: true,
    };

    return renderValue(valueObject, null);
  };

  return (
    <div className={classNames(styles.tokenValueSelector, className)}>
      {_.map(values, renderValue)}
      {renderMaxValue()}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    balance: state.authentication.balance,
  };
};

export default connect(mapStateToProps, null)(TokenValueSelector);

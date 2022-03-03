import React from 'react';
import Routes from '../../constants/Routes';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import Input from '../Input';
import Icon from '../Icon';
import IconType from '../Icon/IconType';
import { ReactComponent as IconSearch } from '../../data/icons/search.svg';
import classNames from 'classnames';

function Search({ value, handleConfirm, handleChange, className }) {
  return (
    <div className={classNames(styles.searchContainer, className)}>
      <Input
        onSubmit={() => handleConfirm(value)}
        className={styles.input}
        placeholder="Search..."
        onChange={event => handleChange(event.target.value)}
      />
      {/* <Icon
                className={styles.searchIcon}
                iconType={IconType.search}
                // width={14}
                // height={14}
            /> */}
      <IconSearch className={styles.searchIcon} onClick={handleConfirm} />
    </div>
  );
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

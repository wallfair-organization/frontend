import _ from 'lodash';
import Icon from '../Icon';
import IconTheme from '../Icon/IconTheme';
import IconType from '../Icon/IconType';
import moment from 'moment';
import ProfilePicture from '../ProfilePicture';
import React from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import ReferralLinkCopyInputBox from '../ReferralLinkCopyInputBox';
import { TOKEN_NAME } from '../../constants/Token';
import { currencyDisplay } from 'helper/Currency';

const ReferralList = ({ closed, userId, referralsWithUser }) => {
  const renderReferralItem = referralWithUser => {
    const user = _.get(referralWithUser, 'user');
    const referral = _.get(referralWithUser, 'referral');

    if (user) {
      const userId = _.get(user, 'id');
      const name = _.get(user, 'name');
      const email = _.get(referral, 'email');
      const date = _.get(referral, 'date');
      let formattedDate = null;
      const rdm = _.random(0, 20);

      if (date) {
        formattedDate = moment(date).format('L');
      }

      return (
        <div className={styles.referralListItem} key={userId + '#' + rdm}>
          <ProfilePicture user={user} width={40} height={40} />
          <span className={styles.referralName}>{name}</span>
          <span className={styles.referralEmail}>{email}</span>
          {formattedDate !== null && (
            <span className={styles.referralDate}>{formattedDate}</span>
          )}
        </div>
      );
    }

    return null;
  };

  const renderReferralListContent = () => {
    return _.map(referralsWithUser, renderReferralItem);
  };

  return (
    <div className={styles.referralListContainer}>
      <div className={styles.referralListTitle}>
        <Icon
          className={styles.titleIcon}
          iconTheme={IconTheme.primary}
          iconType={IconType.chat}
        />
        Referrals
      </div>
      <div className={styles.referralListDescription}>
        Get 50 {currencyDisplay(TOKEN_NAME)} for each user which joined over your referral link.
        <br />
        <br />
        <div className={styles.referralLinkContainer}>
          <span className={styles.referralLinkTitle}>Your referral link:</span>
          <ReferralLinkCopyInputBox userId={userId} />
        </div>
      </div>
      {
        // disabled for MVP
        false && (
          <div className={styles.referralList}>
            {renderReferralListContent()}
          </div>
        )
      }
    </div>
  );
};
const mapStateToProps = state => {
  const referralList = state.authentication.referralList;
  const users = state.user.users;
  const referralsWithUser = _.map(referralList, referral => {
    return {
      referral,
      user: _.find(users, {
        userId: _.get(referral, 'id'),
      }),
    };
  });

  return {
    userId: state.authentication.userId,
    referralsWithUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ReferralList);

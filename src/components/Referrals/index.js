import styles from './styles.module.scss';
import { connect } from 'react-redux';
import ReferralLinkCopyInputBox from 'components/ReferralLinkCopyInputBox';
import TwoColumnTable from 'components/TwoColumnTable';
import InputBoxTheme from '../InputBox/InputBoxTheme';
import _ from 'lodash';
import moment from 'moment';

const Referrals = ({ close: closeDrawer, referrals }) => {
  return (
    <div className={styles.referrals}>
      <ReferralLinkCopyInputBox
        className={styles.referralLink}
        inputTheme={InputBoxTheme.copyToClipboardInputWhite}
      />
      <TwoColumnTable
        headings={['Referrals', 'Joined date']}
        rows={referrals.map(({ username, name, date }) => {
          return [
            <>
              <span className={styles.primaryData}>{username}</span>
              {/*<span className={styles.secondaryData}>{username}</span>*/}
            </>,
            <>
              <span className={styles.secondaryData}>
                {moment(date).format('DD.MM.YYYY')}
              </span>
            </>,
          ];
        })}
        noResultMessage={'No referrals yet.'}
      />
    </div>
  );
};

const mapStateToProps = state => {
  const referralCount = _.size(state.authentication.referralList);

  return {
    referralCount,
    referrals: state.authentication.referralList,
  };
};

export default connect(mapStateToProps)(Referrals);

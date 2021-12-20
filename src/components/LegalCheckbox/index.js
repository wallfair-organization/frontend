import Link from 'components/Link';
import { ReactComponent as ArrowIcon } from '../../data/icons/arrow-left.svg';
import styles from './styles.module.scss';
import CheckBox from 'components/CheckBox';
import Routes from 'constants/Routes';


const LegalCheckbox = ({ ref, checked, setChecked }) => {
  const legalAuthorizationAgreementText = (
    <p
      ref={ref}
      data-tip
      data-event="none"
      data-event-off="dblclick"
      className={styles.authenticationLegalAuthorizationAgreementText}
    >
      <b>I am at least 18 years of age</b> and have read and accepted the{' '}
      <Link
        className={'global-link-style'}
        to={Routes.terms}
        target="_blank"
        rel="noreferrer"
      >
        Terms &amp; Conditions
      </Link>{' '}
      and{' '}
      <Link
        className={'global-link-style'}
        to={Routes.privacy}
        target="_blank"
        rel="noreferrer"
      >
        Privacy Policy
      </Link>
    </p>
  );
  return (
    <CheckBox
      className={styles.authenticationLegalAuthorizationAgreementCheckBox}
      checked={checked}
      setChecked={setChecked}
      text={legalAuthorizationAgreementText}
    />
  );
};

export default LegalCheckbox;

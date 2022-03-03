import classNames from 'classnames';
import InfoBox from 'components/InfoBox';
import styles from './styles.module.scss';

const InputLabel = ({ className, children, infoboxText }) => {
  return (
    <div className={classNames(className, styles.label, infoboxText ? styles.directionRow : null)}>
      {children}
      {infoboxText && <InfoBox position="bottomRight" autoWidth={true}>{infoboxText}</InfoBox>}
    </div>
  );
};

export default InputLabel;

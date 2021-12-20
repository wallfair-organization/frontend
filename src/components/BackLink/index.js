import Link from 'components/Link';
import { ReactComponent as ArrowIcon } from '../../data/icons/arrow-left.svg';
import styles from './styles.module.scss';

const BackLink = ({ to, text, children, showArrow = true }) => {
  return (
    <>
      <Link to={to} className={styles.link}>
        {showArrow && <ArrowIcon />}
        <h2>{text}</h2>
      </Link>
      <div className={styles.share}>{children}</div>
    </>
  );
};

export default BackLink;

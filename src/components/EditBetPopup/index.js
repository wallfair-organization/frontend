import { useSelector } from 'react-redux';
import AdminBetForm from 'components/AdminBetForm';
import styles from './styles.module.scss';

const NewBetPopup = () => {
  const event = useSelector(state => state.popup.options.event);
  const bet = useSelector(state => state.popup.options.bet);

  return (
    <div className={styles.layout}>
      <h2>Bet Settings</h2>
      <AdminBetForm event={event} bet={bet} />
    </div>
  );
};

export default NewBetPopup;

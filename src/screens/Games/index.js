import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import styles from './styles.module.scss';
import {
  NEW_SLOTS_GAMES,
  SLOTS_GAMES,
  EXTERNAL_GAMES
} from '../../constants/Games';
import GameCards from '../../components/GameCards';
import GameSmartsoft from '../../components/GameSmartsoft';

const Games = () => {
  const showUpcoming = process.env.REACT_APP_SHOW_UPCOMING_FEATURES || 'false';
  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>
        {/* <ElonGame /> */}
        {/*
          <GameCards
            games={CASINO_GAMES}
            category="Elon Game"
            showHowtoLink={true}
          />
        */}
        <GameCards
          games={showUpcoming ? NEW_SLOTS_GAMES : SLOTS_GAMES}
          category="House Games"
        />
        <GameSmartsoft
          games={EXTERNAL_GAMES}
          category="Slot Games"
        />

      </div>
    </BaseContainerWithNavbar>
  );
};

export default Games;

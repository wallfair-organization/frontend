import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import styles from './styles.module.scss';
import {
  CASINO_GAMES,
  NEW_SLOTS_GAMES,
  SLOTS_GAMES,
} from '../../constants/Games';
import GameCards from '../../components/GameCards';
import ContentFooter from 'components/ContentFooter';
import ElonGame from 'components/ElonGame';

const Games = () => {
  const showUpcoming = process.env.REACT_APP_SHOW_UPCOMING_FEATURES || 'false';
  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>
        <ElonGame />
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
        <ContentFooter />
      </div>
    </BaseContainerWithNavbar>
  );
};

export default Games;

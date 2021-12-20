import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import BaseContainerWithNavbar from '../../components/BaseContainerWithNavbar';
import Leaderboard from 'components/Leaderboard';

const LeaderboardPage = () => {

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <Leaderboard fetch={true}/>
    </BaseContainerWithNavbar>
  );
};

export default LeaderboardPage;
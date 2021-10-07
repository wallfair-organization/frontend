import { useState } from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { makeStyles } from '@material-ui/core/styles';
import TabPanel from 'components/TabPanel';
import GameBets from 'components/GameBets';
import PlaceBet from 'components/PlaceBet';
import Chat from 'components/Chat';
import { ROSI_GAME_EVENT_ID } from 'constants/RosiGame';
import styles from './styles.module.scss';
import ChatMessageType from 'components/ChatMessageWrapper/ChatMessageType';

const useTabsStyles = makeStyles({
  indicator: {
    backgroundColor: '#e2ff54',
  },
  container: {
    marginTop: '0px'
  }
});

const useTabStyles = makeStyles({
  root: {
    color: '#FFFFFF',
    textTransform: 'capitalize',
    opacity: 0.5,
    fontSize: '12px',
    lineHeight: '1.2',
    '@media screen and (max-width: 768px)': {
      width: '25%',
    },
  },
  selected: {
    color: '#FFFFFF',
  },
  tabPanel: {
    marginTop: '5px'
  }
});

const MobileBets = ({ inGameBets, cashedOut }) => {
  const tabsClasses = useTabsStyles();
  const tabClasses = useTabStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className={tabsClasses.container}>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        classes={{ indicator: tabsClasses.indicator }}
      >
        <Tab
          label="Place Bet"
          disableRipple
          classes={{ root: tabClasses.root }}
        />
        <Tab
          label="Chat"
          disableRipple
          classes={{ root: tabClasses.root }}
        />
        <Tab
          label="In Game Bets"
          disableRipple
          classes={{ root: tabClasses.root }}
        />
        <Tab
          label="Cashed Out"
          disableRipple
          classes={{ root: tabClasses.root }}
        />
      </Tabs>
      <TabPanel value={selectedTab} index={0} className={tabClasses.tabPanel}>
        <PlaceBet />
      </TabPanel>
      <TabPanel value={selectedTab} index={1} className={tabClasses.tabPanel}>
        <div className={styles.chatWrapper}>
          <Chat
            roomId={ROSI_GAME_EVENT_ID}
            className={styles.chatContainer}
            chatMessageType={ChatMessageType.game}
            messagesClassName={styles.chatMessageContainer}
          />
        </div>
      </TabPanel>
      <TabPanel value={selectedTab} index={2} className={tabClasses.tabPanel}>
        <GameBets
          label="In Game Bets"
          bets={inGameBets}
        />
      </TabPanel>
      <TabPanel value={selectedTab} index={3} className={tabClasses.tabPanel}>
        <GameBets
          label="Cashed Out"
          bets={cashedOut}
          showCrashFactor
        />
      </TabPanel>
    </div>
  );
};

export default MobileBets;

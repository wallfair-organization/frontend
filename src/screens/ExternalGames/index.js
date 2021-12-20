import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import styles from './styles.module.scss';
import { EXTERNAL_GAMES } from '../../constants/Games';
import { Link } from 'react-router-dom';

const ExternalGames = () => {
  const showUpcoming = process.env.REACT_APP_SHOW_UPCOMING_FEATURES || 'false';
  console.log("External Games", EXTERNAL_GAMES)
  //https://www.smartsoftgaming.com/Content/Images/GameBanners/${game.GameName}.png
  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>

        {EXTERNAL_GAMES.map((game) =>{
console.log("aa", game.GameName.replaceAll(' ', ''))
          return(
          <Link to={`/external-game/${game.GameName}/${game.GameCategory}`} className={styles.game}>
            <img src={`https://www.smartsoftgaming.com/Content/Images/GameIcons/${game.GameName.replaceAll(' ', '')}.png`}/>
            <p className={styles.title}>{game.GameName}</p>
          </Link>
        )}
        )}
      </div>
    </BaseContainerWithNavbar>
  );
};

//https://eustaging.ssgportal.com/GameLauncher/Loader.aspx?GameCategory=JetX&GameName=JetX&Token=DEMO&PortalName=demo&ReturnUrl=http://testsite.com

export default ExternalGames;

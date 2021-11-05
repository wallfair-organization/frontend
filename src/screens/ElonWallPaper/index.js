import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import styles from './styles.module.scss';
import { ELON_WALLPAPERS } from '../../constants/Wallpapers';
import WallpaperCards from '../../components/WallpaperCards';
import ContentFooter from 'components/ContentFooter';

const ElonWallPaper = () => {
  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>
        <WallpaperCards
          wallpapers={ELON_WALLPAPERS}
          category="Elon Wallpapers"
        />
        <ContentFooter />
      </div>
    </BaseContainerWithNavbar>
  );
};

export default ElonWallPaper;

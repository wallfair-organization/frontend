import BaseContainerWithNavbar from '../../components/BaseContainerWithNavbar';
import Header from './Header';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';
import SectionFour from './SectionFour';
import SectionFive from './SectionFive';
import SectionPolygon from './SectionPolygon';
import SignUp from './SignUp';
import styles from './styles.module.scss';
import ContentFooter from 'components/ContentFooter';

const classes = {
  section: styles.section,
  sectionImage: styles.sectionImage,
  sectionNumber: styles.sectionNumber,
  sectionHeading: styles.sectionHeading,
  textParagraph: styles.textParagraph,
  textContainer: styles.textContainer,
};

const LandingPage = () => {
  return (
    <BaseContainerWithNavbar withPaddingTop>
      <div className={styles.layout}>
        <Header />
        <SectionOne classes={classes} />
        <SectionTwo classes={classes} />
        <SectionThree classes={classes} />
        <SectionFour classes={classes} />
        <SectionPolygon classes={classes} />
        <SectionFive classes={classes} />
      </div>
      <SignUp />
      <ContentFooter />
    </BaseContainerWithNavbar>
  );
};

export default LandingPage;

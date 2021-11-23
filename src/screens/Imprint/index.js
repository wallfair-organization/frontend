import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import styles from './styles.module.scss';
import ContentFooter from 'components/ContentFooter';

const Imprint = () => {

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>
       
        <div className={styles.textContainer}>
          <h1>Imprint</h1>

          <p>
            This imprint also applies to our web representations on social media including LinkedIn, Twitter, Telegram and Instagram.
            <br /><br />
            WALLFAIR N.V.<br />
            Zuikertuintjeweg Z/N (Zuikertuin Tower)<br />
            Curacao<br />
            Registration No. 159041<br />
            <br />
            E-Mail: <a href="hello@alpacasino.io">hello@alpacasino.io</a><br />
          </p>
        </div>
        
      </div>
    </BaseContainerWithNavbar>
  );
};

export default Imprint;

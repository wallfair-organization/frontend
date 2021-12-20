import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import styles from './styles.module.scss';
import ContentFooter from 'components/ContentFooter';

const Fair = () => {

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>
       
       <div className={styles.textContainer}>
          <h1>Provably Fair</h1>

          <h2>Overview</h2>
          <p>
            The underlying concept of provable fairness is that 
            players have the ability to prove and verify that their 
            results are fair and unmanipulated. This is achieved 
            through the use of a commitment scheme , along with 
            cryptographic hashing.
          </p>

          <p>
            Provably fair means you don’t need to “trust” us to be fair; it means you can prove our fairness.
          </p>

          <p>Each bet made on Alpacasino.io can be verified so that you know with certainty the house could have in no way “chosen” the outcome.</p>
          
          <p>To make this possible, two components are needed:</p>

          <ol>
            <li>A server seed - This secret is kept by Alpacasino, and known only by us.</li>
            <li>A client seed - A public seed used to generate hashes, which can then be used by anyone to verify the hashes.</li>
          </ol>
          </div>
          <div className={styles.textContainer}>
          
          <h2>Crash Games</h2>
          
          <h3>Public seed</h3>
          <p>0xea674fdde714fd979de3edf0f56aa9716b898ec8</p>

          <h3>Process</h3>
          <p>We take a Server Seed and hash it (SHA256), creating a new Server Seed. Then we take that Server Seed and hash that too. We repeat this process until we have 10 million hashes -- 10 million server seeds. The very first game of crash uses the 10 millionth server seed (fb9837dc8f32b9f2ce42442ae10f68424d836e34f0632b0c4b8b28097eb7560f), and each game after that works backwards down the list of server seeds. Second game uses the 9,999,999th hash and so on and so forth.</p>

          <h3>Verification Tool</h3>
          <p><a target="_blank" rel="noreferrer" href="https://jsfiddle.net/alpacasino/bf0vgm9e/show">https://jsfiddle.net/alpacasino/bf0vgm9e/show</a></p>

          <h3>Verification Tool Source Code</h3>
          <iframe title="provably-fair" width="100%" height="500" src="//jsfiddle.net/alpacasino/bf0vgm9e/embedded/js,html,css/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

      </div>
        
      </div>
    </BaseContainerWithNavbar>
  );
};

export default Fair;

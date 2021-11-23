import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import styles from './styles.module.scss';

const ResponsibleGambling = () => {

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>
       
       <div className={styles.textContainer}>
          <h1>Gambling with responsibility</h1>
          <p>Last updated: 15.11.2021</p>
          <p>
            Please read this information carefully for your own benefit.<br />
            is operated by WALLFAIR N.V. having its office at Zuikertuintjeweg Z/N (Zuikertuin Tower).<br />
            Company Registration number 159041.
          </p>

          <h2>Interpretation</h2>
          <p>
            The words of which the initial letter is capitalized have meanings defined under the following conditions.<br />
            The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
          </p>

          <h2>Definitions</h2>
          <p>
            For the purposes of these Terms and Conditions:

            <ul>
              <li><b>Account means</b> a unique account created for You to access our Service or parts of our Service.</li>
              <li><b>Company</b> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Curacao Co</li>
              <li><b>Service</b> refers to the Website.</li>
              <li><b>Website</b> refers to alpacasino.io</li>
              <li><b>You</b> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
            </ul>
          </p>

          <h2>Responsible Gambling and Self Exclusion</h2>
          <p>
            Gambling means for the majority of our Users, entertainment, fun and excitement. But we also know that for some of our Users gambling has negative side effects. In the medical science is pathologic gambling since many years as serious sickness recognised.<br />
            Since our first day we think about this problematic and try out best to help. Under “Responsible Gambling” We understand multiple steps of measures, with which a gambling provider can help to lower the possibility of negative side effects appearing. -In case they already appear we also try to take active steps against them.<br />
            The most important instrument against negative side effects from gambling are knowledge and education about the risks of gambling too support our Users self-control in order to make sure they do not suffer from negative side effects.
          </p>

          <h2>Information and contact</h2>
          <p>
            Our Support will help you via email at all time without any additional costs for you:
            <ul>
              <li>email: service@alpacasino.io</li>
            </ul>
            Our Support will of course not give out any information about You without Your consent to anyone else <br />
            In addition you also can take a self-test, if You are already gambling addicted at: <a href="https://www.begambleaware.org/gambling-problems/do-i-have-a-gambling-problem/" rel="noreferrer" target="_blank">https://www.begambleaware.org/gambling-problems/do-i-have-a-gambling-problem/</a><br />
            And you can also find additional information about gambling addictions at: <a href="https://www.begambleaware.org/safer-gambling/" rel="noreferrer" target="_blank">https://www.begambleaware.org/safer-gambling/</a>
          </p>

          <h2>Helpful hints for responsible gambling at alpacasino.io</h2>
          <p>
            We recommend you think about the following hints, before gambling in order to insure gambling stays fun for You and without any negative side effects: 
            <ul>
              <li>
                Set yourself a deposit limit<br />
                Before you start to gambling think about how much you can afford to gamble with according to Your financial situation. Play with amounts which are for fun and for Your entertainment
              </li>
              <li>
                Do not try to win back a loss at every cost<br />
                Try to not take to huge risks to win back what You lost before at any cost. Play for Entertainment and not to earn money.
              </li>
              <li>
                Set yourself a time limit <br />
                Set yourself a time limit and do not break it. Keep in mind gambling should stay in balance with your other hobbies and not be Your only hobby. 
              </li>
              <li>
                Play smart:<br />
                It is smarter to not play, when You are extremely stressed, depressed or under to much pressure. Also do not play when you are under the influence of Medications, Drugs or Alcohol.
              </li>

              <li>
                Take breaks: <br />
                You should take breaks when You notice, that You get tired or can´t concentrate anymore
              </li>
              <li>
                Only one account:<br />
                To make it easier to have an overview how much time and money You spend on gambling it is highly advised to not create more than one Account per Person.
              </li>
            </ul>
          </p>

          <h2>Minor Protection</h2>
          <p>
            To use our Service, You have to be 18 years or older. To avoid abuse, keep Your login data save from any minors near You.<br />
            <br />
            Principally we recommend a filter program to avoid minors, especially children, to access any context on the internet, which is not healthy for them.<br />
            <br />
            For parents we can recommend a list of internet filters, to support them, from keeping their children from any context, which was not made for them:<br />
            <a href="https://famisafe.wondershare.com/internet-filter/best-internet-filters.html" rel="noreferrer" target="_blank">https://famisafe.wondershare.com/internet-filter/best-internet-filters.html</a>
          </p>

          <h2>Self-Exclusion</h2>
          <p>
            In case You are diagnosed with a gambling addiction or try to stay away from gambling for a different reason, we want to assist you to stay away from anything, that does nothing good for you. “Self-Exclusion” means, that You exclude yourself, out of Your own choice, from all gambling services. This exclusion cannot be undone for a set amount of time. If you wish to self-exclude yourself from gambling, please message our support and give them a time span between 6 months and 5 years. They also will explain you all future steps and what is needed from you.
            <ul>
              <li>email: service@alpacasino.io</li>
            </ul>
            Please keep in mind that Self Exclusion is permanent for the set time span and will not be undone for your own protection.<br /><br />
            During Self Exclusion you are not allowed to create a new Account and every attempt to create a new Account during Self Exclusion is a violation of our Terms of Service and may result in the permanent ban of your original account.
          </p>
      </div>
        
      </div>
    </BaseContainerWithNavbar>
  );
};

export default ResponsibleGambling;

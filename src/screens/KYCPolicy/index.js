import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import styles from './styles.module.scss';

const KYCPolicy = () => {

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>
       
       <div className={styles.textContainer}>
          <h1>KYC Policy of Wallfair N.V.</h1>
          <p>Last updated: 15.11.2021</p>
          <p>
            When a user makes an aggregate lifetime total of deposits exceeding EUR 2000 or requests a withdrawal of any amount inside the aplacasino.io Platform, then it is compulsory for them to perform a full KYC process. <br />
            During this process, the user will have to input some basic details about themselves and then upload<br />
            <ul>
              <li>A copy of Government Issued Photo ID (in some cases front and back depending on the doc)</li>
              <li>A selfie of themselves holding the ID doc</li>
              <li>A bank statement/Utility Bill</li>
            </ul>
            Once uploaded, the user will get a “Temporarily Approved” Status and the documents will now be on our side, and the “KYC Team” will have 24hrs to go over them and email the user about the outcome:<br />
            <ul>
              <li>Approval</li>
              <li>Rejection</li>
              <li>More information needed – No change in Status</li>
            </ul>
            When the user is on “Temporarily Approved” Status then <br />
            <ul>
              <li>They can use the platform normally</li>
              <li>They cannot deposit more than EUR 500 in aggregate total</li>
              <li>They cannot complete any withdrawal.</li>
            </ul>
          </p>

          <h2>Guideline for the “KYC Process”</h2>
          <ol>
            <li>
              Proof of ID<br /> 
              a. Signature Is there<br />
              b. Country is not a Restricted Country: United States of America and its territories, France and its territories, Netherlands and its territories and countries that form the Kingdom of Netherlands including Bonaire, Sint Eustatius, Saba, Aruba, Curacao and Sint Maarten, Australia and its territories, United Kingdom of Great Britain, Northern Ireland, Spain. <br />
              c. Full Name matches client’s name<br />
              d. Document does not expire in the next 3 months<br />
              e. Owner is over 18 years of age
            </li>
            <li>
              Proof of Residence<br />
              a. Bank Statement or Utility Bill<br />
              b. Country is not a Restricted Country: United States of America and its territories, France and its territories, Netherlands and its territories and countries that form the Kingdom of Netherlands including Bonaire, Sint Eustatius, Saba, Aruba, Curacao and Sint Maarten, Australia and its territories, United Kingdom of Great Britain, Northern Ireland, Spain, and Cyprus. <br />
              c. Full Name matches client’s name and is same as in proof of ID.<br />
              d. Date of Issue: In the last 3 months
            </li>
            <li>
              Selfie with ID<br />
              a. Holder is the same as in the ID document above<br />
              b. ID document is the same as in “1”. Make sure photo/ID number is the same
            </li>
          </ol>
          
          <h2>Notes on the “KYC Process”</h2>
          <ol>
            <li>When the KYC process is unsuccessful then the reason is documented and a support ticket is created in the system. The ticket number along with an explanation is communicated back to the user.</li>
            <li>Once all proper documents are in our possession then the account gets approved.</li>
          </ol>

          <h2>“Other AML measures”</h2>
          <ol>
            <li>If a user has not passed full KYC then they cannot make additional deposits or withdrawals of any amount.</li>
            <li>
              If a user has passed the KYC process successfully then<br />
              a. There is a deposit limit per transaction (max EUR 2,000)<br />
              b. Prior to any withdrawal there is a detailed algorithmic and manual check on the activity and balance of the user to see if the amount withdrawn is a result of proper activity in the platform. 
            </li>
            <li>Under no circumstances may a user transfer funds directly to another user.</li>
          </ol>
      </div>
        
      </div>
    </BaseContainerWithNavbar>
  );
};

export default KYCPolicy;

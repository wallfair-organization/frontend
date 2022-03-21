import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import styles from './styles.module.scss';

const AMLPolicy = () => {
  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>
       
        <div className={styles.textContainer}>
          <h1>AML Policy</h1>

          <p>
            1. Wallfair B.V. (Curaçao) (the 'Company'/'We') is a company registered and incorporated in Curacao with a proper Gaming License and is legally able to accept and transact with customers in crypto (digital or virtual) currencies, specifically utility tokens. We are committed to preventing our systems from being used as a tool for criminal activities. Our policies and procedures were built and continue to be updated to observe the laws relevant to our operations.
          </p>
          <p>
            2. The Curaçao Gaming Control Board is the designated supervisory authority for our service. We are required to comply with all applicable laws and regulations within the jurisdiction of Curaçao including National Ordinances covering the criminal code, identification for services, identification when rendering services, and the reporting of unusual transactions. We are required as a service provider of online games of chance and gambling to have in place adequate practices and procedures to prevent our systems from activity facilitating money laundering and the funding of terrorism-related and criminal activities.
          </p>
          <p>
            3. We apply appropriate customer due diligence measures required by law; therefore, we retain the right to conduct an enhanced due diligence, including verification based on personal documents, and publicly held data, privilege information from other operators and sources, financial or corporate data, and third-party data providers.
          </p>
          <p>
            4. We monitor all customer relationships in accordance with industry best practice, international recommendations, and compliance and AML guidelines. Any suspicious transactions or circumstances potentially related to money laundering and terrorism financing will be reported to the relevant law enforcement authorities. Also, cases of a customer being identified as an individual linked to the sanctions monitoring lists, money laundering prevention lists or financing of terrorism suspicion lists or any other criminal activity, may warrant the submission of a formal suspicious activity report to law enforcement authorities. As a Curacao eGaming licensee, we report any unusual or suspicious transactions, in accordance with the National Ordinance to the Department of the Financial Intelligence Unit.
          </p>
          <p>
            5. Where due diligence checks cannot be finalized, we will suspend the business relationship until such time as all checks have been completed to our satisfaction. In case of suspicion, we have the right to suspend the customer account and request additional due diligence documentation from the customer. If we are not sure of either the identity of the customer or the source of funding, the matter can be referred to the Management Board for review and final decision. If the decision is to terminate the relationship is adopted, any retained customer funds will be held in a seized funds account and declared as part of any suspicious activity report made to the law enforcement authorities.
          </p>
          <p>
            6. In case of suspicious activities or confirmed cases of violations of this policy or other compliance regulations, we retain the right to refrain from payouts to the individuals potentially involved independently from amounts won or gambled until the full investigation is completed.
          </p>
        </div>
      </div>
    </BaseContainerWithNavbar>
  );
};

export default AMLPolicy;

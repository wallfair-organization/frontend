import HeaderWithHeadline from '../../components/HeaderWithHeadline';
import LegalText from '../../components/LegalText';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import { TOKEN_NAME } from '../../constants/Token';
import ContentFooter from 'components/ContentFooter';
import { useEffect } from 'react';

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <BaseContainerWithNavbar withPaddingTop={true}>
        <HeaderWithHeadline
          headline={'WALLFAIR.IO GENERAL TERMS & CONDITIONS OF USE'}
        />
        <LegalText>
          <section>
            <p style={{ paddingTop: '20px' }}>
              <b>Dated: September 21, 2021</b>
            </p>
            <p>
              The following Terms and Conditions govern your participation in
              the event organization and involvement in the business activities
              of Wallfair Ltd., a company registered in Alderney, Channel
              Islands (the “<b>Company</b>”).
            </p>
            <ol>
              <li>
                {' '}
                By participating in the Token Sale and/or registering on the
                platform, you agree to these Terms &amp; Conditions. If you do
                not agree to all of these terms, please do not participate in
                the {TOKEN_NAME} token - or Wallfair.io-related activities. The
                Terms &amp; Conditions of the third parties that may contradict
                these Terms &amp; Conditions shall not be applicable.
              </li>
              <li>
                {' '}
                Please read these Terms &amp; Conditions carefully. If you have
                any questions regarding these terms, please contact the Company
                at <a href="mailto:hello@wallfair.io">hello@wallfair.io</a>.
              </li>
              <li>
                {' '}
                The platform is created and designed for entertainment purposes
                only and may not be used exclusively for monetary gain. All
                financial gains and losses are an exclusive responsibility of
                the platform participants and shall be treated as such.
              </li>
              <li>
                {' '}
                The event creators are completely and solely responsible for the
                setup, content and financial frame conditions of all events that
                are suggested and/or placed on the platform. In connection
                hereto, the Company does not allow events that may qualify as
                illegal, unethical, fraudulent or unfair towards any of the
                participating parties in any of the applicable jurisdictions, be
                it with regard to the verification of the results, possible
                outcomes or unlawful agreements with the purpose of putting
                other platform participants at a disadvantage.
              </li>
              <li>
                {' '}
                In addition, both the event creators and participants/traders
                need to be at least 18 years old and of sound mind and body. Any
                participant violating this provision shall be immediately
                excluded from the platform and may be liable for all
                consequences of such illegal events both in terms of civil and
                criminal liability including damages, torts and the costs of
                legal representation accumulated by the Company in connection to
                such violation.
              </li>
              <li>
                {' '}
                With regard to the content presented, the event creators are
                liable for ensuring that such content is legally presented and
                distributed and its use does not violate any of the rights and
                regulations under a specific jurisdiction or any of the rights
                of third parties.
              </li>
              <li>
                {' '}
                All events are reviewable by the Company personnel – members of
                staff hereby have the ultimate discretion about the placement of
                the events on the platform and the wording that can be used for
                the event description.
              </li>
              <li>
                {' '}
                This document is not a solicitation for investment and does not
                constitute a prospectus or offering of securities of any sort or
                any other form of capital investment product in any
                jurisdiction.
              </li>
              <li>
                {' '}
                We recommend that you consult legal, financial, tax and other
                professional advisors or experts for further guidance before
                participating in the activities offered on the platform, you are
                specifically strongly advised to request independent legal
                advice in respect of the legality in your jurisdiction of your
                participation in the token sale. The Company does not recommend
                that you purchase {TOKEN_NAME} tokens unless you have prior
                experience with tokens, blockchain-based software, and
                distributed ledger technology and unless you have a clear
                understanding of rights and liabilities connected to the
                participation in token- based events.
              </li>
              <li>
                {' '}
                {TOKEN_NAME} tokens are not shares or securities of any type.
                They do not entitle you to any ownership or other interest in
                the Company, they are merely a means by which you may be able to
                utilize certain services on a platform that is yet to be
                developed. There is no guarantee that the platform will actually
                be developed. The tokens are functional utility tokens that will
                be designed for the use on the platform that is yet to be
                developed.
              </li>

              <li>
                {' '}
                Despite Wallfair team's best efforts and diligence to bring this
                project forward, all platform participants should be aware that
                their contributions are not refundable and accept the inherent
                risk of project failure at any stage of development. This
                implicit risk is associated with any and all uncertainty of
                technologically-focused entrepreneurial projects, and can be
                affected by either internal or external factors that are out of
                the control scope of Wallfair. There is a risk that future
                operations will need approvals or licenses which the Company
                does not hold and which have not been applied for. Finally, the
                purchaser declares being aware of the legal uncertainty of this
                type of transaction and to have conducted his own legal guidance
                according to the applicable law to which he subscribes.
              </li>

              <li>
                {' '}
                Future {TOKEN_NAME} tokens shall be designed to be used in the
                Wallfair prediction market that is yet to be developed.{' '}
                {TOKEN_NAME} tokens have not been generated at this point in
                time. If the Tokens will never be generated due to a voluntary
                termination of operations or any other liquidation, this would
                lead to a return of all payments that the Company has received
                from the Purchaser to the extent funds are available from the
                proceeds of all Token Purchases. For this repayment, the Company
                will use the same payment that the Purchaser used for the
                original transaction, unless something else was communicated
                with the Purchaser.
              </li>

              <li>
                {' '}
                After the Tokens Generating Event (“TGE”) the Company will issue
                to the Purchaser the amount of purchased {TOKEN_NAME} Tokens. At
                that time the Company will ask for the Purchaser’s wallet
                address on which the {TOKEN_NAME} tokens shall be received.
              </li>

              <li>
                {' '}
                The Company offers exclusively {TOKEN_NAME} tokens as a method
                of payment on the platform, the tokens may have a predefined
                lockup period. Lockup period refers to a specific period of time
                in which tokens cannot be transacted or traded.
              </li>

              <li>
                {' '}
                As part of the Know Your Customer procedure (KYC), anyone who
                would like to participate in the platform-organized activities
                will have to provide the Company with the following details:
                <br />
                - First and last name
                <br />
                - Date and place of birth
                <br />
                - Current address
                <br />
                - Citizenship
                <br />
                - A copy of passport or ID card.
                <br />
              </li>

              <li>
                {' '}
                In addition, according to the good practices that the Company
                applies, a process against money laundering will be conducted.
                The Company reserves the right not to transfer tokens or to
                refuse access to the platform to people whose origin funds have
                not been verified or will be negative. In this case, the
                participant will be refunded, and the Company will use the same
                payment that was used for the original transaction.
              </li>

              <li>
                {' '}
                The Company withholds the right to outsource KYC / AML procedure
                to a certified company. The AML process will consist of a check
                on the global lists of Politically Exposed Persons as well as on
                the assets-freeze list. The company reserves the right, on a
                case- by-case basis, to request additional documents to justify
                the user’s income origin, otherwise to not continue the business
                relations.
              </li>

              <li>
                {' '}
                Due to national legislation, participants from the following
                countries are neither allowed to participate in the token sale
                nor in the platform activities: United States of America,
                Canada, China as well as high-risk countries under increased
                monitoring as stated by the FATF (Financial Action Task Force).
                This prohibition applies to all types of people (moral,
                physical, agent, etc.) and to any indirect participation (via a
                proxy, a name loan, etc.).
              </li>
              <li>
                {' '}
                <b>Warning about the platform - inherent risks</b>
                <br />
                Token Sales are high-risk operations because of their completely
                experimental nature. By participating in this operation,
                participants declare to understand and assume the following
                risks:
                <ul>
                  <li style={{ listStyleType: 'circle' }}>
                    {' '}
                    <b>Lack of regulation</b>: the Purchaser agrees not to
                    benefit from any guarantees associated with listings on
                    regulated financial markets or other regulated financial
                    investments;
                  </li>
                  <li style={{ listStyleType: 'circle' }}>
                    {' '}
                    <b>Worth of the Token</b>: the Purchaser accepts the chance
                    that the Token may lose in value;
                  </li>
                  <li style={{ listStyleType: 'circle' }}>
                    {' '}
                    <b>Volatility or market risk</b>: the value of tokens is
                    extremely volatile and subject to may significant, and
                    largely unforeseeable fluctuations. Moreover, the market or
                    markets on which these tokens might be traded do not offer
                    the same guarantees that are generally applicable to
                    conventional financial markets. It is also quite possible
                    that no resale market develops for the tokens, meaning that
                    the purchaser may be either unable to sell them or have to
                    sell them on unsatisfactory terms;
                  </li>
                  <li style={{ listStyleType: 'circle' }}>
                    {' '}
                    <b>Project stage</b>: Wallfair is an innovative project
                    based on a new technology and whose future evolution is
                    unpredictable. Therefore, the buyer accepts the risk of
                    non-fulfillment of the project for technical, economic or
                    legal reasons;
                  </li>
                  <li style={{ listStyleType: 'circle' }}>
                    {' '}
                    <b>Protocol</b>: the token is planned to be developed on the
                    Binance Smart Chain or another blockchain network at an
                    experimental technical stage. Therefore, the Purchaser
                    understands and accepts the risk that an evolution of the
                    network renders the token or service unusable.
                  </li>
                  <li style={{ listStyleType: 'circle' }}>
                    {' '}
                    <b>Security</b>: the Purchaser understands and accepts the
                    risk of losing his Tokens or Payments due to a security
                    breach. If the company makes every effort to ensure the
                    Token Sale safety, the experimental nature of the operation
                    does not exclude the realization of financial or IT damages.
                    It is recommended that the Purchaser takes all measures to
                    ensure the safety of his tokens and cryptocurrencies.
                  </li>
                  <li style={{ listStyleType: 'circle' }}>
                    {' '}
                    <b>Legal risks</b>: The Token Sale has been structured to
                    comply with the current regulations and good practices
                    applicable. Nevertheless, the governing law of Token Sale is
                    dynamically changing around the world. The company cannot be
                    held liable in cases where restrictive regulations,
                    injunctions by regulators, investigation or laws having an
                    impact, in particular, on the issue, management or
                    possession of token were to be adopted. Any user purchasing
                    tokens agrees to explore legal complications with any laws
                    or regulation in his / her respective country of residency.
                    In addition, the rules applicable to cryptocurrencies or
                    tokens are different in each country. This is why buyers are{' '}
                    <b>strongly advised</b> to do a legal and tax analysis prior
                    to their participation in the Token Sale.
                  </li>

                  <li style={{ listStyleType: 'circle' }}>
                    {' '}
                    <b>Risk of theft and hacking</b>: The Company cannot be held
                    responsible for acts of hacking (infiltration, defacement or
                    DDoS) or computer theft that would affect the funds, the
                    distribution of tokens or the smooth roll of the Token Sale.
                  </li>
                  <li style={{ listStyleType: 'circle' }}>
                    {' '}
                    <b>Risk of technical errors</b>: The Company cannot be held
                    responsible for errors and deficiencies in the cryptographic
                    processes implemented in the context of the Token Sale.
                    Similarly, the Purchaser declares to accept and understand
                    the risk of error in the code of the smart-contract, the
                    trust account or the software used for the Token Sale.
                  </li>
                </ul>
              </li>
              <li>
                {' '}
                Disclosures on the Company:
                <br />
                Wallfair Ltd., 2 Victoria Street, St. Anne, GY9 3UF, Alderney
                <br />
                Managing Director: Mr. Sebastian Diemer
                <br />
                E-Mail: <a href="mailto:hello@wallfair.io">hello@wallfair.io</a>
              </li>
              <li>
                {' '}
                These Terms &amp; Conditions and any contractual relationship
                arising in relation with the use of the platform as well as the
                token sale are governed exclusively by laws of Guernsey. The
                courts of Guernsey have exclusive jurisdiction. The Parties
                agree to seek an amicable settlement prior to bringing any legal
                action. Failing this, any dispute, of any nature whatsoever
                regarding the Commercial Operation, will be brought expressly
                before the court with jurisdiction over the Company’s registered
                headquarter.
              </li>
              <li>
                {' '}
                If any term, clause or provision of these Terms &amp; Conditions
                is held unlawful, void or unenforceable, then that term, clause
                or provision will be severable from these Terms &amp; Conditions
                and will not affect the validity or enforceability of any
                remaining part of that term, clause or provision, or any other
                term, clause or provision of these Terms &amp; Conditions. In
                the case of a clause not being valid or in the case that a
                regulation has not been included therein, this gap shall be
                replaced by a valid clause that the Parties would have been
                agreed upon if they would have known the gap.
              </li>
            </ol>
          </section>
        </LegalText>
        <ContentFooter />
      </BaseContainerWithNavbar>
    </div>
  );
};

export default TermsAndConditions;

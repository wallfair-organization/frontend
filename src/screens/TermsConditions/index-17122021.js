import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import { useEffect } from 'react';
import styles from './styles.module.scss';

const TermsConditions = (props) => {

  useEffect(() => {
    const hash = props.history.location.hash;

    const el = hash && document.getElementById(hash.substr(1));
    if (el) {    
      el.scrollIntoView({behavior: "smooth"});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>
       
       <div className={styles.textContainer}>
          <h1>Terms and Conditions</h1>
          <p>Last updated: 17 Dec. 21</p>

          <h2>1. Introduction</h2>
          <p>
            These terms and conditions and the documents referred to below (the “Terms”) apply to the use of the current website (the “Website”) and its related or connected services in connection with the Wallfair operated under this Website (hereafter referred to as “Wallfair”,  “we” or “us”).<br /><br />
            You should carefully review these Terms as they contain important information concerning your rights and obligations concerning the use of the Website and form a binding legal agreement between you - our customer (the “Customer”), and us. By using this Website and/or accessing the service, you, whether you are a guest or a registered user with an account (“Account”), agree to be bound by these Terms, together with any amendments, which may be published from time to time. If you do not accept these Terms, you must refrain from accessing the service and using the Website.<br /><br />
            The platform providing the services is owned by Wallfair N.V, a limited liability company registered in Curacao with company registration number 159041, with its registered office at Zuikertuintjeweg Z/N (Zuikertuin Tower), Curacao (“Company”), licensed in Curaçao under the Licence no. 365/JAZ Sub-License GLH-OCCHKTW0712022021  issued by Gaming Services Provider N.V. for the provision of online games of chance.
          </p>

          <h2>2. General Terms</h2>
          <p>
            We reserve the right to revise and amend the Terms (including any documents referred to and linked to below) at any time. You should visit this page periodically to review the Terms. Amendments will be binding and effective immediately upon publication on this Website. If you object to any such changes, you must immediately stop using the service. Your continued use of the Website following such publication will indicate your agreement to be bound by the Terms as amended from time to time. Any bets placed before a change of the Terms but not settled prior to the respective changed Terms become effective will be subject to the pre-existing Terms. If the Terms will be updated, the platform will notify you and ask you to confirm your consent.
          </p>
          <p>
            <b>Term of agreement.</b> These Terms shall remain in full force and effect while you access or use the service provide on or through the Website or are a Customer or visitor of the Website. These Terms will survive the cancelation or termination of your Account for any reason.
          </p>
          <p>
            <b>Gender.</b> Words importing the singular number shall include the plural and vice versa, words importing the masculine gender shall include the feminine and neuter genders and vice versa and words importing persons shall include individuals, partnerships, associations, trusts, unincorporated organisations and corporations.
          </p>
          <p>
            <b>Waiver.</b> No waiver by us, whether by conduct or otherwise, of a breach or threatened breach by you of any provisions of these Terms shall be effective against, or binding upon, us unless made in writing and duly signed by us, and, unless otherwise provided in the written waiver, shall be limited to the specific breach waived. The failure of us to enforce at any time any provisions of these Terms shall not be construed to be a waiver of such provision or of the right of us to enforce such provision at any other time.
          </p>
          <p>
            <b>Acknowledgement.</b> By hereafter accessing or using the service, you acknowledge having read, understood and agreed to each and every paragraph of these Terms. As a result, you hereby irrevocably waive any future argument, claim, demand or proceeding to the contrary of anything contained in these Terms.
          </p>
          <p>
            <b>Language.</b> In the event of there being a discrepancy between the English language version of these Terms and any other language version, the English language version will be deemed to be the correct version and shall prevail any other language version
          </p>
          <p>
            <b>Governing Law.</b> These Terms are governed by the law in force in Curaçao; and you unconditionally and irrevocably submit the exclusive (sole) right of the courts of Curaçao jurisdiction to settle any dispute resolutions (including claims for compensation and counterclaims), that may arise because of the creation, validity, effect, interpretation or action, or legal relations established by the Terms or in any other manner arising from the Terms; and you irrevocably waive any right that it may have to object to an action being brought in those courts, or to claim that the action has been brought in an inconvenient forum, or that those courts do not have jurisdiction. Nothing in this clause shall limit the right of us to take proceedings against you in any other court of competent jurisdiction, nor shall the taking of proceedings in any one or more jurisdictions preclude the taking of proceedings in any other jurisdictions, whether concurrently or not, to the extent permitted by the law of such other jurisdiction.
          </p>
          <p>
            <b>Entire agreement.</b> These Terms constitute the entire agreement between you and us with respect to your access to and use of the Website, the platform and the service provided thereon and in connection thereto, and supersedes all other prior agreements and communications, whether oral or written with respect to the subject matter hereof.
          </p>
          <p>2.1.These Terms and any contractual relationship arising in relation with the use of the platform are governed exclusively by laws of Curacao with the courts of Curacao having exclusive jurisdiction.</p>
          <p>2.2	The Parties agree to seek an amicable settlement prior to bringing any legal action against each other. Failing this, any dispute, of any nature whatsoever regarding the commercial operation, will be brought expressly before the court with jurisdiction over the Company’s registered headquarter. </p>
          <p>2.3	If any term, clause or provision of these Terms is held unlawful, void or unenforceable, then that term, clause or provision will be severable from these Terms and will not affect the validity or enforceability of any of the remaining term, clause or provision, or any other term, clause or provision of these Terms. In  case of a clause not being valid or in the case that a regulation has not been included therein, this gap shall be replaced by a valid clause that the Parties would have agreed upon if they would have known the gap.</p>
          <p>2.4 The games offered on the platform can be played exclusively based on the use of WFAIR token credits. The WFAIR token itself is a utility token developed per ERC20-based smart contracts (“WFAIR Tokens”). Wallfair.io is a blockchain-based platform built on Polygon chain and incorporating the usability function of an WFAIR Tokens distributed through decentralized exchanges as well as this Website. It offers a graphical user interface for visualizing and interacting with data stored in a decentralized blockchain network.</p>
          <p>2.5 The Company offers exclusively WFAIR Tokens credits as a method of payment on the platform, platform participants will therefore need to acquire the WFAIR Token prior to the participation in the games offered on the platform. After the acquisition of the WFAIR Tokens these will be credited to your Account in the form of token credits and you may participate in the games and bets offered on the platform.</p>
          <p>The acquisition of the WFAIR Token itself is regulated by the following rules:</p>
          <p>
            <ul>
              <li>the participants/traders need to be able to participate in the KYC process and familiarize themselves with the risks connected to token trading and financial operations of any kind. Any participant unable to fulfill these requirements will be immediately excluded from the platform and cannot use the services provided thereon and may be liable for all consequences of such illegal events both in terms of civil and criminal liability including damages, torts and the costs of legal representation accumulated by the Company in connection to such violation.</li>
              <li>WFAIR Tokens are not shares or securities of any type. They do not entitle you to any ownership or other interest in the Company, they are merely a means by which you may be able to utilize certain services on the platform provided by the Website that is yet to be developed. There is no guarantee that the platform will actually be developed. The WFAIR Tokens are functional utility tokens that will be designed for the use on the platform provided on the Website that is yet to be developed.</li>
            </ul>
          </p>
          <p>2.6 The Company is completely responsible for the setup, content and financial frame conditions of all games that are suggested and/or placed on the platform provided by the Website. In connection hereto, the Company does not allow any activities that may qualify as illegal, unethical, fraudulent or unfair towards any of the participating parties in any of the applicable jurisdictions, be it with regard to the verification of the results, possible outcomes or unlawful agreements with the purpose of putting other platform participants at a disadvantage. Regardless the aforesaid, this Website offers gaming which involve a high risk. To be a user of our Website you must be over 18 y.o and have a high risk experience regarding gaming.</p>
          <p>2.7 All game events are reviewable by the Company`s personnel – members of staff hereby have the ultimate discretion about the placement of the games on the platform provided by the Website and the wording that can be used for the game description.</p>
          <p>2.8 These Terms are not a solicitation for investment and do not constitute a prospectus or offering of securities of any sort or any other form of capital investment product in any jurisdiction.</p>
          <p>2.9 We recommend that you consult legal, financial, tax and other professional advisors or experts for further guidance before participating in the activities offered on the platform, you are specifically strongly advised to request independent legal advice in respect of the legality of online casino platforms and your participation in it in your jurisdiction. We are not responsible for the violation of your local laws related to online-gaming.</p>
          <p>2.10 All platform participants and users should be aware that their bets are not refundable and accept the inherent risk of a total loss of any money place in a bet. This implicit risk is associated with any gaming and betting platform and can be affected by either internal or external factors that are out of the control scope of Wallfair. There is a risk that future operations of the platform will need approvals or licenses in all or certain jurisdiction which the Company does not hold and which have not been applied for. Finally, you as a customer, visitor and user of the services provided through the platform declare to be aware of the legal uncertainty of this type of transaction and to have conducted your own legal guidance according to the applicable law to which you are subject.</p>
          <p>2.11 As part of the Know Your Customer procedure (“KYC”), anyone who would like to participate in the platform-organized activities will have to provide the Company with the following details:</p>
          <p>
            <ul>
              <li>First and last name</li>
              <li>Date and place of birth</li>
              <li>Current address</li>
              <li>Citizenship </li>
              <li>A copy of passport or ID card.</li>
            </ul>
          </p>

          <h2>3. Your Obligations</h2>
          <p>Wallfair.io is a gambling website, do not connect to it if you are not allowed to gamble for legal, health-related, moral, religious, or psychological reasons. By accessing the Website or creating an Account on our Website, you confirm that you are in a state of mind that allows you to gamble responsibly, make responsible decisions in physically challenging conditions, and acknowledge their consequences, as well as you being legally allowed to gamble.</p>
          <p>You acknowledge and confirm that the following statements are true and correct at all times when accessing the Website and using the service provided thereon:</p>
          <p>3.1. You are over 18, or the legal age at which gambling, or gaming activities are allowed under the law or jurisdiction that applies to you. We reserve the right to request proof of age documents from you at any time. You must not access the Website or utilize the service if you are not 18.</p>
          <p>3.2. You are of legal capacity and can enter into a binding legal agreement with us. You must not access the Website or utilize the service if you are not of legal capacity.</p>
          <p>3.3. You are aware that the right to access and use the Website and any services and/or products offered thereon, may be considered illegal in certain countries. We are not able to verify the legality of service in each and every jurisdiction, consequently, you are responsible in determining whether your accessing and using our Website is compliant with the applicable laws in your country and you warrant to us that gambling is not illegal in the territory where you reside. For various legal or commercial reasons, we do not permit Accounts to be opened or used by customers resident in certain jurisdictions, including but not limited to:</p>
          <p>Afghanistan, Albania, Algeria, American Samoa, Angola, Antigua & Barbuda, Aruba, Australia, Bahamas, Belgium, Belize, Bonaire, Botswana, Bulgaria, Burkina Faso, Central African Republic, Chad, Côte d'Ivoire, Cuba, Curacao, Cyprus, Czech Republic, Democratic People’s Republic of the Congo, Denmark, Ecuador, Eritrea, Estonia, Ethiopia, France and its territories, French Guiana, French Polynesia, Germany, Ghana, Gibraltar, Guadeloupe, Guam, Guernsey, Guinea-Bissau, Guyana, Hong Kong, Hungary, Iceland, Iran, Iraq, Ireland, Israel, Italy, Jersey, Kenya, Kuwait, Korea (North Korea), Laos, Latvia, Lebanon, Libya, Liechtenstein, Lithuania, Luxembourg, Mali, Malta, Martinique, Mauritania, Mayotte,	Mexico, Morocco, Myanmar, Namibia, Netherlands, New Guinea, Nicaragua, Niger, Pakistan, Palestine, Panama, Papua, Poland, Portugal, Reunion, Romania, Saba, Serbia, Slovakia, Somalia, Spain, Sri Lanka, St. Maarten, Statia, Sudan, Sweden, Switzerland, Syria, Taiwan, the Northern Mariana Islands, the United Kingdom, the United States and all of its territories,	the US Virgin Islands,Trinidad and Tobago, Tunisia, Turkey, U.S. Virgin Islands,  Uganda, United Arab Emirates, Venezuela, Yemen, Zimbabwe or other restricted jurisdictions that are reported by us from time to time. By using the Website you confirm you are not a resident in any of the aforementioned jurisdiction.</p>
          <p>For further information regarding the territories in which we do not provide any services please see Section 4.1.3 below.</p>
          <p>3.4 You are a resident in a jurisdiction that allows gambling. You are not a resident of any country in which the access to and/or participation in online gambling is prohibited to its residents or to any person within such country is prohibited. It is your sole responsibility to ensure that your use of the service provided on the  is legal. When attempting to open an Account or using the Website, it is the responsibility of you as a player to verify whether gambling is legal in that particular jurisdiction your residing in.</p>
          <p>3.5. You may not use a VPN, proxy or similar services or devices that mask or manipulate the identification of your real location.</p>
          <p>3.6. You are the authorized user of the payment method you use and all funds, which are on your Account and used within the services are legal.</p>
          <p>3.7. You must make all payments to us in good faith and not attempt to reverse a payment made or take any action which will cause such payment to be reversed by a third party.</p>
          <p>3.8. The games offered on the Website from the Company and third parties are games of chance, games of skill and games of risk. The Company and any third parties are not responsible for any financial losses or damages which might occur to you by participating in games of chance, games of skill and games of risk. When placing bets you may loose some or all of your money deposited to the service in accordance with these Terms and you will be fully responsible for that loss.</p>
          <p>3.9. The result of games of chance and games of risk is uncertain and that the Company and its third-party partners are not responsible or liable for games not providing your desired results. By accessing the Website and agreeing to the Terms, you confirm that you know about the possible risk of financial losses, as well as other losses, and the possibility of getting addicted when participating in games of chance and games of risk. For further information regarding financial risks and health risks and how to prevent them, please study our Responsible Gambling- Policy carefully for your own benefit. You acknowledge being responsible for all addictions or side effects that might occur when taking part in games of chance or games of risk. The Company wishes to help you to avoid any side effects, including addictions, and summarized important steps, measurements, and aids to avoid addiction and side effects from gambling in its responsible gambling policy; for your own benefit, read them carefully.</p>
          <p>3.10. When placing bets you must not use any information obtained in breach of any legislation in force in the country in which you were when the bet was placed.</p>
          <p>3.11. You are not acting on behalf of another party or for any commercial purposes, but solely on your own behalf as a private individual in your personal capacity.</p>
          <p>3.12 You participate in the games strictly in your personal non-professional capacity for recreational and entertainment reasons only.</p>
          <p>3.13 All information that you provide to Wallfair during the term of validity of this agreement is true, complete, and correct, and that you shall immediately notify Wallfair of any change of such information.</p>
          <p>3.14. You shall not either attempt to manipulate any market or element within the service in bad faith nor in a manner that adversely affects the integrity of the service or us. You shall not be involved in any fraudulent, collusive, fixing or other unlawful activity in relation to your or third parties’ participation in any of the games and shall not use any software-assisted methods or techniques or hardware devices for Your participation in any of the games. Wallfair hereby reserves the right to invalidate any bet/wager in the event of such behaviour;</p>
          <p>3.15. You must generally act in good faith in relation to us, the service provided through the platform on the Website, and any other users of the services at all times and for all bets made using the service.</p>
          <p>3.16. You, or, if applicable, your employees, employers, agents, or family members, are not registered as an Affiliate in our Affiliate program.</p>
          <p>3.17. While using Wallfair at any time you consent to provide us only true, real, and objective data on default and when We request it.</p>
          <p>3.18. You understand the volatility of the crypto market and you accept the possibility of your currency/currencies price changing while you are waiting for your withdrawal or your withdrawal is being processed by our risk department. You understand that WFAIR Token credits are not considered a legal currency or tender and as such on the Website they are treated as virtual funds with no intrinsic value.</p>
          <p>3.19 You are not allowed to transfer WFAIR Token credits from your Account to other players or to receive WFAIR Token credits from other players into your Account, or to transfer, sell and/or acquire, user Accounts.</p>
          <p>3.20. You are a mentally competent person and you do not suffer from gambling addiction. In case a person with such a problem enters the Site - the responsibility lies on their side only.</p>
          <p>3.21. You agree not to use any third-party software in any of the bets placed on Wallfair as well as not to abuse any game/functioning bugs found on the platform.</p>
          <p>3.22 All users and/players should be courteous to each other and avoid rude or obscene comments.</p>

          <h2 id="restricted">4. Restricted use</h2>
          <p>4.1. You must not use the service provided on the Website:</p>
          <p>4.1.1. If you are under the age of 18 years (or below the age of majority as stipulated in the laws of the jurisdiction applicable to you) or if you are not legally able to enter into a binding legal agreement with us or you acting as an agent for, or otherwise on behalf, of a person under 18 years (or below the age of majority as stipulated in the laws of the jurisdiction applicable to you);</p>
          <p>4.1.2. If you reside in a country in which access to online gambling to its residents or to any person within such country is prohibited.</p>
          <p>4.1.3. People who live or have a permanent or temporary residency in any of the following countries are not allowed to create an Account on the Website or use the Website in any way:</p>
          <p>“Prohibited Access Areas”: Australia, Aruba, Bonaire , Belize, Cyprus, Curacao, the Netherlands, Gibraltar, Guernsey, Germany, France, Hungary, Saba, Statia, St. Maarten, the United Kingdom, French Guiana, Israel, Iran, Ethiopia, Guadeloupe, Poland,, Venezuela, Cuba, Slovakia, French Polynesia, Jersey, Liechtenstein, Luxembourg, Martinique, Reunion, Mayotte, the United States and all of its territories, including but not limited to Puerto Rico, Guam, the US Virgin Islands, the Northern Mariana Islands, American Samoa and United States outlying Islands and any other jurisdiction that the Central Government of Curacao deems online gambling illegal. This shall include all the named Nations' Territories. Residents from the Prohibited Access Areas are prohibited from opening an Account or using or accessing the services or any other services offered by the company. Residents of the above-mentioned territories are not permitted to establish an Account, use or access the company’s products and services, or any other services. Thus, these zones are completely off-limits</p>
          <p>“Partially Prohibited Areas”: We do not authorize any transactions from Turkey, Argentina, Mexico, Brazil, or Colombia until we have fulfilled the KYC and AML 1 verification. Please review our KYC-AML-Policy for more details about the KYC and AML verification. Until approved, any person residing or having a permanent presence in one of these countries is barred from participating in any promotions or transactions.</p>
          <p>We currently do not accept any transactions or purchases from the following regions because of armed conflicts or political unrest (“Restricted due to Armed Conflict or Political Unrest”):</p>
          <table>
            <tr>
              <td>Albania</td>
              <td>Ghana</td>
              <td>Mali</td>
              <td>Somalia</td>
            </tr>
            <tr>
              <td>Afghanistan</td>	
              <td>Guyana</td>
              <td>Mauritania</td>
              <td>Sri Lanka</td>
            </tr>
            <tr>
              <td>Algeria</td>
              <td>Hong Kong</td>
              <td>Morocco</td>
              <td>Sudan</td>
            </tr>
            <tr>
              <td>Angola</td>
              <td>Iran</td>
              <td>Myanmar</td>
              <td>Syria</td>
            </tr>
            <tr>
              <td>Bahamas</td>
              <td>Iraq</td>
              <td>Namibia</td>
              <td>Taiwan</td>
            </tr>
            <tr>
              <td>Botswana</td>
              <td>Israel</td>
              <td>Nicaragua</td>
              <td>The Democratic Republic Of The Congo</td>
            </tr>
            <tr>
              <td>Burkina Faso</td>
              <td>Kenya</td>
              <td>Niger</td>
              <td>Trinidad and Tobago</td>
            </tr>
            <tr>
              <td>Central African Republic</td>
              <td>Kuwait</td>
              <td>North Korea</td>
              <td>Tunisia</td>
            </tr>
            <tr>
              <td>Chad</td>	
              <td>Laos</td>	
              <td>Pakistan</td>
              <td>Uganda</td>
            </tr>
            <tr>
              <td>Ecuador</td>
              <td>Lebanon</td>
              <td>Palestine, Panama</td>
              <td>Yemen</td>
            </tr>
            <tr>
              <td>Ethiopia</td>
              <td>Libya</td>
              <td>Papua New Guinea</td>
              <td>Zimbabwe</td>
            </tr>

          </table>
          <p>This restriction is temporary and will end as soon as the armed conflicts end and political stability returns to the region. People living or having a permanent residence in one of these nations are excluded from all services on the Website and may not access the Website in any way or create an Account on our Website. Any Account found to access the Website from a restricted area due to armed conflict or political unrest via a VPN or another method to hide his identity will be banned from the Website and all services. Any Wallfair remaining in the Wallfair wallet will be frozen</p>
          <p><b>“Regulated Territories”: </b></p>
          <p>We do not authorize any transactions from the following territories as we do not possess a license from the local regulators of each of the following nations: Belgium, Bulgaria, Czech Republic, Germany, Denmark, Estonia, Italy, Latvia, Lithuania, Portugal, Romania, Serbia, Sweden, Switzerland.</p>
          <p>4.1.4. When attempting to open an Account or using the Website, it is the responsibility of the player to verify whether gambling is legal in that particular jurisdiction. You warrant that in the jurisdiction of your country or the country where you are currently staying, gambling or participation in games of chance, games of risk, or games of skill is not prohibited. It is your sole responsibility to make sure such restrictions or bans do not exist in your home country or the country in which you reside. You are liable to ensure you act in accordance with the laws of your home country or the country in which you currently reside. In case of any violation of these warrants, the company reserves the right to immediately block you from accessing the services and Website, close your Account and permanently freeze all your remaining balances in your Account; any winnings and rewards will be confiscated and the remaining balance returned (subject to reasonable charges), and any returns, winnings or rewards which you have gained or accrued will be forfeited by you and may be reclaimed by us; and you will return to us on demand any such funds which have been withdrawn.</p>
          <p>4.1.5. To collect nicknames, e-mail addresses and/or other information of other customers by any means (for example, by sending spam, other types of unsolicited emails or the unauthorised framing of, or linking to, the service); </p>
          <p>4.1.6. You warrant not to use any form of VPN or other methods or program fit to hide your IP or your state of origin unless you went through full ID and address verification. In addition, the usage of a VPN is only allowed with written consent from the Company. Users or customers found to use a VPN without the Company’s consent will be excluded from all services on the Website, and all remaining funds will be frozen indefinitely. You acknowledge that you are solely responsible for all losses that might occur to you over your VPN usage without the Company‘s consent, including but not limited to financial losses and the loss of your Account on the Website. </p>
          <p>4.1.7. To disrupt or unduly affect or influence the activities of other customers or the operation of the service generally;</p>
          <p>4.1.8. To promote unsolicited commercial advertisements, affiliate links, and other forms of solicitation which may be removed from the service without notice;</p>
          <p>4.1.9. In any way which, in our reasonable opinion, could be considered as an attempt to: (i) cheat the service or another customer using the service; or (ii) collude with any other customer using the service in order to obtain a dishonest advantage;</p>
          <p>4.1.10. To scrape our odds or violate any of our Intellectual Property Rights;</p>
          <p>4.1.11. For any unlawful activity whatsoever; and/or</p>
          <p>4.1.12. Creating multiple Accounts for the purpose of collusion, fraud, service abuse and/or any kind of services manipulation is prohibited and may result in Account closure.</p>
          <p>4.2. You cannot sell or transfer your Account to third parties, nor can you acquire a player Account from a third party. If you give, sell, borrow, lend or hand over your Account or anything connected to your Account in any way to someone else, your Account will be immediately frozen. All your funds will be indefinitely frozen in your Account. Your Account is given to you for personal usage to chat with other users and to non-professionally take part in games of risk, games of chance, and games of skill. Your access to the services on the Website is granted non- exclusive and non-transferable.</p>
          <p>4.3. You may not, in any manner, transfer funds between player Accounts.</p>
          <p>4.4. We may immediately terminate your Account upon written notice to you if you use the service for unauthorised purposes. We may also take legal action against you for doing so in certain circumstances.</p>
          <p>4.5. Employees of the Company, its licensees, distributors, wholesalers, subsidiaries, advertising, promotional or other agencies, media partners, contractors, retailers and members of the immediate families of each are NOT allowed to use the service for real money without prior written consent from the Company Director or CEO. Should such activity be discovered, the Account(s) will be immediately terminated and all bonuses/winnings will be forfeited.</p>
          <p>4.6 You are obligated to pay taxes on all your earnings on the Website through any games of skill, games of risk, games of chance, or games according to the governing law of the jurisdiction you are residing in. The Company and its third-party partners cannot be held liable for your failure to pay those taxes of your local jurisdiction, disregarding if they are delayed, insufficient, or not paid at all.</p>

          <h2>5. Registration</h2>
          <p>You agree that at all times when using the service:</p>
          <p>5.1. When you open an Account on the Website, you must provide us information that must be accurate, complete, and timely. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your Account on our Website and exclusion from our services. You accept if you intentionally submit that misinformation, incorrect or incomplete information, will lead to your Account being closed immediately, and all funds and WFair Tokens credit on it will be frozen on it indefinitely</p>
          <p>We reserve the right to refuse to accept a registration application from any applicant at our sole discretion and without any obligation to communicate a specific reason.</p>
          <p>5.2. Before using the service, you must personally complete the registration form and read and accept these Terms. In order to start betting on the service or withdraw your winnings, we may require you to become a verified customer which includes passing certain checks (e.g. KYC checks). You may be required to provide a valid proof of identification and any other document as it may be deemed necessary. This includes but is not limited to, a picture ID (copy of passport, driver’s licence or national ID card) and a recent utility bill listing your name and address as proof of residence. We reserve the right to suspend wagering or restrict account options on any Account until the required information is received. This procedure is done in accordance with the applicable gaming regulation and the anti-money laundering legal requirements. Additionally, you will need to fund your Account using the payment methods set out on the payment section of our Website.</p>
          <p>5.3. You have to provide accurate contact information, including among other things, a valid email address (“Registered Email Address”), and update such information in the future to keep it accurate. It is your responsibility to keep your contact details up to date on your Account. Failure to do so may result in you failing to receive important Account related notifications and information from us, including changes we make to these Terms. Any initial or grossly negligent neglect of your obligation to inform us regarding any changes in your past or current information will result in your Account being frozen indefinitely. In addition, all your remaining funds/credits in your Account will be frozen indefinitely, and you will be excluded from all current and future services on the Website. We identify and communicate with our customers via their Registered Email Address. It is the responsibility of the Customer to maintain an active and unique email account, to provide us with the correct email address and to notify the Company immediately of any changes in their email address. Each Customer is wholly responsible for maintaining the security of his Registered Email Address to prevent the use of his Registered Email Address by any third party. Company shall not be responsible for any damages or losses deemed or alleged to have resulted from communications between Company and the Customer using the Registered Email Address. Any Customer not having an email address reachable by Company will have his Account suspended until such an address is provided to us. We will immediately suspend your Account to this effect if you intentionally provide false or inaccurate personal information. We may also take legal action against you for doing so in certain circumstances and/or contact the relevant authorities who may also take action against you.</p>
          <p>5.4. You are only allowed to have one Account with the platform provided by our Website. This includes the use of representatives, relatives, associates, affiliates, related parties, connected persons and/or third parties operating on your behalf. All duplicate player Accounts will be counted as “duplicates” and will be closed immediately. Duplicate Accounts are subject to immediate closure if it is found that you have multiple Accounts registered with us. Any winnings, bonuses, and returns that you have gained from the duplicate Account we call into question, and also, we may reclaim it. You will return to us all demanded funds, which have been withdrawn from your duplicate Account. Furthermore, players who created multiple Accounts with the sole intention of taking advantage of our bonus promotions (if any) will not be eligible to receive any winnings made with our bonuses. Furthermore, their Accounts will be blocked upon recognition without prior notice.</p>
          <p>5.5. In order to ensure your financial worthiness and to confirm your identity, we may ask you to provide us with additional personal information, such as your name and surname, or use any third-party information providers in connection hereto, if deemed necessary. Should any additional personal information be obtained via third-party sources, we will inform you about the data obtained.</p>
          <p>5.6. You must keep your Account password confidential at all times. Provided that the personal information requested has been correctly supplied, we are entitled to assume that bets, deposits and withdrawals have been made by you in your own name. We advise you to change your password on a regular basis and never disclose it to any third party. It is your responsibility to protect your password and any failure to do so shall be at your sole risk and expense. You may log out of the Account at the end of each session. If you believe any of your Account information is being misused by a third party, or your Account has been hacked into, or your password has been discovered by a third party, you must notify us immediately. You must notify us if your Registered Email Address has been hacked into, we may, however, require you to provide additional information/ documentation so that we can verify your identity. We will immediately suspend your Account once we are aware of such an incident. In the meantime you are responsible for all activity on your Account including third party access, regardless of whether or not their access was authorised by you.</p>
          <p>5.7. You must not at any time transmit any content or other information on your Account and the services provided to you  to another Customer or any other party by way of a screen capture (or other similar method), nor display any such information or content in a frame or in any other manner that is different from how it would appear if such customer or third party had typed the URL for the service into the browser line.</p>
          <p>5.8. We are under no obligation to open an Account for you and our Website sign-up page is merely an invitation to apply for the opening of an Account. It is entirely within our sole discretion whether or not to proceed with the opening of an Account for you and, should we refuse to open an Account for you, we are under no obligation to provide you with a reason for the refusal.</p>
          <p>5.9. Upon receipt of your application, we may get in touch to request further information and/ or documentation from you in order for us to comply with our regulatory and legal obligations.</p>
          <p>5.10 Users who register via mail, need to verify their Account (via mail). If it will not be done within 30 days, we will delete this Account. The Company reserves the right to change this period at any time without prior notice. </p>
          <p>Identification</p>
          <p>5.11. We comply with Curacao Laws, legal regulations, and guidance for the prevention of money laundering and terrorism financing. All suspicious transactions will be investigated. In such cases, the Company is prohibited to inform the player or third parties involved in the investigation. An exception can be details that an investigation is taking place or may be carried out or that information has been or may be transmitted to the competent authorities. In case of suspicious activity, the Company has the right to suspend, freeze, block, delete or close a player’s Account and withhold funds according to law or if it is required by the competent authorities. </p>
          <p>5.12. On the Website, all transactions are checked to prevent money laundering and other illegal activity. If you agree with the Terms, you authorize us to undertake a personal identification check, due to our requirements or requirements from the third party (including regulatory authority) to confirm your identity and contact details. In certain circumstances, we may have to contact you and ask you to provide the necessary information in order to complete the check. If you do not provide us with the required information, the Company reserves the right to freeze or close your Account until you have provided us with the requested information.</p>
          <p>5.13. If you do not confirm that you already are 18 years old, the Company has the right to freeze your Account until you prove your age. If it is proved that you are younger than 18 years old and you did some actions on the Website, the provisions of Clause 16 shall apply.</p>
          <p>5.14. If you breach these Terms, or we have a reasonable suspicion that you did so, we may with or without prior notice to you terminate your Account. In such case, all your outstanding bets will be canceled, and your Account will be closed, and we may also confiscate and recover from your Account balance the amount of the winnings awarded or paid to you and all bonuses, bonus money, and other incentives, which you shall forfeit in such case. Following this, on your request and subject to our discretion, we will return the remainder of the real money balance of your Account (if any) to you, subject to reasonable charges, regulatory obligations, and our ability to do so using the payment method we verified as belonging solely to you.</p>

          <h2>6. Your Account</h2>
          <p>6.1. Accounts can use several currencies, in this case all Account balances and transactions appear in the currency used for the respective transaction.</p>
          <p>6.2. We do not give credit for the use of the service. However, we may grant a bonus from time to time for the registration as a user of a platform as well as a referral bonus for the referral of new users to our platform. The granting of a bonus and/or a referral bonus is, however, at our sole discretion and may be cancelled and terminated at any time.</p>
          <p>6.3. We may close or suspend an Account immediately if you are not or we reasonably believe that you are not complying with these Terms, or to ensure the integrity or fairness of the service provided on the Website or if we have other reasonable grounds to do so. We may not always be able to give you prior notice. If we close or suspend your Account due to you not complying with these Terms, we may cancel and/or void any of your bets and withhold any money in your Account (including the deposit).</p>
          <p>6.4. We reserve the right to close or suspend any Account without prior notice. Unless stated otherwise herein, contractual obligations already matured will however be honoured.</p>
          <p>6.5. We reserve the right to refuse, restrict, cancel or limit any wager at any time for whatever reason, including any bet perceived to be placed in a fraudulent manner in order to circumvent our betting limits and/ or our system regulations.</p>
          <p>6.6. If any amount is mistakenly credited to your Account it remains our property and when we become aware of any such mistake, we shall notify you and the amount will be withdrawn from your Account.</p>
          <p>6.7. In general, we do not grant any credits to player. If, however, for any reason, your Account goes overdrawn, you shall be in debt to us for the amount overdrawn.</p>
          <p>6.8. You must inform us immediately as soon as you become aware of any errors with respect to your Account. In the event we deem in our sole discretion that you have been taking unfair advantage of any bonuses or have executed any other act in bad faith in relation to a bonus, promotion offered on the Website, we shall have the right to block or terminate your Account and, in such circumstances, we shall be under no obligation to refund you any funds that may be in your Account.</p>
          <p>6.9. Please remember that betting is purely for entertainment and pleasure, and you should stop as soon as it stops being fun. Absolutely do not bet anything you can’t afford to lose. If you feel that you may have lost control of your gambling, we offer a self-exclusion option. Just send a message to our customer support department using your Registered Email Address that you wish to SELF-EXCLUDE and this request will take effect within 24 hours from the moment of its receipt. In this case your Account will be disabled until your further notice, and you won’t be able to login to it.</p>
          <p>6.10. You cannot transfer, sell, or pledge your Account to another person. This prohibition includes the transfer of any assets of value of any kind, including but not limited to ownership of accounts, winnings, deposits, bets, rights and/or claims in connection with these assets, legal, commercial or otherwise. The prohibition on said transfers also includes however is not limited to the encumbrance, pledging, assigning, usufruct, trading, brokering, hypothecation and/or gifting in cooperation with a fiduciary or any other third party, company, natural or legal individual, foundation and/or association in any way shape or form</p>
          <p>6.11. Should you wish to close your Account with us, please send an email from your Registered Email Address to our customer support department via the links on the Website. . When you make a request for the Account closure, you accept the fact that your Account is not going to be ever unlocked. It is advisable to withdraw all of your funds before closing the Account.</p>

          <h2>7. Inactive Accounts</h2>
          <p>7.1. We will charge you a fee of €5 (or another currency equivalent) per calendar month (“Inactive Account Fee”) if:</p>
          <p>
            a. you have not logged into your Account or logged out from your Account, or used the service, or made any bet in any section of the service for twelve consecutive months or more (“Account Activity”); and <br/>
            b. your Account is in credit.
          </p>
          <p>7.2. You will be notified that we will start charging you the fees in the course of the eleventh month of your inactivity and you will always have the option to log in and withdraw your funds.</p>
          <p>7.3. The Inactive Account Fee will be withdrawn from your Account on a monthly basis to the extent that your Account remains in credit and only for the period during which there remains no Account Activity after the initial twelve-month period has passed. If the Inactive Account Fee is due to be withdrawn from your Account and the balance of your Account is less than €5 (or equivalent currency), the Inactive Account Fee shall comprise the remaining funds in your Account.</p>


          <h2>8. Deposit of Funds</h2>
          <p>8.1. All deposits should be made from an Account or payment system or credit card that is registered in your own name, and any deposits made in any other currency will be converted using the daily exchange rate obtained from oanda.com, or at our own bank’s or our payment processor’s prevailing rate of exchange following which the respective amount in WFAIR Token credits will be credited to your Account accordingly. Note that some payment systems may apply additional currency exchange fees which will be deducted from the sum of your deposit.</p>
          <p>8.2. Fees and charges may apply to customer deposits and withdrawals, which can be found on the Website. In most cases we absorb transaction fees for deposits to your Wallfair.io Account. You are responsible for your own bank charges that you may incur due to depositing funds with us.</p>
          <p>8.3. The Company is not a financial institution and uses a third party electronic payment processor to process credit and debit card deposits; they are not processed directly by us. If you deposit funds by either a credit card or a debit card, your Account will only be credited if we receive an approval and authorisation code from the payment issuing institution. If your card issuer gives no such authorisation, your Account will not be credited with those funds.</p>
          <p>8.4. You agree to fully pay any and all payments and charges due to us or to payment providers in connection with your use of the service. You further agree not to make any charge-backs or renounce or cancel or otherwise reverse any of your deposits, and in any such event you will refund and compensate us for such unpaid deposits including any expenses incurred by us in the process of collecting your deposit, and you agree that any winnings from wagers utilising those charged back funds will be forfeited. You acknowledge and agree that your player Account is not a bank Account and is therefore not guaranteed, insured or otherwise protected by any deposit or banking insurance system or by any other similar insurance system of any other jurisdiction, including but not limited to your local jurisdiction. Furthermore, the player Account does not bear interest on any of the funds held in it.</p>
          <p>8.5. If you decide to accept any of our promotional or bonus offer by entering a bonus code during deposit, you agree to the terms of each specific bonus.</p>
          <p>8.6. Funds originating from criminal and/or illegal and/or unauthorized activities must not be deposited with us.</p>
          <p>8.7. If you deposit using your credit card, it is recommended that you retain a copy of Transaction Records and a copy of these Terms.</p>
          <p>8.8. We reserve the right to forfeit any positive balance on your Account in case of reset of the wager or any actions that belong to duplicate Accounts, conspirations, frauds, criminal activity, or fakes.</p>
          <p>8.9. We do not offer refunds for deposits made in wallfair.io, except provided herein. By depositing money, you agree not to make any charge-backs, reversals, refunds, or otherwise cancel any deposits into your Account, and agree to refund and compensate us for unpaid deposits.</p>
          <p>8.10. Internet Gambling may be illegal in the jurisdiction in which you are located; if so, you are not authorized to use your payment card to deposit money into an Account on this Website. It is your sole responsibility to know the local laws concerning online gambling in your country of domicile.</p>

          <h2>9. Withdrawal of Funds</h2>
          <p>9.1. Due to the workflow of our anti-fraud system, the waiting time for your withdrawal can be prolonged up to the point when all the needed procedures will be conducted to supply a decent level of financial security for users (up to seven (7) calendar days and more if needed). </p>
          <p>9.2. Subject to the terms set forth herein, you may withdraw any unutilized and cleared funds held in your player account by submitting a withdrawal request in accordance with our withdrawal conditions. The minimum withdrawal amount per transaction is € 10 (or an equivalent in another currency) with the exception of an Account closure in which case you may withdraw the full balance, unless the Account has been frozen by us. In latter case all funds in the Account will be frozen and cannot been withdrawn.</p>
          <p>9.3. We reserves the right, at any time, to hold withdrawals to verify the source of obtaining. We reserve the right to restrict the service, deposit, or withdrawal until the investigation is sufficiently determined, or for any other reason in our sole discretion. We reserve the right to limit the number of transactions for some time without warning. We reserve the right to request photo ID, address confirmation or perform additional verification procedures (request your selfie, arrange a verification call etc.) for the purpose of identity verification prior to granting any withdrawals from your Account. We also reserve our rights to perform identity verification at any time during the lifetime of your relationship with us.</p>
          <p>9.4. All withdrawals must be made to the original debit, credit card, bank account, method of payment used to make the payment to your Account. We may, and always at our own discretion, allow you to withdraw balances or parts thereof to a payment method from which your original deposit did not originate. This will always be subject to additional security checks.</p>
          <p>9.5. The responsibility for withdrawing the funds lies with the account user only and the Website does not refund the funds that may occur as lost funds in case the receiving wallet/platform doesn’t accept transactions from smart-contract, any definite coins, or in case the user chose the wrong chain of transfer.</p>
          <p>Should you wish to withdraw funds but your Account is inaccessible, dormant, locked or closed, please contact our customer service department under the link provided on our Website.</p>
          <p>9.6. In cases when your balance is at least 10 times larger than the total sum of your deposits, your withdrawal will be limited to € 5,000 (or an respective currency equivalent) per month. In all other cases the maximum withdrawal amount per month is currency equivalent of € 10,000.</p>
          <p>9.7. Please note that we cannot guarantee successful processing of withdrawals or refunds in the event if you breach the rules stated in our Terms, in particular but not limited to the provisions regarding restricted use stated in Clauses 3.3 and 4.</p>

          <h2>10. Payment Transactions and Processors</h2>
          <p>10.1. You are fully responsible for paying all monies owed to us. You must make all payments to us in good faith and not attempt to reverse a payment made or take any action which will cause such payment to be reversed by a third party in order to avoid a liability legitimately incurred. You will reimburse us for any charge-backs, denial or reversal of payment you make and any loss suffered by us as a consequence thereof. We reserve the right to also impose an administration fee of €50, or any currency equivalent per charge-back, denial or reversal of payment you make.</p>
          <p>10.2. We reserve the right to use third party electronic payment processors and or merchant banks to process payments made by you and you agree to be bound by their terms and conditions providing they are made aware to you and those terms do not conflict with these Terms.</p>
          <p>10.3. Before making a deposit the user has to be sure of the correctness of the chain of the token he/she is depositing as well as meeting the minimal amount of deposit to make sure the deposit will be credited and reflected on the balance. In case a mistake in the deposit/withdrawal is done by the user - the responsibility lies on their side only.</p>
          <p>10.4 All transactions made on our Website might be checked to prevent money laundering or terrorism financing activity. Suspicious transactions will be reported to the relevant authority.</p>

          <h2>11. Affiliates</h2>
          <p>11.1 We offer you the chance to refer new users to the Website and accordingly reward you for doing so by giving you a certain amount of WFair Token credits as a reward. </p>
          <p>Affiliate: refers to any other user who joins via your invite link/code</p>
          <p>
            11.2 The Affiliate program is staggered in different levels. The number of people you register for the affiliate program is decisive.<br/>
            In order for you to register and be eligible for our Affiliate program you need to sign up at the Wallfair site and place at least one bet. </p>
          <p>11.2.1 The Affiliate program is the most attractive towards the first 500 participants and is divided into four different categories: </p>
          <p>
            1. The first 150 registered players/users eligible for the Affiliate program will be awarded the Galaxy Alpaca Badge with which they can earn up to a 20% referral lifetime bonus, corresponding to up to 20 000 000 WFAIR Token Credits  per month (“Galaxy Alpaca Badge”).<br/>
            2. The next 150 players/users who registered (players/users 151 - 300) and who are eligible for the Affiliate program will be awarded the Star Alpaca Badge with which they can earn up to a 20% referral lifetime bonus corresponding to up to 10 000 000 WFAIR Token credits  per month (“Star Alpaca Badge”).<br/>
            3. Players/users 301- 500 will be awarded the Moon Alpaca Badge with which they can earn up to a 15% referral lifetime bonus corresponding to up to 3 000 000 WFAIR Token credits per month (“Moon Alpaca Badge” and togetether with the Galaxy Alpaca Badge and the Star Alpaca Bade the “Badges” and each a “Badge”).<br/>
            4. Any and all other players/users can take part in the general affiliate program with which they can be awarded a commission for the traffic of player/users referred to the Website ofup to 500 000 WFAIR Token credits per month on 10 % commission (the “General Affiliate Program”).
          </p>
          <p>11.2.2 Depending for what category you qualify, you will receive the corresponding Badge showing your Affiliate status, the General Affiliate Program holds no badge. </p>
          <p>11.2.3 To keep the rewarded Badge and/or affiliate status, and the associated benefits, the user needs to be an active player. To be considered an active player, you need to place a minimum of 30 bets per month in the casino on our Website. In the event that you are not classified as an active player for two consecutive months, we will revoke the Badge and the benefits that come with it irrevocably.</p>
          <p>11.2.5 The referral bonus, both Badge and General Affiliate Program is calculated by the Company. The referral percentage defines how much the user receives from the gross profit generated by the referred player.</p>
          <p>
            For the Galaxy Alpaca Badge the referral bonus is 20%.<br/>

            For the Star Alpaca Badge the referral bonus is 20%.<br/>

            For the Moon Alpaca Badge the referral bonus is 15%.<br/>

            For the General Affiliate Program the referral bonus is 10%
          </p>
          <p>11.2.6 The referral bonus is capped at a certain amount for each month. Depending on the respective Badge, the following maximum bonuses are set.</p>
          <p>
            For the Galaxy Alpaca Badge the referral bonus is capped at 20.000.000 WFAIR Token credits per month.<br/>

            For the Star Alpaca Badge the referral bonus is capped at 10.000.000 WFAIR Token credits per month.<br/>

            For the Moon Alpaca Badge the referral bonus is capped at 3.000.000 WFAIR Token credits per month.<br/>

            For the General Affiliate Program the referral bonus is capped at 500 000 WFAIR Token credits per months. 
          </p>
          <p>11.2.7 Players/users who hold the Galaxy Alpaca Badge therefore belonging to the first 150 registered players are entitled to an additional reward. Wallfair awards the player /user with the highest losses a cash-back of 10% on a monthly basis. The winner of the cash-back will be selected on the last day of the month 14:00 GMT and will be contacted afterwards.</p>
          <p>11.2.8 You will get your personal invitation link that you can use to invite friends and acquaintances to the Wallfair Website. Everyone who signs up through your link will be registered in your account so that you can receive your bonus. Should it happen that something goes wrong with the tracking, or the invited player/user does not register directly via the shared link, a subsequent crediting of the invitation is unfortunately not possible. </p>
          <p>
            11.2.9 The % mentioned herein is calculated from the NGR.<br/>
            NGR is a financial figure that determines the basic profits share collected by the<br/>
            casino at the end of the month. It is defined by the following formula:
          </p>
          <p>
            NGR = A - B - C - D.<br/>
            A – total amount of all bets placed by players/users;<br/>
            B – the sum of all payments to players/users;<br/>
            C – the sum of all bonuses received by players/users;<br/>
            D – all company costs inclusive of the total of all taxes.
          </p>
          <p>11.3. You may see a detailed analysis regarding your affiliates on the affiliate tab on the Website. You can find your current commission measured in percentage on the affiliate tab of the Website. </p>
          <p>11.4. You are not allowed to use your affiliate code or promotion code for commercial or professional use. The affiliate system is exclusively for your personal, non- commercial, non-professional usage unless you previously asked and received written consent from our marketing team. Any violation will result in your affiliate program's termination and the permanent closure of your Wallfair user Account. All your remaining WFair Token credits will be frozen in your Account.</p>
          <p>11.5. You warrant not to attempt any abuse of the affiliate and promotion system. If any abuse attempt or illicit or illegal activity is found, your Account will be immediately terminated, and all your remaining WFair Token credits will be frozen in your Account.</p>
          <p>11.6. The Affiliate system comes as it is; future negotiations regarding the Affiliates system are not possible. If you choose to take part in the affiliate system, you accept it as it is and will use it following the Company's terms. Any violation will result in the immediate termination of your affiliation program.</p>
          <p>11.7. You warrant to not send your affiliate or promotion code to anyone from a banned or restricted region. Additionally, you warrant to not send your affiliate or promotion code to anyone not legally allowed to gamble or participate in games of chance, games of skill, or games. This prohibition includes but is not limited to minors, mentally impaired, inhabitants of a jurisdiction banning all forms of gambling, individuals with a serious gambling addiction who require professional assistance. Any breach will result in the permanent removal of your affiliate and promotion code and all future income through your past affiliates.</p>
          <p>11.8. You warrant not to claim that you are officially related or connected to the Company, its Website, or its services. Any terms describing your affiliate status to others fit to make them believe you are more than an affiliate, included but not limited to: official and exclusive, will not be allowed and result in the termination of your affiliate program and the permanent closure of your Account. All your remaining WFair Token credits will be frozen in your Account.</p>
          <p>11.9. You warrant not to create a promotion Website or social media account, which includes the Company name, the Website's name, or the Company ́s trademarks, and logos. Any social media account or Website, including any of the Company or the Website's logos, trademark, or name, will result in the termination of your affiliate program and the permanent closure of your Account. All your remaining WFair Token credits will be frozen in your Account.</p>
          <p>11.10. You warrant not to attempt to mislead other users or consumers by promising them false or misleading benefits for signing up to the Website and its services. Including but not limited to claims of free balance, claims of free WFair Tokens, claims of reimbursement, claims of kickbacks, monetary compensation, false win rates, win rate boosts, special or unique extra designs, special or unique extra games or services, special or priority support, experience boosts, deposit bonuses and claims of gifts. Any attempt to mislead or misinform future users or consumers on the benefits of signing up with an affiliate code, disregarding if it is your code or another affiliate's code, will result in the termination of your affiliate program and the permanent closure of your Account. All your remaining WFair Token credits will be frozen in your Account.</p>
          <p>11.11. You warrant not to market your affiliate or promotion code in any jurisdiction, not allowing gambling or any region to which the Company or country is fully or partially restricted. Any breach of these terms will result in legal consequences as well as complete exclusion from all services on the Website. Your remaining Wfair Token credits will be frozen until the legal conflict comes to an end and a solution is found. You acknowledge you are liable for all damages caused to the Website, the Company, and its third-party partners as well as the shareholder by marketing your affiliate or promotion code in a region fully or partially restricted by either the Company or the country.</p>
          <p>11.12. You acknowledge you can not run an ad campaign with your affiliate or promotion code. Including but is not limited to browser ad campaigns, including but not limited to Google, Firefox, and safari, and social media ad campaigns, including but not limited to TikTok, Youtube, Instagram, Facebook, Twitter. Any ad campaign fit to mislead or misinform users or consumers on the benefits of signing up with an affiliate code, disregarding if your code or another affiliate's code, will result in the termination of your affiliate program and the permanent closure of your Account. All your remaining WFair Token credits will be frozen in your Account.</p>
          <p>11.13. You acknowledge that using any of the Wallfair trademarks and logos is conditioned on you previously asking for and receiving written consent from our marketing team. Unauthorized usage of the trademarks and logos will result in the termination of your affiliate program and the permanent closure of your Account. All your remaining WFair Token credits will be frozen in your Account.</p>
          <p>You can contact our Marketing Team by: <a href={"mailto: marketing@wallfair.io"}>marketing@wallfair.io</a></p>
          <p>11.14. You acknowledge that the Company has the right to change, add, adjust, suspend, or remove any part of the affiliate system or the entire affiliate system as a whole at any time with its sole discretion.</p>
          <p>11.15. You acknowledge that all WFair Token credits received through the Company's affiliate program will be added to your Account. In addition, your ability to withdraw funds received through the affiliate program is conditioned on your compliance with the Company's anti-money laundering and anti- terror financing measurements. Further information can be found in these Terms.</p>


          <h2>12. Bonuses and Promotions</h2>
          <p><b>General bonus conditions</b></p>
          <p>12.1. From time to time Wallfair may offer bonuses, rewards, promotions, contests, cashback and/or gifts (“Promotions”) which aims to give our loyal users a higher comfort, a better experience, and additional credits. These Promotions are subject to these general bonus terms and conditions (“General Bonus Terms and Conditions”). Each specific Promotion is also subject to these Terms. When you participate in a Promotion and agree to receive the bonuses offered by Wallfair, you automatically agree to abide by our General Bonus Terms and Conditions.</p>
          <p>12.2. The Company has the right to change, add, adjust, suspend, or remove any of the Promotions at any time with its sole discretion.</p>
          <p>12.3. The Company reserves the right to deny or restrict the offering of bonuses and promotions to any user or customer under circumstances of, but not limited to, promotion abuse, gambling addictions, irresponsible gambling, violation of our terms of service or any technical exploit of the companies offers and events. Furthermore, the Company reserves the right to suspend any Account that abuses or exploits promotions and bonuses. Any funds remaining in the Account of the respective user will be lost.</p>
          <p>12.4. All your earnings through Promotions will be added to your Account unless otherwise specifically specified. In addition, your ability to withdraw funds received through various Promotions is conditioned on your compliance with the Company's anti-money laundering and anti- terror financing measurements. Further information on withdrawing of granted Promotions through cryptocurrency withdrawal methods can be found in the withdrawal section of these Terms.</p>
          <p>12.5. It is your responsibility to regularly check the General Bonus Terms and Conditions and these Terms for any changes or updates. If these Terms and General Bonus Terms and Conditions are changed, Wallfair will inform you.</p>
          <p>12.6. Promotions are limited to one offer per player (one offer per household address, shared computer or shared IP address, email address, phone number, payment method).</p>
          <p>12.7. Wallfair reserves the right to suspend or close Accounts suspected of being duplicate. The player's original deposit, if any, will not be confiscated and only the Promotions and/or winnings resulting from the Promotions will be confiscated.</p>
          <p>12.8. Unless otherwise stated, the active bonus must be wagered within 10 calendar days of issuance of the respective active bonus. Otherwise, both Promitions and winnings associated with the respective Promotion will be forfeited.</p>
          <p>12.9. When you participate in a Promotion, both deposited funds and bonus funds become the "bonus balance". When a Promotion is active, the wagering must be completed or the respective Promotion must be zeroed out for a withdrawal to be made. The only exception is if you wish to withdraw only the first deposit. In this case, the Promotion and any winnings will be forfeited.</p>
          <p>12.10. Unless otherwise stated, EUR 20 (or its equivalent in another currency) is the minimum deposit to take advantage of Promotions.</p>
          <p>12.11. Exceed the maximum bet when having an aktiv bonus in your balance. The maximum bonus bet is 1,000 Wfair per bet / spin or equivalent. Please note that it is your responsibility to ensure that you are aware of and comply with the maximum bonus wager. In cases where bets are deemed to have exceeded the maximum bonus bet, an Account may be audited and the bonus money may be confiscated.</p>
          <p>12.12. If you wish to make a withdrawal before you meet the wagering requirements, your accrued bonus winnings, bonus amount and deactivation of the Promotion will be forfeited.</p>
          <p>12.13. You can withdraw your real money balance before you fulfill the bonus wagering. In this way, the funds in your bonus balance will be forfeited.</p>
          <p>12.14. When you play an active bonus, your funds are used in the following order: Funds used to trigger the bonus, bonus funds, and any remaining funds.</p>
          <p>12.15. In case your deposit and the associated bonus funds are used up before the wagering requirements are fulfilled, all unfulfilled wagering requirements will be cancelled.</p>
          <p>12.16. After the wagering requirements are fulfilled, the deposit money, bonus money and any winnings won can be withdrawn from the Account.</p>
          <p>12.17. Wallfair Promotions are intended for recreational play only. Improper use of Promotions and Promotion abuse will not be tolerated. We reserve the right to take the following actions against Promotion abuse (list not exhaustive).</p>
          <p>
            <ul>
              <li>Revocation and/or cancellation of Promotions and winnings generated thereof that we believe have been obtained through abuse of the system.</li>
              <li>Blocking players from receiving further Promotions</li>
              <li>Closing the Account</li>
            </ul>
          </p>
          <p>Abuse may include, but is not limited to:</p>
          <p>
            <ul>
              <li>Using multiple Accounts</li>
              <li>Evidence of an attempt to defraud or take unfair advantage of the Wallfair and its Promotions by an individual or group</li>
              <li>Betting with equal, zero or low profit margins</li>
              <li>Betting Promotion on excluded games</li>
              <li>Collaboration, collusion or organization of bets from the same source</li>
              <li>Manipulation of software, exploitation of loopholes, or other conduct that amounts to intentional cheating</li>
              <li>Hiding IP addresses or using VPNs</li>
              <li>Switching from large bets placed on high variance outcomes to normal variance outcomes with smaller bets after a large win to meet wagering requirements.</li>
              <li>Delay playing a game round until the turnover requirement for this Promotion is met.</li>
              <li>Use any type of doubling or gambling feature, e.g. Martingale Strategy.</li>
            </ul>
          </p>
          <p>12.18. We may reclaim any bonus that was mistakenly granted in accordance with the Terms and Conditions</p>
          <p>12.19. We may make changes to a Promotion to correct typographical errors or improve understanding, and we reserve the right to modify or terminate a Promotion if required for legal and/or regulatory reasons at any time.</p>
          <p>12.20. We reserve the right to exclude a player from participating in Promotions at any time at our sole discretion.</p>
          <p>12.21. We reserve the right to review your game / transaction logs. You hereby agree to this in advance. If, after an audit, you are found to have participated or attempted to participate in gaming strategies that we believe to be (i) promotional abuse; and/or (ii) irregular casino gaming; We reserve the right to deny, withhold, revoke or withdraw your right to any Promotion, winnings or bonus, or terminate your affiliation with our Website and/or suspend your Account. Under these circumstances, we will not be obliged to refund any amounts in your Account other than your original deposit amounts.</p>
          <p>12.22. Promotion money is free credit that you can use to enjoy Wallfair. It may not be withdrawn after it has been received unless you have met the conditions under which it was given. To prevent you from withdrawing your bonus money immediately, Wallfair requires the so-called "wagering" of the Promotion credit. The wagering coefficient indicates how many times you have to place the Promotion amount to unlock the Promotion.</p>
          <p>12.23. Participation in some promotions requires registration. This can be done either by clicking on a link in the Promotion on site / by email or by contacting customer service. You can unsubscribe from receiving promotional newsletters at any time.</p>
          <p>12.24. The Promotion is valid until the bonus wagering requirements are met, all bonus money is lost or the Promotion has expired.</p>
          <p>12.25. Game winnings from spins or game rounds initiated with bonus funds but completed with real money after the bonus has been wagered, lost or expired will be removed and may result in your Account being closed for bonus abuse.</p>
          <p>12.26. We reserve the right to withdraw or suspend Promotions or campaigns at any time.</p>
          <p>12.27. We reserve the right to update the terms and conditions governing a specific Bonus at any time.</p>
          <br/>
          <p>New players can be awarded for making their first deposits by opting for either one (1) of our two (2) bonus Promotions. These two Promotions are the Welcome Protection Promotion and the Welcome Bonus Promotion. The two Promotions are mutually exclusive and once selected cannot be changed or claimed retrospectively.</p>
          <p>Users are only entitled to choose one (1) of the two (2) below Promotions. By choosing one, the user will be automatically excluded from choosing the other.</p>

          <p><b>Welcome Protection Promotion</b></p>
          <p>12.28. The Welcome Protection Promotion (“WPP”) is available to new players who create an Wallfair Account during the period of 29th of December 2021 until the 7th of January 2022 00:00 GMT)</p>
          <p>12.29  Players making their first deposit on Wallfair are eligible to receive the WPP. The WPP offer currently consists of having 50% of the deposit amount credited back in case the credit on the users´ Account is completely depleted.</p>
          <p>12.30. The WPP is only available for new Accounts at Wallfair.</p>
          <p>12.31. The WPP applies exclusively to new users.</p>
          <p>12.32. The WPP can be claimed only once per player.</p>
          <p>12.33. The WPP is non-transferable.</p>
          <p>12.34. The minimum deposit in order to be eligible for the WPP is 250 WFair.</p>
          <p>12.35. The player Account can claim the 50% WPP after their WFAIR Account balance reaches 0; ie., no credit is left in the account, and the account has been depleted.</p>
          <p>12.36. The 50% WPP applies to the user´s first deposit during this Promotion on the users’ Account. </p>
          <p>12.37. If a withdrawal is made before the 50% WPP is applied, this Promotion will be forfeited and cannot be claimed in the future.</p>
          <p>12.38. The WPP will be removed from the player's Account, and there will not be a 50% “cash-back“ if the account balance reaches 0.</p>
          <p>12.39. To claim the WPP, the users´ account credit needs to be depleted first. Then the user can click on a button on his/her Account page to claim the 50% WPP and receives his/her “cash-back": The Promotion credit is being credited instantly to the users´ Account.</p>
          <p>12.40. The maximum amount that can be credited back using this promotion is 25.000 WFAIR Token credits.</p>
          <p>12.41. The WPP can be used or withdrawn by the user after claiming.</p>
          <p>12.42. The Company has the right to change, add, adjust, suspend, or remove any of the Promotions at any time with its sole discretion.</p>
          <br />
          <p><b>Welcome Bonus Promotion</b></p>

          <p>12.43. The Welcome Bonus Promotion (“WBP”) is available to new players who create an Wallfair Account.</p>

          <p>12.44. Players making their first deposit on Wallfair are eligible to receive this Promotion. The WBP offer currently consists of a deposit bonus of 100% up to 25.000 WFair Token credits on your first deposit.</p>

          <p>12.45. This welcome bonus is only available for new Accounts at Wallfair.</p>

          <p>12.46. New players have five (5) calendar days, from date of sign-up, to claim the WBP.</p>

          <p>12.47. The WBP can be claimed only once per player.</p>

          <p>12.48. This WBP is non-transferable.</p>

          <p>12.49. The minimum deposit in order to be eligible for the WBP is 250 WFAIR.</p>

          <p>12.50. The 100% match bonus will be credited to the player's Account immediately after an eligible deposit is made.</p>

          <p>The maximum match bonus is 25.000 WFAIR Token credit.</p>

          <p>12.51. A wagering requirement of 35x regarding the deposit and welcome bonus must be met in order to unlock the WBP amounts.</p>

          <p>12.52. Any remaining bonus credit from the WBP will be removed from a player's Account if a withdrawal is made during the period if the wagering amount hasn’t been reached. If a user wants to withdraw before having reached the wagering requirements, he is only authorized to a limited amount of his current account balance. Should the user, not have  reached the wagering requirement; the user cannot withdraw more than he/she initially deposited, ie. the amount the user wants to withdraw can only be equal to or lower than the first deposit and not higher than the actual credit he/she has in his/her account. All remaining credit will be forfeioted. Should the user have failed to comply with the wagering requirements after the stipulated time (12.38), all credit on the user´s account, which is more than his/her first deposit will be forfeited. If the user has a lower credit in his account than the first deposit, the credit amount will remain the same.</p>

          <p>12.53. Players have 30 calendar days to earn the WBP, having complied with the requirements. After 30 calendar days, any unused bonus credits will be removed from the player's Account. During this active WBP no additional deposits can be made 2ntil the credit has reached 0, the wagering requirements have been met or the time to fulfill the requirements has expired. After the 30 days have expired, further deposits and withdrawals are re-enabled. The WBP automatically expires whem the users´ account credit has been depleted, ie. Has reached zero (0).</p>

          <p>12.54. Different games and game types can contribute to the fulfillment of different turnover requirements. For example, if a game type contributes 100% to the wagering requirement, it means that if you wager 1 WFair Token credit, 1 WFair Token credit will be counted towards completing the wagering requirement.</p>

          <p>The following are the game bonus turnover participation rates:</p>

          <p>All games: 100%</p>

          <p>12.55. The stake amount in any game with a "bonus buy" or "feature buy" option counts as the total cost of the spin, not the share or value of the game rounds of the feature or bonus being played.</p>

          <p>12.56. Bonus money offered in standard bonuses and any other bonuses whose terms and conditions are not stated elsewhere are not withdrawable. After the wagering is completed, users will be able to withdraw the balance in line with  and as stipulated in Clause 9 of these Terms and Conditions.</p>

          <h2>13. Errors</h2>
          
          <p>13.1. In the event of an error or malfunction of our system or processes, all bets are rendered void. You are under an obligation to inform us immediately as soon as you become aware of any such error within the service provided through the platform on our Website. In the event of communication or system errors or bugs or viruses occurring in connection with the Service and/or payments made to you as a result of a defect or error in the service, we will not be liable to you or to any third party for any direct or indirect costs, expenses, losses or claims arising or resulting from such errors, and we reserve the right to void all games/bets in question and take any other action to correct such errors.</p>
          <p>13.2. We make every effort to ensure that we do not make errors in posting bookmaker lines. However, if as a result of human error or system problems a bet is accepted at an odd that is: materially different from those available in the general market at the time the bet was made; or clearly incorrect given the chance of the event occurring at the time the bet was made then we reserve the right to cancel or void that wager, or to cancel or void a wager made after an event has started.</p>
          <p>13.3. We have the right to recover from you any amount overpaid and to adjust your Account to rectify any mistake. An example of such a mistake might be where a price is incorrect or where we enter a result of an event incorrectly. If there are insufficient funds in your Account, we may demand that you pay us the relevant outstanding amount relating to any erroneous bets or wagers. Accordingly, we reserve the right to cancel, reduce or delete any pending plays, whether placed with funds resulting from the error or not.</p>

          <h2>14. Rules of Betting</h2>
          <p>14.1 BETS</p>
          <p>14.1.1. A bet can only be placed over the internet by a registered user (Account holder) who has sufficient WFAIR Token credits in their Account to place the intended bet amount. </p>
          <p>14.1.2. All your entered bets will be counted and fully executed by the system, even if you disconnect after entering the bet. Neither the Company nor its third-party partners are liable for any downtime, server disruptions, lagging, or any technical or political disturbance to the game play. Furthermore, the Company or its third-party partners shall accept no liability for any damages or losses which are deemed or alleged to have arisen out of or in connection with the Website or its content; including without limitation, delays or interruptions in operation or transmission, loss or corruption of data, communication or lines failure, any person's misuse of the site or its content or any errors or omissions in content. </p>
          <p>14.1.3. Any and all bets which were started cannot be refunded, with no regard given to the fact if you were present or not during the time of placing your bet. You are therefore strongly advised to only start a bet and/or place a bet should you be certain that you want to, and are amenable to execute it. A bet, which has been placed and accepted, cannot be amended, withdrawn or cancelled by you.</p>
          <p>14.1.4. The Company and its third-party partners are not liable for any losses which might occur to you during any bets, disregarding if you were present during the entire bet or not.</p>
          <p>14.1.5. In the unfortunate event of an Wallfair system malfunction all bets are deemed void.</p>
          <p>14.1.6. By entering a bet, you acknowledge that any bet started cannot be refunded by the Company or its third-party partners. You are solely responsible for the bet placed, and the outcome of every bet made from your Account. You further acknowledge that once you have placed a bet, you cannot alter, withdraw, cancel or abort it. </p>
          <p>14.1.7. Maximum bet </p>
          <p>The maximum bet on any of our games is 10 000 WFAIR Token credits. </p>
          <p>14.1.8. Minimum bet </p>
          <p>The minimum bet on any of our games is 1 WFAIR Token credit. We cannot and accordingly, will not accept any bet lower than 1 WFAIR Token credit. By placing a bet on any of our games, you accept that 1 WFAIR Token credit is the lowest measurement for WFAIR Token credits used on the Website.</p>
          <p>14.1.9. The concluded bet will be governed by the version of the Terms valid and available on the Wallfair.io at the time of the bet being accepted. When you place a bet you acknowledge that you have read and understood in full all of these Terms regarding the placement of bets as stated on the  Wallfair Website.</p>
          <p>14.2 WINNINGS, PAYOUTS</p>
          <p>14.2.1. The winner of a bet will be determined on the date of the bet’s settlement and we will not recognize protested or overturned decisions for wagering purposes. </p>
          <p>14.2.2. All results posted shall be final after 72 hours and no queries will be entertained after that period of time. Within 72 hours after results are posted, we will only reset/correct the results due to human error, system error or mistakes made by the referring results source.</p>
          <p>14.2.3. If a result cannot be validated by us, for instance if the feed broadcasting the bet is interrupted (and cannot be verified by another source) then at our election, the wagers on that event will be deemed invalid and wagers refunded.</p>
          <p>14.2.4. Any payout of a winning bet is credited to your Account, consisting of the stake multiplied by the odds at which the bet was placed.</p>
          <p>14.2.5.Wallfair reserves the right to correct a wagering withdrawal credited to the Account if Wallfair determines, in its sole discretion, that such withdrawal was credited due to an error.</p>
          <p>14.2.6. Your Account is managed by Wallfair including the calculation of your WFAIR Token credits as well as the amount winnings. These amounts are accepted as final and accurate, unless proven otherwise. Winnings will only be paid into your Account after the final result is confirmed. </p>
          <p>14.2.7. Customers are solely responsible for their own Account transactions. Once a transaction is complete, it cannot be changed. We do not take responsibility for missing or duplicate wagers made by the Customer and will not entertain discrepancy requests because a play is missing or duplicated. Customers may review their transactions in the My Account section of the Website after each session to ensure all requested wagers were accepted.</p>
          <p>14.2.8. The start dates and times displayed on the Website for matches are an indication only and are not guaranteed to be correct. If a match is suspended or postponed, and not resumed within 72 hours from the actual scheduled start time, the match will have no action and wagers will be refunded. </p>
          <p>14.2.9. If an event is posted by us with an incorrect date, all wagers have action based on the date announced by the governing body.</p>
          <p>14.2.10. Minimum win </p>
          <p>The minimum win on any of our games is 0.01 WFAIR Token credit. Any bet which resulted in a profit lower than 0.01 WFAIR Token credit, will have the consequence that the win be rounded down to zero (0) WFAIR Token credit. By placing a bet on any of our games, you accept that all results are rounded down to the next amount of WFAIR Token credits measured in hundredths of WFAIR Token credits. We also reserve the right to adjust limits on individual Accounts as well.</p>
          <p>14.2.11. Maximum win </p>
          <p>The maximum win on any of our games is 1 % of Wallfair´s liquidity (this amount includes the bet and the profit). Should any bet have the result that the winning amount is bigger than 1 % of Wallfair´s liquidity, the win will be capped at the aforementioned amount. By placing any bet on any of our games, you accept that all winnings be capped at 1% of Wallfair´s liquidity.  Any win above 1% of Alapacasino´s liquidity is currently not possible.</p>
          <p>14.3 AUTOBET</p>
          <p>Should you wish to place multiple bets in a row, we offer you an Autobet function.</p>
          <p>14.3.1 With Autobet, you are given the option to raise, lower, repeat, or stop a bet with every loss, or win. You acknowledge that you are fully responsible for every bet you place via the Autobet function. The Company and its third-party partners cannot be held liable for any financial losses which occur during your Autobet session. You accept that you are solely responsible for all results of all bets made from your Account, without any regard given to whether or not you made use of the Autobet system, or another person made the bets from your Account.</p>
          <p>14.3.2 By placing a bet via the Autobet option, you accept and acknowledge that you are responsible for all losses which might occur in the vent where you forget to turn off the Autobet function. You are strongly advised to turn off the Autobet option should you wish to stop betting.</p>
          <p>14.3.3 You accept responsibility for all winnings and/or losses which might result when you place your bet via the Autobet function or in a different way than intended. The Company and its third-party partners cannot be held liable for any losses that might occur to your failure to enter your intended bet; neither does the Company offer refund options, should your bet have been incorrectly entered. We strongly advise that you review your settings before starting to bet via the Autobet function.</p>
          <p>14.3.4 The Company does not allow any third-party automated betting scripts on the Website. Any such usage of third-party automated betting scripts or bots results in a breach of terms.</p>
          
          <h2>15. Communications and Notices</h2>
          <p>15.1. All communications and notices to be given under these Terms by you to us shall be sent using a Customer Support form on the Website.</p>
          <p>15.2. All communications and notices to be given under these Terms by us to you shall, unless otherwise specified in these Terms, be either posted on the Website and/or sent to the Registered Email Address we hold on our system for the relevant Customer. The chosen method of such communication shall be in our sole and exclusive discretion.</p>
          <p>15.3. All communications and notices to be given under these Terms by either you or us shall be in writing in the English language and must be given to and from the Registered Email Address in your Account.</p>
          <p>15.4. From time to time, we may contact you by email for the purpose of offering you information about betting, unique promotional offerings, and other information from app.wallfair.io. You agree to receive such emails when you agree to these Terms when registering at the Website. You can choose to opt out of receiving such promotional offerings from us at any time by submitting a respective request to the customer support.</p>
          
          <h2>16. Matters beyond Our Control</h2>
          <p>We cannot be held liable for any failure or delay in providing the service  due to an event of Force Majeure which could reasonably be considered to be outside our control despite our execution of reasonable preventative measures such as: an act of God; trade or labour dispute; power cut; act, failure or omission of any government or authority; obstruction or failure of telecommunication services; or any other delay or failure caused by a third party, and we will not be liable for any resulting loss or damage that you may suffer. In such an event, we reserve the right to cancel or suspend the service without incurring any liability.</p>

          <h2>17. Liability</h2>
          <p>17.1. To the extent permitted by applicable law, we will not compensate you for any reasonably foreseeable loss or damage (either direct or indirect) you may suffer if we fail to carry out our obligations under these Terms unless we breach any duties imposed on us by law (including if we cause death or personal injury by our negligence) in which case we shall not be liable to you if that failure is attributed to: (i) your own fault; (ii) a third party whose action cannot be attributed to us or our performance of services under and in connection with the services provided hereunder (for instance problems due to communications network performance, congestion, and connectivity or the performance of your computer equipment); or (iii) any other events which neither we nor our suppliers could have foreseen or forestalled even if we or they had taken reasonable care. As this service is for consumer use only we will not be liable for any business losses of any kind.</p>
          <p>17.2. Without prejudice to the generality of the preceding provision, we, our directors, employees, partners, service providers</p>
          <p>17.2.1. Do not warrant that the software, games and the Website are fit for their purpose;</p>
          <p>17.2.2. Do not warrant that the software, games and the Website are free from errors;</p>
          <p>17.2.3. Do not warrant that the software, games and the Website will be accessible without interruptions</p>
          <p>17.3. You understand and acknowledge that, if there is a malfunction in a Game or its interoperability, any bets made during such a malfunction shall be void. Funds obtained from a malfunctioning Game shall be considered void, as well as any subsequent game rounds with said funds, regardless of what Games are played using such funds.</p>
          <p>17.4. You hereby agree to fully indemnify and hold harmless us, our directors, employees, partners, and service providers for any cost, expense, loss, damages, claims and liabilities howsoever caused that may arise in relation to your use of the Website or participation in the Games.</p>
          <p>17.5. In the event that we are held liable for any event under these Terms, our total aggregate liability to you under or in connection with these Terms shall – to the extent legally permissible  - not exceed (a) the value of the bets and or wagers you placed via your Account in respect of the relevant bet/wager or product that gave rise to the relevant liability, or (b) €500 in aggregate, whichever is lower.</p>
          <p>17.6.  We strongly recommend that you (i) take care to verify the suitability and compatibility of the service with your own computer equipment prior to use; and (ii) take reasonable precautions to protect yourself against harmful programs or devices including through installation of anti-virus software.</p>

          <h2>18. Gambling By Those under Age</h2>
          <p>18.1. If we suspect that you are or receive notification that you are currently under 18 years or were under 18 years (or below the age of majority as stipulated in the laws of the jurisdiction applicable to you) when you placed any bets through the service on our Website your Account will be suspended (locked) to prevent you placing any further bets or making any withdrawals from your Account. We will then investigate the matter, including whether you have been betting as an agent for, or otherwise on behalf, of a person under 18 years (or below the age of majority as stipulated in the laws of the jurisdiction applicable to you). If having found that you: (a) are currently; (b) were under 18 years or below the majority age which applies to you at the relevant time; or (c) have been betting as an agent for or at the behest of a person under 18 years or below the majority age which applies:</p>
          <p>
            <ul>
              <li>all winnings currently or due to be credited to your Account will be retained;</li>
              <li>all winnings gained from betting through the service whilst under age must be paid to us on demand (if you fail to comply with this provision we will seek to recover all costs associated with recovery of such sums); and/or</li>
              <li>any monies deposited in your Account which are not winnings will be returned to you OR retained until you turn 18 years old at our sole discretion. We reserve the right to deduct payment transaction fees from the amount to return, including transaction fees for deposits to your app.wallfair.io Account which we covered.</li>
            </ul>
          </p>
          <p>18.2. This condition also applies to you if you are over the age of 18 years but you are placing your bets within a jurisdiction which specifies a higher age than 18 years for legal betting and you are below that legal minimum age in that jurisdiction.</p>
          <p>18.3. In the event we suspect you are in breach of the provisions of this Clause or are attempting to rely on them for a fraudulent purpose, we reserve the right to take any action necessary in order to investigate the matter, including informing the relevant law enforcement agencies.</p>

          <h2>19. Fraud</h2>
          <p>We prohibit and reject the use of the service for any form of illicit activity, including money laundering, terrorist financing, or trade sanctions violations. Accounts suspected of Money Laundering by using service may be blocked and transactions may be stopped until the risk department will finish all the required procedures. According to our policy, all crypto deposits must meet a basic rollover requirement. This rule applied to every User's cryptocurrency balance. Our risk department is eligible to stop every suspicious transaction to prevent money laundering. Users' Accounts may be under investigation by the risk department until all requirements will be met, payment in time of investigation will be stopped.</p>
          <p>For further information please see these Terms.</p>
          <p>We will seek criminal and contractual sanctions against any Customer involved in fraud, dishonesty or criminal acts. We will withhold payment to any Customer where any of these are suspected. The Customer shall indemnify and shall be liable to pay to us on demand all costs, charges or losses sustained or incurred by us (including any direct, indirect or consequential losses, loss of profit, loss of business and loss of reputation) arising directly or indirectly from the Customer’s fraud, dishonesty or criminal act.</p>

          <h2>20. Intellectual Property</h2>
          <p>20.1. Any unauthorised use of our name and logo may result in legal action being taken against you.</p>
          <p>20.2. As between us and you, we are the sole owners of the rights in and to the service, our technology, software and business systems (the “Systems”) as well as our odds,</p>
          <p>you must not use your personal profile for your own commercial gain (such as selling your status update to an advertiser); and when selecting a nickname for your Account we reserve the right to remove or reclaim it if we believe it appropriate.</p>
          <p>20.3. You may not use our URL, trademarks, trade names and/or trade dress, logos (“Marks”) and/or our odds in connection with any product or service that is not ours, that in any manner is likely to cause confusion among Customers or in the public or that in any manner disparages us.</p>
          <p>20.4. Except as expressly provided in these Terms, we and our licensors do not grant you any express or implied rights, license, title or interest in or to the Systems or the Marks and all such rights, license, title and interest specifically retained by us and our licensors. You agree not to use any automatic or manual device to monitor or copy web pages or content within the service. Any unauthorized use or reproduction may result in legal action being taken against you.</p>

          <h2>21. Your License</h2>
          <p>21.1. Subject to these Terms and your compliance with them, we grant to you a non-exclusive, limited, non transferable and non sub-licensable license to access and use the service for your personal non-commercial purposes only. Our license to you terminates if our agreement with you under these Terms ends or your Account has been deleted, blocked or frozen by us in accordance with these Terms.</p>
          <p>21.2. Save in respect of your own content, you may not under any circumstances modify, publish, transmit, transfer, sell, reproduce, upload, post, distribute, perform, display, create derivative works from, or in any other manner exploit, the service and/or any of the content thereon or the software contained therein, except as we expressly permit in these Terms or otherwise on the Website. No information or content on the service or other information made available to you in connection with the service may be modified or altered, merged with other data or published in any form including for example screen or database scraping and any other activity intended to collect, store, reorganise or manipulate such information or content.</p>
          <p>21.3. Any non-compliance by you with this Clause may also be a violation of our or third parties' intellectual property and other proprietary rights which may subject you to civil liability and/or criminal prosecution.</p>

          <h2>22. Your Conduct and Safety</h2>
          <p>22.1. For your protection and protection of all our Customers, the posting of any content on the service, as well as conduct in connection therewith and/or the service, which is in any way unlawful, inappropriate or undesirable is strictly prohibited (“Prohibited Behaviour”).</p>
          <p>22.2. If you engage in Prohibited Behaviour, or we determine in our sole discretion that you are engaging in Prohibited Behaviour, your Account and/or your access to or use of the service may be terminated immediately without notice to you. Legal action may be taken against you by another Customer, other third party, enforcement authorities and/or us with respect to you having engaged in Prohibited Behaviour.</p>
          <p>22.3. Prohibited Behaviour includes, but is not limited to, accessing or using the service to:</p>
          <p>
            (i) promote or share information that you know is false, misleading or unlawful;<br/>
            conduct any unlawful or illegal activity, such as, but not limited to, any activity that furthers or promotes any criminal activity or enterprise, violates another customer's or any other third party’s privacy or other rights or that creates,spreads computer viruses or harm minors in any way;<br/>
            (ii) transmit or make available any content that is unlawful, harmful, threatening, abusive, tortuous, defamatory, vulgar, obscene, lewd, violent, hateful, or racially or ethnically or otherwise objectionable;<br/>
            (iii) transmit or make available any content that the user does not have a right to make available under any law or contractual or fiduciary relationship, including without limitation, any content that infringes a third party’s copyright, trademark or other intellectual property and proprietary rights;<br/>
            (iv) transmit or make available any content or material that contains any software virus or other computer or programming code (including HTML) designed to interrupt, destroy or alter the functionality of the service, its presentation or any other website, computer software or hardware;<br/>
            (v) interfere with, disrupt or reverse engineer the service in any manner, including, without limitation, intercepting, emulating or redirecting the communication protocols used by us, creating or using cheats, mods or hacks or any other software designed to modify the service, or using any software that intercepts or collects information from or through the service;<br/>
            (vi) retrieve or index any information from the service using any robot, spider or other automated mechanism;<br/>
            (vii) participate in any activity or action that, in the sole and entire unfettered discretion of us results or may result in another Customer being defrauded or scammed;<br/>
            (viii) transmit or make available any unsolicited or unauthorised advertising or mass mailing such as, but not limited to, junk mail, instant messaging, "spam", chain letters, pyramid schemes or other forms of solicitations;<br/>
            (ix) create Accounts on the Website by automated means or under false or fraudulent pretences;<br/>
            (x) impersonate another Customer or any other third party, or<br/>
            (xi) any other act or thing done that we reasonably consider to be contrary to our business principles.
          </p>
          <p>The above list of Prohibited Behaviour is not exhaustive and may be modified by us at any time or from time to time. We reserve the right to investigate and to take all such actions as we in our sole discretion deem appropriate or necessary under the circumstances, including without limitation deleting the Customer’s posting(s) from the service and/or terminating their Account, and take any action against any Customer or third party who directly or indirectly in, or knowingly permits any third party to directly or indirectly engage in Prohibited Behaviour, with or without notice to such Customer or third party.</p>
          
          <h2>23. Links to Other Websites</h2>
          <p>The service may contain links to third party websites that are not maintained by, or related to, us, and over which we have no control. Links to such websites are provided solely as a convenience to Customers, and are in no way investigated, monitored or checked for accuracy or completeness by us. Links to such websites do not imply any endorsement by us of, and/or any affiliation with, the linked websites or their content or their owner(s). We have no control over or responsibility for the availability nor their accuracy, completeness, accessibility and usefulness. Accordingly when accessing such websites we recommend that you should take the usual precautions when visiting a new website including reviewing their privacy policy and terms of use.</p>

          <h2>24. Complaints</h2>
          <p>24.1. If you have any concerns or questions regarding these Terms you should contact our customer service department via the links on the Website or via hello@wallfair.io.and use your Registered Email Address in all communication with us.</p>
          <p>24.2. Notwithstanding the foregoing, we take no liability whatsoever to you or to any third party when responding to any complaint that we received or took action in connection therewith.</p>
          <p>24.3. If a Customer is not satisfied with how a bet has been settled then the Customer should provide details of their grievance to our customer service department. We shall use our reasonable endeavours to respond to queries of this nature within a few days (and in any event we intend to respond to all such queries within 28 days of receipt).</p>
          <p>24.4. Disputes must be lodged within three (3) calendar days from the date the wager in question has been decided. No claims will be honoured after this period. The Customer is solely responsible for their Account transactions.</p>
          <p>24.5. In the event of a dispute arising between you and us, our customer service department will attempt to reach an agreed solution. Should our customer service department be unable to reach an agreed solution with you, the matter will be escalated to our management.</p>
          <p>24.6. Should all efforts to resolve a dispute to the Customer's satisfaction have failed, the Customer has the right to lodge a complaint with our licensing body Gaming Services Provider N.V.  </p>          

          <h2>25. Assignment</h2>
          <p>Neither these Terms nor any of the rights or obligations hereunder may be assigned by you without the prior written consent of us, which consent will not be unreasonably withheld. We may, without your consent, assign all or any portion of our rights and obligations hereunder to any third party provided such third party is able to provide a service of substantially similar quality to the service by posting written notice to this effect on the service.</p>

          <h2>26. Severability</h2>
          <p>In the event that any provision of these Terms is deemed by any competent authority to be unenforceable or invalid, the relevant provision shall be modified to allow it to be enforced in line with the intention of the original text to the fullest extent permitted by applicable law. The validity and enforceability of the remaining provisions of these Terms shall not be affected.</p>

          <h2>27. Breach of These Terms</h2>
          <p>27.1. Without limiting our other remedies, we may suspend or terminate your Account and refuse to continue to provide you with the service, in either case without giving you prior notice, if, in our reasonable opinion, you breach any material term of these Terms. Notice of any such action taken will, however, be promptly provided to you.</p>
          <p>27.2. You agree to fully indemnify, defend and hold us harmless as well as our shareholders, directors, agents, and employees from and against all claims, demands, liabilities, damages, losses, costs, and expenses, including legal fees and any other charges whatsoever, howsoever caused, that may arise as a result of: (i) your breach of this Agreement, in whole or in part; (ii) violation by you of any law or any third party rights; and (iii) use by you of the service. </p>
      </div>
        
      </div>
    </BaseContainerWithNavbar>
  );
};

export default TermsConditions;

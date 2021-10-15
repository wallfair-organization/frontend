// Import of images
import { ReactComponent as ConfettiMobile } from '../../data/images/signup-content/confetti-w-mobile.svg';
import { ReactComponent as ConfettiDesktop } from '../../data/images/signup-content/confetti-w.svg';
import { ReactComponent as ButtonBgYellow } from '../../data/images/signup-content/button-bg-yellow.svg';
import { ReactComponent as UniswapLogo } from '../../data/images/lightbox/uniswap-logo.svg';
import UniswapPrice from '../../helper/UniswapPrice';

// Imports for styling
import styled from 'styled-components';

const UniswapContent = ({ className }) => {
  return (
    <SignUpFormContainer className={className}>
      <StyledConfettiDesktop />
      <TextContainer>
        <FormHeading>
          <UniswapLogo />
          <span>WFAIR is now available on Uniswap!</span>
        </FormHeading>
      </TextContainer>

      <PriceText>
        <UniswapPrice />
      </PriceText>

      {/* <TextContainer>
          <FormSubHeading>Hard cap: $200,000</FormSubHeading>
          <FormSubHeading>Swap rate: 25 WFAIR per 1 BUSD</FormSubHeading>
        </TextContainer> */}

      <a
        href="https://app.uniswap.org/#/swap?inputCurrency=ETH&amp;outputCurrency=0xc6065b9fc8171ad3d29bad510709249681758972&amp;exactAmount=1"
        target="_blank"
        rel="noreferrer"
      >
        <ButtonContainer>
          <ButtonBgYellow style={{ width: '100%' }} />
          <p>Buy WFAIR</p>
        </ButtonContainer>
      </a>
      <StyledConfettiMobile />
    </SignUpFormContainer>
  );
};

// Styled components
const SignUpFormContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;
  color: white;
  gap: 10px;

  padding-left: 100px;

  span {
    font-size: 12px;
  }

  @media (max-width: 1000px) {
    flex-direction: column;
    padding-left: 0;
    align-items: center;
  }

  @media (max-width: 1000px) {
    padding-left: 0px;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
      font-size: 24px;
    }
  }
`;

const TextContainer = styled.div``;

const PriceText = styled.div`
  opacity: 0.6;
  padding: 10px;
  font-size: 15px;

  @media (max-width: 1000px) {
    // width: 100%;
    margin: 0 auto;
  }
`;

const InputContainer = styled.div`
  width: 550px;
  height: 100%;
  display: flex;
  flex-direction: row;
  column-gap: 10px;

  input {
    width: 100%;
    height: 40px;
    font-size: 13px;
    background-color: rgba(255, 255, 255, 0.2);
    border: 0;
    border-radius: 5px;
    padding: 0 10px 0 20px;
    color: #fff;

    &::placeholder {
      color: rgba(255, 255, 255, 0.2);
    }

    &:focus {
      outline: none;
    }

    @media (max-width: 1000px) {
      width: 100%;
      font-size: 15px;
    }
  }

  @media (max-width: 640px) {
    flex-direction: column;
    row-gap: 10px;
    width: 100%;
  }
`;

const StyledConfettiDesktop = styled(ConfettiDesktop)`
  position: absolute;
  top: -8px;
  left: 10px;

  @media (max-width: 1000px) {
    display: none;
  }
`;

const StyledConfettiMobile = styled(ConfettiMobile)`
  position: absolute;
  top: 0;
  right: -15px;
  pointer-events: none;

  @media (min-width: 1001px) {
    display: none;
  }
`;

const FormHeading = styled.p`
  display: flex;
  align-items: center;
  column-gap: 20px;

  svg {
    padding-bottom: 10px;
  }
  span {
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    letter-spacing: 0.654545px;
    color: #ffffff;
    opacity: 1;
  }
`;

const FormSubHeading = styled.p`
  max-width: 500px;
  font-style: normal;
  font-size: 12px;
  letter-spacing: 0.654545px;
  color: #ffffff;
  opacity: 0.6;

  & a {
    color: #ffffff;
  }

  @media (max-width: 640px) {
    width: 80%;
  }
`;

const ButtonContainer = styled.div`
  position: relative;
  width: 140px;
  height: 40px;
  transition: transform 0.5s;
  cursor: pointer;
  border-radius: 5px;

  background: #fff;

  p {
    width: 100%;
    color: #000;
    position: absolute;
    top: 12px;
    left: 33px;
    white-space: nowrap;
    font-weight: bold;
    font-size: 14px;
  }

  &:hover {
    transform: scale(1.03);
  }

  @media (min-width: 1000px) {
    margin-right: 30px;
  }

  @media (max-width: 640px) {
    width: 160px;
    display: flex;
    align-items: center;
    justify-content: center;

    a {
      margin: 0 auto;
    }

    p {
      width: 100%;
      left: 44px;
    }
  }
`;

export default UniswapContent;

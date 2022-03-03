import { TOKEN_NAME } from 'constants/Token';
import { convert } from '../../helper/Currency';

export const selectCurrency = ({ authentication }) => {
  if (process.env.REACT_APP_PLAYMONEY !== 'true') {
    const currency = authentication.preferences?.currency;
    return currency || TOKEN_NAME;
  }
  
  return TOKEN_NAME;
};

export const selectGamesCurrency = ({ authentication }) => {
  // if (process.env.REACT_APP_PLAYMONEY !== 'true') {
    const currency = authentication.preferences?.gamesCurrency || 'USD';
    return currency;
  // }

  return TOKEN_NAME;
};

export const selectUserId = state => state.authentication.userId;
export const selectUserLoggedIn = state => state.authentication.userId;
export const selectTokensRequestedAt = state => {
  const id = selectUserId(state);
  return state.user.users[id] && state.user.users[id].tokensRequestedAt
    ? state.user.users[id].tokensRequestedAt
    : new Date(Date.now() - (3600 * 1010)).toISOString();
};

export const selectUser = state => {
  const user = state.authentication;

  const currency = selectCurrency(state);
  const gamesCurrency = selectGamesCurrency(state);
  const tokensRequestedAt = selectTokensRequestedAt(state);

  return {
    ...user,
    isLoggedIn: state.authentication.authState === 'LOGGED_IN',
    balance: state.authentication.balance,
    balances: state.authentication.balances,
    // balance: convert(state.authentication.balance, currency),
    amountWon: state.authentication.amountWon,
    // amountWon: convert(state.authentication.amountWon, currency),
    toNextRank: state.authentication.toNextRank,
    // toNextRank: convert(state.authentication.toNextRank, currency),
    totalInvestmentAmount: state.authentication.totalInvestmentAmount,
    // totalInvestmentAmount: convert(
    //   state.authentication.totalInvestmentAmount,
    //   currency
    // ),
    totalOpenTradesAmount: state.authentication.totalOpenTradesAmount,
    // totalOpenTradesAmount: convert(
    //   state.authentication.totalOpenTradesAmount,
    //   currency
    // ),
    currency,
    gamesCurrency,
    tokensRequestedAt,
    phoneConfirmed: state.authentication.phoneConfirmed,
  };
};

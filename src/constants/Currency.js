import { TOKEN_NAME } from "./Token";

export const CONVERSION_RATES = {
  EUR: 0.2,
  USD: 0.24,
};

export const CURRENCIES = [TOKEN_NAME];
export const AVAILABLE_GAMES_CURRENCY = process.env.REACT_APP_PLAYMONEY !== 'true' ? ['USD', 'EUR'] : ['USD', 'EUR', TOKEN_NAME];
export const GAMES_CURRENCY_MAX_BET = 100;
export const GAMES_CURRENCY_DEFAULT_BET = process.env.REACT_APP_PLAYMONEY !== 'true' ? 5 : 20;
export const DEFAULT_GAMES_CURRENCY = process.env.REACT_APP_PLAYMONEY !== 'true' ? 'USD' : TOKEN_NAME;

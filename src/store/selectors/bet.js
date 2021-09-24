import { calculateGain } from 'helper/Calculation';
import _ from 'lodash';
import { convert } from '../../helper/Currency';
import { selectCurrency } from './authentication';

const mapOutcomes = (outcomes, state) => {
  const currency = selectCurrency(state);
  const amount = convert(outcomes.amount, currency);
  return {
    ...outcomes,
    amount,
    outcomes: _.map(outcomes.outcomes, o => {
      const outcome = convert(o.outcome, currency);
      return {
        ...o,
        outcome,
        gain: calculateGain(amount, outcome),
      };
    }),
  };
};

export const selectOpenBets = state => {
  return _.map(state.bet.openBets, bet => {
    return {
      ...bet,
      investmentAmount: convert(bet.investmentAmount, selectCurrency(state)),
      outcomeAmount: convert(bet.outcomeAmount, selectCurrency(state)),
      currentBuyAmount: convert(bet.currentBuyAmount, selectCurrency(state)),
      sellAmount: convert(bet.sellAmount, selectCurrency(state)),
    };
  });
};

export const selectOutcomes = state => {
  return mapOutcomes(state.bet.outcomes, state);
};

export const selectSellOutcomes = state => {
  return mapOutcomes(state.bet.sellOutcomes, state);
};

/**
 * @typedef {object} Outcome
 * @property {string} id
 * @property {string} name
 * @property {number} probability
 */

export const OutcomesValidators = {
  /**
   * Verifies outcome probabilities add up to 1.
   *
   * @param {Outcome[]} outcomes
   * @returns { { incorrectProbabilitiesSum: boolean } | null }
   */
  probabilitySum: outcomes => {
    // edge case for equal threeway split
    if (
      outcomes.length === 3 &&
      outcomes.every(({ probability }) => probability === '0.33')
    ) {
      return null;
    }
    const totalProbability = outcomes
      .filter(({ probability }) => !isNaN(probability))
      .reduce((acc, { probability }) => +(acc + +probability).toFixed(2), 0);
    if (totalProbability !== 1) {
      return { incorrectProbabilitiesSum: true };
    }
    return null;
  },

  /**
   * Verifies all outcomes have a unique name.
   *
   * @param {Outcome[]} outcomes
   * @returns { { duplicateOutcomeNames: boolean } | null }
   */
  duplicateOutcomeName: outcomes => {
    const uniqueNames = new Set(
      outcomes.map(({ name }) => name.trim().toLowerCase())
    );
    if (uniqueNames.size !== outcomes.length) {
      return { duplicateOutcomeNames: true };
    }
    return null;
  },
};

// Imports for styling
import { request, gql } from 'graphql-request';

import { useEffect, useState } from 'react';

const UniswapPrice = () => {
  const [tokenPrice, setTokenPrice] = useState(null);

  const fetchTokenPrice = async () => {
    /* 
      token0 = WFAIR
      token1 = TETHER USD
    */
    const query = gql`
      {
        pairs(
          where: {
            token0: "0xc6065b9fc8171ad3d29bad510709249681758972"
            token1: "0xdac17f958d2ee523a2206206994597c13d831ec7"
          }
        ) {
          token0Price
          token1Price
        }
      }
    `;
    const result = await request(
      'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
      query
    );

    if (!result || !result.pairs || !result.pairs[0]) {
      return null;
    }

    const wfairPrice = +result.pairs[0]?.token1Price;

    if (typeof wfairPrice === 'number') {
      setTokenPrice(Math.floor(wfairPrice * 1000) / 1000);
    }
  };

  useEffect(() => {
    let intervalId = setInterval(() => {
      fetchTokenPrice();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [tokenPrice]);

  useEffect(() => {
    fetchTokenPrice();
  }, []);

  return tokenPrice && tokenPrice > 0 ? (
    <p>
      Current price:
      <br /> 1 WFAIR = ~{tokenPrice} USDT
    </p>
  ) : null;
};

export default UniswapPrice;

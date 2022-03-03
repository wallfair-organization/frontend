export default function PlayMoneyOnly({ children }) {
  const playMoney = process.env.REACT_APP_PLAYMONEY === 'true';

  if (!playMoney) return null;

  return children;
}

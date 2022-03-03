export default function RealMoneyOnly({ children }) {
  const realMoney = process.env.REACT_APP_PLAYMONEY !== 'true';

  if (!realMoney) return null;

  return children;
}

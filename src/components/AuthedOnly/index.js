import authState from 'constants/AuthState';
import { useSelector } from 'react-redux';

export default function AuthedOnly({ children }) {
  const isLoggedIn = useSelector(
    state => state.authentication.authState === authState.LOGGED_IN
  );

  if (!isLoggedIn) return null;

  return children;
}

import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { AuthenticationActions } from "store/actions/authentication";

const useOAuthCallback = () => {
  const dispatch = useDispatch();
  const { provider } = useParams();
  const location = useLocation();
  const history = useHistory();
  const params = useMemo(() => new URLSearchParams(location.search), [location]);

  
  useEffect(() => {
    if(!provider) return;
    const code = params.get('code');
    const error = params.get('error');
    const { ref: refParam, tosAccepted } = JSON.parse(params.get('state'));
    const ref = refParam === 'null' ? null : refParam;
    
    if(error) {
      dispatch(AuthenticationActions.loginExternalFail({ message: 'Something went wrong.'}));
      history.push('/');
    } else if(code) {
      const payload = { code, ref, tosAccepted };
      dispatch(AuthenticationActions.loginExternal({ ...payload, provider }));
    } else {
      history.push('/');
    }
  }, [provider, params])
}

export default useOAuthCallback;
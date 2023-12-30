import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { useCode } from '../../hooks/useCode';

import { useAuthContext } from '../../contexts/AuthContext';
import Loading from '../Loading/Loading';

export const Authorize = () => {
  const code = new URLSearchParams(window.location.search).get('code');
  const { auth } = useAuthContext();
  const getToken = useCode();

  useEffect(() => {
    if (!code) return;
    getToken(code);
  }, []);

  return code && !auth.accessToken ? (
    <Loading text={'Authenticating'} />
  ) : (
    <Redirect to="/" />
  );
};

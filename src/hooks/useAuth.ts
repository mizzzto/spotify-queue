import { useAxios } from './useAxios';
import { useLocalStorage } from './useLocalStorage';
import { useEffect } from 'react';

import { config } from '../config';

import { HttpStatus, LOCAL_STORAGE_AUTH_KEY } from '../constants';
import { Auth } from '../types/Auth';

export const defaultAuth: Auth = {};

export const useAuth = (initialState = defaultAuth) => {
  const [auth, setAuth] = useLocalStorage<Auth>(
    LOCAL_STORAGE_AUTH_KEY,
    initialState
  );

  const axios = useAxios();

  const saveAuth = (auth: Auth) => setAuth(auth);

  const clearAuth = () => {
    setAuth(initialState);
  };

  const attemptRefresh = () => {
    console.log('attempting refresh with token', auth.refreshToken);
    if (auth.refreshToken) {
      refresh(auth.refreshToken);
    }
  };

  useEffect(() => {
    if (!auth.refreshToken || !auth.expiresIn) return;
    const timeoutms = (auth.expiresIn - 60) * 1000;
    // console.log('setting interval ms', timeoutms);
    const interval = setInterval(() => {
      refresh(auth.refreshToken!);
    }, timeoutms);
    return () => clearInterval(interval);
  }, [auth.refreshToken, auth.expiresIn]);

  const refresh = async (refreshToken: string) => {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);
    params.append('client_id', config.SPOTIFY_CLIENT_ID);

    const res = await axios.post(`/api/token`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      baseURL: config.SPOTIFY_ACCOUNTS_URL,
    });
    if (res.status === HttpStatus.OK) {
      // console.log(res.data);
      saveAuth({
        accessToken: res.data.access_token,
        refreshToken: res.data.refresh_token,
        expiresIn: res.data.expires_in,
      });
    } else {
      console.error('Failed to refresh', res.status);
      console.error('Status', res.statusText);
    }
  };

  return {
    auth,
    saveAuth,
    clearAuth,
    attemptRefresh,
  };
};

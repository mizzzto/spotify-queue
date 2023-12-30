import axios from 'axios';

import { config } from '../config';

import { HttpStatus, REDIRECT_URI } from '../constants';
import { useAuthContext } from '../contexts/AuthContext';

export const useCode = () => {
  const { saveAuth } = useAuthContext();

  return async (code: string): Promise<void> => {
    const codeVerifier = window.localStorage.getItem('code-verifier');
    // console.log(`sending codeverifier ${codeVerifier}`);
    window.localStorage.removeItem('code-verifier');

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', REDIRECT_URI);
    params.append('client_id', config.SPOTIFY_CLIENT_ID);
    params.append('code_verifier', codeVerifier!);

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
      console.error('Failed to get access token', res.status);
      console.error('Status', res.statusText);
    }
  };
};

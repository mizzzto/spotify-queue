import './Login.scss';
import Power from '@mui/icons-material/Power';
import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { config } from '../../config';

import { REDIRECT_URI } from '../../constants';
import { useAuthContext } from '../../contexts/AuthContext';

export const Login = () => {
  const { auth } = useAuthContext();
  const [authURL, setAuthURL] = useState('');
  /**
   * https://tools.ietf.org/html/rfc7636#section-4.2
   * @param {string} codeVerifier
   */
  async function generateCodeChallenge(codeVerifier: string) {
    const codeVerifierBytes = new TextEncoder().encode(codeVerifier);
    const hashBuffer = await crypto.subtle.digest('SHA-256', codeVerifierBytes);
    return base64url(new Uint8Array(hashBuffer));
  }

  function randomBytes(length: number) {
    return crypto.getRandomValues(new Uint8Array(length));
  }

  function base64url(codes: Uint8Array) {
    return btoa(String.fromCharCode(...codes))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  const generateLoginUrl = async () => {
    const codeVerifier = base64url(randomBytes(96));
    const state = base64url(randomBytes(96));

    const scopes = [
      'user-read-email',
      'user-read-private',
      'user-read-currently-playing',
      'user-read-playback-state',
      'user-modify-playback-state',
      'user-library-read',
      'user-library-modify',
      'streaming',
    ];

    const params = new URLSearchParams({
      client_id: config.SPOTIFY_CLIENT_ID,
      response_type: 'code',
      redirect_uri: REDIRECT_URI,
      code_challenge_method: 'S256',
      code_challenge: await generateCodeChallenge(codeVerifier),
      state: state,
      scope: scopes.join(','),
    });
    window.localStorage.setItem('code-verifier', codeVerifier);

    const url = new URL(config.SPOTIFY_ACCOUNTS_URL);
    url.pathname = 'authorize';
    setAuthURL(`${url.toString()}?${params}`);
  };

  useEffect(() => {
    generateLoginUrl();
  }, []);

  return (
    <>
      {!auth || !auth.accessToken ? (
        <div className="login-container">
          <a href={authURL}>
            <div>
              <Power className="clickable-icon" fontSize="large" />
            </div>
            <div>Login with Spotify</div>
          </a>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

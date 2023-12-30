import { config } from './config';

export const LOCAL_STORAGE_PREFIX = 'spotifyParty';
export const LOCAL_STORAGE_AUTH_KEY = `${LOCAL_STORAGE_PREFIX}-Auth`;
export const LOCAL_STORAGE_STATE_KEY = `${LOCAL_STORAGE_PREFIX}-State`;
export const REDIRECT_URI = `${config.SPOTIFY_PARTY_CLIENT_URL}/`;

export const HttpStatus = {
  OK: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
} as const;

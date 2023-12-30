/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SPOTIFY_PARTY_SERVER_URL: string;
  readonly VITE_SPOTIFY_CLIENT_ID: string;
  readonly VITE_SPOTIFY_ACCOUNTS_URL: string;
  readonly VITE_SPOTIFY_API_URL: string;
  readonly VITE_SPOTIFY_PARTY_CLIENT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

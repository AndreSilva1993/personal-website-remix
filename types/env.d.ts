/// <reference types="@remix-run/node" />
/// <reference types="vite/client" />

// See https://vitejs.dev/guide/env-and-mode for additional documentation
// on Vite's environment variables.
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly VITE_STADIA_MAP_API_KEY: string;
  readonly VITE_LAST_FM_API_USER: string;
  readonly VITE_LAST_FM_API_KEY: string;
  readonly VITE_LAST_FM_API_URL: string;

  readonly VITE_UPSTASH_REDIS_URL: string;
  readonly VITE_UPSTASH_REDIS_TOKEN: string;

  readonly VITE_SPOTIFY_API_URL: string;
  readonly VITE_SPOTIFY_ACCOUNTS_API_URL: string;
  readonly VITE_SPOTIFY_CLIENT_ID: string;
  readonly VITE_SPOTIFY_CLIENT_SECRET: string;
  readonly VITE_SPOTIFY_REFRESH_TOKEN: string;
  readonly VITE_SPOTIFY_ACCESS_TOKEN_REDIS_KEY: string;
}

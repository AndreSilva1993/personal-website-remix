/* eslint-disable @typescript-eslint/no-unused-vars */
interface Window {
  ENV: {
    STADIA_MAP_API_KEY: string;
  };
}

namespace NodeJS {
  interface ProcessEnv {
    UPSTASH_REDIS_URL: string;
    UPSTASH_REDIS_TOKEN: string;

    SPOTIFY_API_URL: string;
    SPOTIFY_ACCOUNTS_API_URL: string;
    SPOTIFY_CLIENT_ID: string;
    SPOTIFY_CLIENT_SECRET: string;
    SPOTIFY_REFRESH_TOKEN: string;
    SPOTIFY_ACCESS_TOKEN_REDIS_KEY: string;
  }
}

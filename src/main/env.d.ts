/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly MAIN_VITE_CRYPTO_SECRET: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

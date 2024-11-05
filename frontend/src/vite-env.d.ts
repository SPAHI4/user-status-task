/// <reference types="vite/client" />
/// <reference types="@testing-library/jest-dom" />
/// <reference types="@emotion/react/types/css-prop" />

interface ImportMetaEnv {
  VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

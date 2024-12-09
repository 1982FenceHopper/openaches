declare module "bun" {
  interface Env {
    PORT: string;
    HDX_IDENT: string;
    BRAVE_API_KEY: string;
    GROQ_API_KEY: string;
  }
}

export {};

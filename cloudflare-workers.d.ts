declare module "cloudflare:workers" {
  export const env: Record<string, any>;
}

interface Fetcher {
  fetch(request: Request): Promise<Response>;
}

type D1Database = any;

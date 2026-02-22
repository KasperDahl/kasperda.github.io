export interface CloudflareConfig {
  loginUrl: string;
  postLoginRedirectUrl: string;
  cookieName: string;
}

export interface AppDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  url: string;
  requiresAuth: boolean;
  color: string;
}

export interface AppConfig {
  cloudflare: CloudflareConfig;
  apps: AppDefinition[];
}

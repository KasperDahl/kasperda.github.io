export interface AppDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  /** Optional image icon; takes precedence over the Material `icon` when set. */
  iconUrl?: string;
  url: string;
  color: string;
}

export interface AppConfig {
  apps: AppDefinition[];
}

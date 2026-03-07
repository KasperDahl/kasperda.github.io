export interface AppDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  url: string;
  color: string;
}

export interface AppConfig {
  apps: AppDefinition[];
}

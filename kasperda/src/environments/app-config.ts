import { AppConfig } from '../app/models/app-config.model';

export const APP_CONFIG: AppConfig = {
  cloudflare: {
    loginUrl: 'https://YOURTEAM.cloudflareaccess.com/cdn-cgi/access/login/DUMMY_APP_ID',
    postLoginRedirectUrl: 'https://www.kasperda.dk/apps',
    cookieName: 'CF_Authorization',
  },

  apps: [
    {
      id: 'cooking',
      name: 'Cooking',
      description: 'Recipes, meal plans, and more',
      icon: 'restaurant',
      url: 'https://cooking.kasperda.dk',
      requiresAuth: false,
      color: '#FF6B35',
    },
    {
      id: 'food-waste',
      name: 'Undgå madspild',
      description: 'Se tilbud i den lokale Netto',
      icon: 'eco',
      url: 'https://madspild.kasperda.dk',
      requiresAuth: true,
      color: '#4CAF50',
    },
    // {
    //   id: 'blog',
    //   name: 'Blog',
    //   description: 'Personal blog and notes',
    //   icon: 'article',
    //   url: 'https://blog.kasperda.dk',
    //   requiresAuth: true,
    //   color: '#2196F3',
    // },
  ],
};

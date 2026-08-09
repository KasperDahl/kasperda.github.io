import { AppConfig } from '../app/models/app-config.model';

export const APP_CONFIG: AppConfig = {
  apps: [
    // {
    //   id: 'cooking',
    //   name: 'Cooking',
    //   description: 'Recipes, meal plans, and more',
    //   icon: 'restaurant',
    //   url: 'https://food-waste.kasperda.dk',
    //   color: '#FF6B35',
    // },
    {
      id: 'food-waste',
      name: 'Undgå madspild',
      description: 'Se tilbud i den lokale Netto',
      icon: 'eco',
      url: 'https://food-waste.kasperda.dk',
      color: '#4CAF50',
    },
    {
      id: 'stocks',
      name: 'Stocks',
      description: 'Følg dine aktier og porteføljer',
      icon: 'trending_up',
      iconUrl: 'assets/icons/stocks/icon-192.png',
      url: 'https://stocks.kasperda.dk',
      color: '#009B72',
    },
    {
      id: 'test',
      name: 'Test',
      description: 'Cloudflare Access test page',
      icon: 'science',
      url: 'https://test.kasperda.dk',
      color: '#9C27B0',
    },
    // {
    //   id: 'blog',
    //   name: 'Blog',
    //   description: 'Personal blog and notes',
    //   icon: 'article',
    //   url: 'https://blog.kasperda.dk',
    //   color: '#2196F3',
    // },
  ],
};

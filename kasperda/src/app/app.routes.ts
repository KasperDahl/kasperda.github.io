import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { AppsComponent } from './components/apps/apps.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'apps', component: AppsComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

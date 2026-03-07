import { Component } from '@angular/core';
import { APP_CONFIG } from '../../../environments/app-config';
import { AppDefinition } from '../../models/app-config.model';
import { AppCardComponent } from './app-card/app-card.component';

@Component({
  selector: 'app-apps',
  standalone: true,
  imports: [AppCardComponent],
  templateUrl: './apps.component.html',
  styleUrl: './apps.component.scss',
})
export class AppsComponent {
  apps: AppDefinition[] = APP_CONFIG.apps;
}

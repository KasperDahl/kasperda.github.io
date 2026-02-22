import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { APP_CONFIG } from '../../../environments/app-config';
import { AppDefinition } from '../../models/app-config.model';
import { AppCardComponent } from './app-card/app-card.component';

@Component({
  selector: 'app-apps',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, AppCardComponent],
  templateUrl: './apps.component.html',
  styleUrl: './apps.component.scss',
})
export class AppsComponent {
  apps: AppDefinition[] = APP_CONFIG.apps;
  isAuthenticated$ = this.authService.isAuthenticated$;
  isDevMode = this.authService.isDevMode();

  constructor(private authService: AuthService) {}

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }

  toggleDevAuth(): void {
    this.authService.toggleDevAuth();
  }
}

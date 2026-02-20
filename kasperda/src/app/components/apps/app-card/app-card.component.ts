import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppDefinition } from '../../../models/app-config.model';

@Component({
  selector: 'app-app-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatTooltipModule],
  templateUrl: './app-card.component.html',
  styleUrl: './app-card.component.scss',
})
export class AppCardComponent {
  @Input({ required: true }) app!: AppDefinition;
  @Input() isAuthenticated = false;

  get isAccessible(): boolean {
    return !this.app.requiresAuth || this.isAuthenticated;
  }

  get tooltipText(): string {
    return this.isAccessible ? '' : 'Login required';
  }

  onClick(): void {
    if (this.isAccessible) {
      window.open(this.app.url, '_blank');
    }
  }
}

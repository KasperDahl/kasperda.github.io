import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AppDefinition } from '../../../models/app-config.model';

@Component({
  selector: 'app-app-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './app-card.component.html',
  styleUrl: './app-card.component.scss',
})
export class AppCardComponent {
  @Input({ required: true }) app!: AppDefinition;

  onClick(): void {
    window.open(this.app.url, '_blank');
  }
}

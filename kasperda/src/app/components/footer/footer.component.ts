import { Component } from '@angular/core';
import { MatCardFooter } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatCardFooter, MatIcon],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}

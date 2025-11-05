import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nos-casamos-section',
  imports: [],
  standalone: true,
  templateUrl: './nos-casamos-section.component.html',
  styleUrls: ['./nos-casamos-section.component.css'],
})
export class NosCasamosSectionComponent {
  @Input() frase: string = '';
  @Input() mensaje: string = '';
}

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nos-casamos-section',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './nos-casamos-section.component.html',
  styleUrls: ['./nos-casamos-section.component.css'],
})
export class NosCasamosSectionComponent {
  @Input() frase: string = '';
  @Input() mensaje: string = '';

  //Nuevas propiedades para personalización
  @Input() fontFamily: string = 'Playfair Display, serif';
  @Input() colorTexto: string = '#333333';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['frase'] || changes['mensaje']) {
      // Aquí puedes agregar lógica adicional si es necesario cuando cambian las entradas
      console.log(
        'Seccion "Nos casamos" actualizada: ',
        this.frase,
        this.mensaje
      );
    }
  }
}

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
})
export class HeroSectionComponent implements OnChanges {
  @Input() nombres!: string;
  @Input() fecha!: string;
  @Input() lugar!: string;
  @Input() heroImage!: string; //Imagenes desde cloudinary

  //Nuevas propiedades para personalizacion
  @Input() fuente: string = 'Playfair Display, serif';
  @Input() colorTexto: string = '#ffffff';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nombres']) {
      console.log('Nombres actualizados:', this.nombres);
    }
  }
}

import { Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-services',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSliderModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.css']
})
export class MyServicesComponent {
  // Paquetes de servicios
  paquetes = [
    {
      price: 3500,
      features: ['8 horas de cobertura', '100 fotos editadas', 'Entrega digital'],
      popular: false
    },
    {
      price: 5000,
      features: ['12 horas de cobertura', '200 fotos editadas', 'Video highlights', 'Álbum digital'],
      popular: true
    },
    {
      price: 7000,
      features: ['Full day (16 horas)', '300+ fotos editadas', 'Video documental', 'Álbum físico premium'],
      popular: false
    }
  ];

  // Signals para estado reactivo
  duration = signal(1);
  photos = signal(10);
  includeDrone = signal(false);
  includeAlbum = signal(false);
  selectedDate = new FormControl<Date | null>(null);

// Métodos actualizados para respuesta en tiempo real
// Métodos actualizados para respuesta en tiempo real
updateDuration(event: any) {
  const value = event?.target?.value ?? event?.value ?? event;
  const validatedValue = Math.min(12, Math.max(1, Number(value) || 1));
  this.duration.set(validatedValue);
}

updatePhotos(event: any) {
  const value = event?.target?.value ?? event?.value ?? event;
  const validatedValue = Math.min(500, Math.max(1, Number(value) || 1));
  this.photos.set(validatedValue);
}

  updateDrone(event: any) {
    this.includeDrone.set(event.checked);
  }

  updateAlbum(event: any) {
    this.includeAlbum.set(event.checked);
  }

  // Método para formatear el número de fotos
  formatPhotos(quantity: number): string {
    return quantity === 500 ? '500+' : quantity.toString();
  }

  // Cálculo de precio
  calculatePrice(): number {
    const isHighSeason = this.isHighSeason;
    const basePrice = this.duration() * (isHighSeason ? 700 : 300);
    const photosPrice = this.photos() * (isHighSeason ? 40 : 20);
    const extras = (this.includeDrone() ? 1500 : 0) + (this.includeAlbum() ? 1000 : 0);
    return basePrice + photosPrice + extras;
  }

  // Formateador de precio
  formatPrice(price: number): string {
    return `$${price.toLocaleString('es-MX')} MXN`;
  }

  // Getter para temporada alta
  get isHighSeason(): boolean {
    return this.selectedDate.value?.getMonth() === 11; // Diciembre
  }
}

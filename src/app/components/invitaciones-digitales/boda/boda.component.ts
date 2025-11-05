import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boda.component.html',
  styleUrls: ['./boda.component.css'],
})
export class BodaComponent implements OnInit {
  invitacionesDemo = [
    { imagen: 'assets/img/mockup1.jpg', titulo: 'Diseño Elegante' },
    { imagen: 'assets/img/mockup2.jpg', titulo: 'Diseño Floral' },
    { imagen: 'assets/img/mockup3.jpg', titulo: 'Diseño Moderno' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Rotación automática del carrusel
    setInterval(() => this.moverCarrusel(), 5000);
  }

  moverCarrusel() {
    const carrusel = document.querySelector('.carrusel-container');
    if (carrusel) {
      carrusel.scrollBy({ left: 250, behavior: 'smooth' });
      if (carrusel.scrollLeft + carrusel.clientWidth >= carrusel.scrollWidth) {
        carrusel.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }
  }

  verCatalogo() {
    this.router.navigate(['/catalogo-invitaciones-boda']);
  }
}

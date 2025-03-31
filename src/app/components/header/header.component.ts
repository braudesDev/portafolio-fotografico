import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  lastScrollTop = 0;
  navHidden = false;
  isMenuOpen = false; // Controla si el menú hamburguesa está abierto

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollTop = window.scrollY;

    if (currentScrollTop > this.lastScrollTop) {
      // Scroll hacia abajo → Ocultar navbar
      this.navHidden = true;
    } else {
      // Scroll hacia arriba → Mostrar navbar
      this.navHidden = false;
    }

    this.lastScrollTop = currentScrollTop;
  }

  // Método para alternar el menú hamburguesa
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Método para cerrar el menú al hacer clic en un enlace
  onNavClick() {
    this.isMenuOpen = false; // Cierra el menú hamburguesa
    this.navHidden = false; // Muestra el navbar cuando se hace clic en un enlace
  }
} 
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    MatIconModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  lastScrollTop = 0;
  navHidden = false;

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

  onNavClick() {
    this.navHidden = false; //Muestra el navbas cuando se hace click en un enlace
  }
}

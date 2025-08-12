import { Component, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Auth, signOut, onAuthStateChanged, User } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  imports: [RouterModule, MatIconModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private auth = inject(Auth);
  private router = inject(Router);

  isLoggedIn = false;

  lastScrollTop = 0;
  navHidden = false;
  isMenuOpen = false;

  constructor() {
    onAuthStateChanged(this.auth, (user: User | null) => {
      this.isLoggedIn = !!user;
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollTop = window.scrollY;

    if (currentScrollTop > this.lastScrollTop) {
      this.navHidden = true;
    } else {
      this.navHidden = false;
    }

    this.lastScrollTop = currentScrollTop;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onNavClick() {
    this.isMenuOpen = false;
    this.navHidden = false;
  }

  logout() {
    signOut(this.auth)
      .then(() => {
        localStorage.removeItem('isAdmin');
        this.router.navigate(['/']);
      })
      .catch((err) => {
        console.error('Error al cerrar sesión:', err);
      });
  }
}

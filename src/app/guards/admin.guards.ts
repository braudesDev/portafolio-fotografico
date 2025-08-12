import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // lógica para verificar si está autenticado y es admin
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    if (!isAdmin) {
      this.router.navigate(['/']); // o a donde quieras redirigir
      return false;
    }
    return true;
  }
}

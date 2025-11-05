import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invitaciones-digitales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invitaciones-digitales.component.html',
  styleUrls: ['./invitaciones-digitales.component.css'],
})
export class InvitacionesDigitalesComponent {
  mockups = [
    { imagen: 'assets/mockups/mock1.jpg', titulo: 'Boda - Diseño elegante' },
    { imagen: 'assets/mockups/mock2.jpg', titulo: 'XV Años - Estilo moderno' },
    { imagen: 'assets/mockups/mock3.jpg', titulo: 'Bautizo - Tema floral' },
  ];
  constructor(private router: Router) {}

  verInvitaciones(tipo: string) {
    this.router.navigate(['./' + tipo.toLocaleLowerCase()]);
    console.log('Ver invitaciones de:', tipo);
    // Aquí luego puedes navegar a la lista de invitaciones por tipo
  }

  irATodas() {
    console.log('Mostrar todas las invitaciones');
    // Luego se conectará con la vista general
  }
}

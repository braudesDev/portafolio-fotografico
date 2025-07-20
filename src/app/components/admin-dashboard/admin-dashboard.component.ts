import { Component, OnInit } from '@angular/core';
import { ReservasService, Reserva } from '../../services/reservas.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  reservas: Reserva[] = [];

  constructor(private reservasService: ReservasService) {}

  ngOnInit() {
    this.reservasService.getReservas().subscribe((data) => {
      this.reservas = data;
    });
  }

  editarReserva(reserva: Reserva) {
    // Aquí puedes redirigir a un formulario con la reserva para editar
    // o abrir un modal para modificarla
    console.log('Editar reserva', reserva);
  }

  eliminarReserva(id: string) {
    if (confirm('¿Estás seguro que deseas eliminar esta reserva?')) {
      this.reservasService
        .deleteReserva(id)
        .then(() => {
          console.log('Reserva eliminada');
          // Quitar reserva de la lista local para actualizar vista inmediatamente
          this.reservas = this.reservas.filter((r) => r.id !== id);
        })
        .catch((err) => {
          console.error('Error eliminando reserva', err);
        });
    }
  }
}

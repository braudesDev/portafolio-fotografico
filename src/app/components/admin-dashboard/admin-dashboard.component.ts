import { Component, OnInit } from '@angular/core';
import { ReservasService, Reserva } from '../../services/reservas.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  reservas: Reserva[] = [];

  constructor(
    private reservasService: ReservasService,
    private router: Router
  ) {}

  ngOnInit() {
    this.reservasService.getReservas().subscribe((data) => {
      this.reservas = data;
    });
  }

  editarReserva(reserva: Reserva) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres editar la reserva de ${reserva.clienteNombre}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí va la lógica para redirigir o abrir el formulario de edición
        console.log('Editar reserva confirmada:', reserva);
        this.router.navigate(['/editar-reserva', reserva.id]);
      }
    });
  }

  eliminarReserva(id: string) {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar esta informacion?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5', // color morado que usas
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservasService
          .deleteReserva(id)
          .then(() => {
            Swal.fire('Eliminado', 'La reserva ha sido eliminada.', 'success');
            // Actualizar lista local para reflejar cambio sin recargar
            this.reservas = this.reservas.filter((r) => r.id !== id);
          })
          .catch((err) => {
            Swal.fire(
              'Error',
              'Ocurrió un error al eliminar la reserva.',
              'error'
            );
            console.error('Error eliminando reserva', err);
          });
      }
    });
  }
}

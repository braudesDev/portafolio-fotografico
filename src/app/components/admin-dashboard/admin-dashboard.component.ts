import { Component, OnInit } from '@angular/core';
import { ReservasService, Reserva } from '../../services/reservas.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2';

interface Invitacion {
  evento: string;
  anfitrion: string;
  totalInvitados: number;
  fecha: Date;
  enviadas: number;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  reservas: Reserva[] = [];
  invitaciones: Invitacion[] = [];
  selectedSection: 'reservas' | 'invitaciones' = 'reservas';

  constructor(
    private reservasService: ReservasService,
    private router: Router
  ) {}

  ngOnInit() {
    this.reservasService.getReservas().subscribe((data) => {
      this.reservas = data;
    });

    // Datos simulados por ahora
    this.invitaciones = [
      {
        evento: 'Boda de Ana y Luis',
        anfitrion: 'Ana Martínez',
        totalInvitados: 120,
        fecha: new Date('2025-11-15'),
        enviadas: 80,
      },
      {
        evento: 'XV Años de Sofía',
        anfitrion: 'Sofía López',
        totalInvitados: 100,
        fecha: new Date('2025-12-02'),
        enviadas: 45,
      },
    ];
  }

  editarReserva(reserva: Reserva) {
    Swal.fire({
      title: '¿Editar reserva?',
      text: `¿Deseas editar la reserva de ${reserva.clienteNombre}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/editar-reserva', reserva.id]);
      }
    });
  }

  eliminarReserva(id: string) {
    Swal.fire({
      title: '¿Eliminar reserva?',
      text: 'No podrás revertir esto.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservasService
          .deleteReserva(id)
          .then(() => {
            Swal.fire('Eliminada', 'La reserva ha sido eliminada.', 'success');
            this.reservas = this.reservas.filter((r) => r.id !== id);
          })
          .catch((err) => {
            Swal.fire('Error', 'No se pudo eliminar la reserva.', 'error');
            console.error('Error eliminando reserva', err);
          });
      }
    });
  }
}

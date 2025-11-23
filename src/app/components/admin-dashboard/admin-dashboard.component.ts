import { Component, OnInit } from '@angular/core';
import { Firestore, doc, deleteDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2';

// Servicios
import { ReservasService, Reserva } from '../../services/reservas.service';
import {
  InvitacionesService,
  Invitacion,
} from '../../services/invitaciones.service';

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
    private invitacionesService: InvitacionesService, // ✅ Faltaba la coma anterior
    private router: Router,
    private firestore: Firestore
  ) {}

  ngOnInit() {
    // Cargar reservas reales
    this.reservasService.getReservas().subscribe((data) => {
      this.reservas = data;
    });

    //Cargar invitaciones desde el servicio real
    this.invitacionesService.getAll().subscribe((data) => {
      this.invitaciones = data;
    });
  }

  // 🟣 --- RESERVAS ---
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

  // 🟢 --- INVITACIONES ---
  editarInvitacion(invitacion: Invitacion) {
    Swal.fire({
      title: '¿Editar invitación?',
      text: `¿Deseas editar la invitación "${invitacion.name}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/editar-invitacion', invitacion.id]);
      }
    });
  }

  // 🔹 Genera la URL completa para una invitación
  generarEnlace(invitacion: Invitacion): string {
    const slug = invitacion.slug || invitacion.id;
    return `${window.location.origin}/invitacion/${slug}`;
  }

  // 🔹 Copia la URL al portapapeles
  copiarEnlace(invitacion: Invitacion) {
    const enlace = this.generarEnlace(invitacion);
    navigator.clipboard.writeText(enlace);
    Swal.fire(
      'Copiado',
      'El enlace ha sido copiado al portapapeles',
      'success'
    );
  }

  eliminarInvitacion(id: string) {
    Swal.fire({
      title: '¿Eliminar invitación?',
      text: 'No podrás revertir esto.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // 🔹 Usa el ID real para borrar
          const ref = doc(this.firestore, `invitaciones/${id}`);
          await deleteDoc(ref);

          // 🔹 Actualiza la UI
          this.invitaciones = this.invitaciones.filter((inv) => inv.id !== id);

          Swal.fire('Eliminada', 'La invitación ha sido eliminada.', 'success');
        } catch (error) {
          console.error(error);
          Swal.fire('Error', 'No se pudo eliminar la invitación', 'error');
        }
      }
    });
  }
}

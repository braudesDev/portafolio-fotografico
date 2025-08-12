import { Component, OnInit } from '@angular/core';
import { ReservasService, Reserva } from '../../services/reservas.service';
import { Timestamp } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reserva-form.component.html',
  styleUrls: ['./reserva-form.component.css'],
})
export class ReservaFormComponent implements OnInit {
  reservaForm: FormGroup;
  reservaIdToEdit: string | null = null;

  // Array con los paquetes válidos
  paquetes = ['Básico', 'Estándar', 'Premium', 'Deluxe', 'Personalizado'];

  constructor(
    private reservasService: ReservasService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.reservaForm = this.fb.group({
      clienteNombre: ['', Validators.required],
      fechaEvento: [new Date(), Validators.required],
      estado: ['apartado', Validators.required],
      anticipo: [0, Validators.min(0)],
      total: [0, Validators.min(0)],
      restante: [0],
      paquete: ['', Validators.required],
      notas: [''],
    });
  }

  ngOnInit(): void {
    this.reservaIdToEdit = this.route.snapshot.paramMap.get('id');

    if (this.reservaIdToEdit) {
      this.reservasService
        .getReservaById(this.reservaIdToEdit)
        .subscribe((reserva) => {
          if (reserva) {
            const fechaEventoDate = reserva.fechaEvento.toDate();

            const paqueteValido = this.paquetes.includes(reserva.paquete)
              ? reserva.paquete
              : '';

            this.reservaForm.patchValue({
              clienteNombre: reserva.clienteNombre,
              fechaEvento: fechaEventoDate.toISOString().substring(0, 10),
              estado: reserva.estado,
              anticipo: reserva.anticipo,
              total: reserva.total,
              restante: reserva.restante,
              paquete: paqueteValido,
              notas: reserva.notas,
            });
          }
        });
    }

    this.reservaForm
      .get('anticipo')
      ?.valueChanges.subscribe(() => this.calcularRestante());
    this.reservaForm
      .get('total')
      ?.valueChanges.subscribe(() => this.calcularRestante());
  }

  private calcularRestante() {
    const anticipo = this.reservaForm.get('anticipo')?.value || 0;
    const total = this.reservaForm.get('total')?.value || 0;
    this.reservaForm.patchValue(
      { restante: total - anticipo },
      { emitEvent: false }
    );
  }

  guardarReserva() {
    const formValue = this.reservaForm.value;

    let fechaEventoDate: Date;
    if (typeof formValue.fechaEvento === 'string') {
      const [year, month, day] = formValue.fechaEvento.split('-').map(Number);
      fechaEventoDate = new Date(year, month - 1, day);
    } else if (formValue.fechaEvento instanceof Date) {
      fechaEventoDate = formValue.fechaEvento;
    } else {
      throw new Error('Formato de fecha no reconocido');
    }

    const reserva: Reserva = {
      clienteNombre: formValue.clienteNombre,
      fechaEvento: Timestamp.fromDate(fechaEventoDate),
      estado: formValue.estado,
      anticipo: formValue.anticipo,
      total: formValue.total,
      restante: formValue.total - formValue.anticipo,
      paquete: formValue.paquete,
      notas: formValue.notas,
      fechaCreacion: Timestamp.now(),
    };

    if (this.reservaIdToEdit) {
      this.reservasService
        .updateReserva(this.reservaIdToEdit, reserva)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Reserva actualizada',
            text: 'La reserva se ha actualizado correctamente.',
            timer: 2000,
            showConfirmButton: false,
          });
          this.router.navigate(['/admin-dashboard']);
        })
        .catch((error) => {
          console.error('Error actualizando reserva:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar la reserva. Inténtalo de nuevo.',
          });
        });
    } else {
      this.reservasService
        .addReserva(reserva)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Reserva creada',
            text: 'La reserva se ha registrado correctamente.',
            timer: 2000,
            showConfirmButton: false,
          });
          this.reservaForm.reset({
            clienteNombre: '',
            fechaEvento: new Date(),
            estado: 'apartado',
            anticipo: 0,
            total: 0,
            restante: 0,
            paquete: '',
            notas: '',
          });
        })
        .catch((error) => {
          console.error('Error agregando reserva:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo registrar la reserva. Inténtalo de nuevo.',
          });
        });
    }
  }
}

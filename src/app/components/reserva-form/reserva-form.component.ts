import { Component, OnInit } from '@angular/core';
import { ReservasService, Reserva } from '../../services/reservas.service';
import { Timestamp } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reserva-form.component.html',
  styleUrls: ['./reserva-form.component.css'],
})
export class ReservaFormComponent implements OnInit {
  reservas: Reserva[] = [];
  reservaForm: FormGroup;

  constructor(
    private reservasService: ReservasService,
    private fb: FormBuilder
  ) {
    this.reservaForm = this.fb.group({
      clienteNombre: ['', Validators.required],
      fechaEvento: [new Date(), Validators.required],
      estado: ['apartado', Validators.required],
      anticipo: [0, Validators.min(0)],
      total: [0, Validators.min(0)],
      restante: [0],
      paquete: [''],
      notas: [''],
    });
  }

  ngOnInit(): void {
    this.reservasService.getReservas().subscribe((data) => {
      this.reservas = data;
    });
  }

  agregarReserva() {
    const formValue = this.reservaForm.value;

    // Detectar si viene como string
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

    this.reservasService
      .addReserva(reserva)
      .then(() => {
        this.reservaForm.reset();
      })
      .catch((error) => {
        console.error('Error agregando reserva:', error);
      });
  }
}

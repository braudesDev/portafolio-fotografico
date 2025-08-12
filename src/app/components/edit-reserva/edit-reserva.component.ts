import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReservasService, Reserva } from '../../services/reservas.service';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-edit-reserva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-reserva.component.html',
  styleUrls: ['./edit-reserva.component.css'],
})
export class EditReservaComponent implements OnInit {
  reservaForm!: FormGroup;
  reservaId!: string;

  paquetes = ['Básico', 'Estándar', 'Premium', 'Deluxe', 'Personalizado'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private reservasService: ReservasService
  ) {}

  ngOnInit() {
    this.reservaId = this.route.snapshot.paramMap.get('id') || '';
    this.initForm();

    this.reservasService.getReservas().subscribe((reservas) => {
      const reserva = reservas.find((r) => r.id === this.reservaId);
      if (reserva) {
        this.populateForm(reserva);
      } else {
        alert('Reserva no encontrada');
        this.router.navigate(['/admin-dashboard']);
      }
    });
  }

  initForm() {
    this.reservaForm = this.fb.group({
      clienteNombre: ['', Validators.required],
      fechaEvento: ['', Validators.required],
      estado: ['', Validators.required],
      anticipo: [0, Validators.min(0)],
      total: [0, Validators.min(0)],
      paquete: [''],
      notas: [''],
    });
  }

  populateForm(reserva: Reserva) {
    const fecha = reserva.fechaEvento.toDate();
    const fechaString = fecha.toISOString().substring(0, 10);

    this.reservaForm.patchValue({
      clienteNombre: reserva.clienteNombre,
      fechaEvento: fechaString,
      estado: reserva.estado,
      anticipo: reserva.anticipo,
      total: reserva.total,
      paquete: reserva.paquete,
      notas: reserva.notas,
    });
  }

  guardarCambios() {
    if (this.reservaForm.invalid) return;

    const formValue = this.reservaForm.value;
    const [year, month, day] = formValue.fechaEvento.split('-').map(Number);
    const fechaEventoDate = new Date(year, month - 1, day);

    const data: Partial<Reserva> = {
      clienteNombre: formValue.clienteNombre,
      fechaEvento: Timestamp.fromDate(fechaEventoDate),
      estado: formValue.estado,
      anticipo: formValue.anticipo,
      total: formValue.total,
      restante: formValue.total - formValue.anticipo,
      paquete: formValue.paquete,
      notas: formValue.notas,
    };

    this.reservasService
      .updateReserva(this.reservaId, data)
      .then(() => {
        alert('Reserva actualizada correctamente');
        this.router.navigate(['/admin-dashboard']);
      })
      .catch((error) => {
        console.error('Error actualizando reserva', error);
        alert('Error actualizando reserva');
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { InvitadosService } from '../../services/invitados.service';
import { Invitado } from '../../models/invitado.model';

@Component({
  selector: 'app-anfitrion-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './anfitrion-dashboard.component.html',
  styleUrls: ['./anfitrion-dashboard.component.css'],
})
export class AnfitrionDashboardComponent implements OnInit {
  tabActivo: 'pendiente' | 'confirmado' | 'rechazado' = 'pendiente';
  invitados$: Observable<Invitado[]> | undefined;
  nuevoInvitado: Partial<Invitado> = {
    nombre: '',
    pases: 1,
    mensajePersonalizado: '',
    estado: 'pendiente',
  };

  // ⚠️ Temporal: id del anfitrión logueado
  anfitrionId = 'anfitrion-demo';

  constructor(private invitadosService: InvitadosService) {}

  ngOnInit() {
    this.cargarInvitados();
  }

  cambiarTab(tab: 'pendiente' | 'confirmado' | 'rechazado') {
    this.tabActivo = tab;
    this.cargarInvitados();
  }

  cargarInvitados() {
    this.invitados$ = this.invitadosService.getInvitadosPorAnfitrion(
      this.anfitrionId,
      this.tabActivo
    );
  }

  generarSlug(nombre: string): string {
    return (
      nombre.toLowerCase().replace(/\s+/g, '-') +
      '-' +
      Math.floor(Math.random() * 10000)
    );
  }

  async agregarInvitado() {
    if (!this.nuevoInvitado.nombre) return;

    const invitado: Partial<Invitado> = {
      ...this.nuevoInvitado,
      slug: this.generarSlug(this.nuevoInvitado.nombre!),
      estado: 'pendiente',
      anfitrionId: this.anfitrionId,
    };

    await this.invitadosService.agregarInvitado(invitado as Invitado);

    this.nuevoInvitado = {
      nombre: '',
      pases: 1,
      mensajePersonalizado: '',
      estado: 'pendiente',
    };

    this.cargarInvitados();
  }

  async cambiarEstado(
    inv: Invitado,
    estado: 'pendiente' | 'confirmado' | 'rechazado'
  ) {
    await this.invitadosService.actualizarInvitado(inv.id!, { estado });
    this.cargarInvitados();
  }

  enviarWhatsApp(inv: Invitado) {
    const mensajePersonalizado = inv.mensajePersonalizado ?? '';

    // Construir link a la invitación personalizada
    const urlInvitacion = `${window.location.origin}/invitaciones/${
      inv.slug
    }?invitado=${encodeURIComponent(inv.nombre)}&pases=${inv.pases}`;

    const mensaje = `Hola ${inv.nombre}, estás invitado a nuestro evento! ${mensajePersonalizado} Aquí está tu invitación: ${urlInvitacion}`;

    const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      mensaje
    )}`;

    const nuevaVentana = window.open(whatsappURL, '_blank');

    if (
      !nuevaVentana ||
      nuevaVentana.closed ||
      typeof nuevaVentana.closed === 'undefined'
    ) {
      navigator.clipboard.writeText(whatsappURL).then(() => {
        alert(
          'No se pudo abrir WhatsApp automáticamente. Se copió el link al portapapeles.'
        );
      });
    }
  }

  descargarPDF(inv: Invitado) {
    alert(`Descargando PDF para ${inv.nombre} (simulado)`);
  }
}

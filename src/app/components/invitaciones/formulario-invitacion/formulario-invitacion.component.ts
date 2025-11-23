import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

export interface Invitacion {
  id?: string;
  name: string;
  slug: string;
  tipo: string;
  nombres: string;
  fecha: any;
  lugar: string;
  frasePrincipal: string;
  mensajePrincipal: string;
  fraseDeInvValida: string;
  historia?: string;
  heroImage?: string;
  shareImage?: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
}

@Component({
  selector: 'app-formulario-invitacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-invitacion.component.html',
  styleUrls: ['./formulario-invitacion.component.css'],
})
export class FormularioInvitacionComponent implements OnInit {
  invitacionId: string | null = null;
  cargando = false;
  nuevaInvitacion: Invitacion = this.getInvitacionInicial();

  // ✅ Tipo literal para secciones colapsables
  seccionesAbiertas: {
    principales: boolean;
    hero: boolean;
    mensajes: boolean;
    colores: boolean;
    revision: boolean;
  } = {
    principales: true,
    hero: false,
    mensajes: false,
    colores: false,
    revision: false,
  };

  constructor(private firestore: Firestore, private route: ActivatedRoute) {}

  async ngOnInit() {
    this.invitacionId = this.route.snapshot.paramMap.get('id');
    if (this.invitacionId) {
      this.cargando = true;
      const ref = doc(this.firestore, `invitaciones/${this.invitacionId}`);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        this.nuevaInvitacion = { ...(snap.data() as Invitacion) };
      }
      this.cargando = false;
    }
  }

  // ✅ toggle con tipo literal
  toggleSeccion(
    seccion: 'principales' | 'hero' | 'mensajes' | 'colores' | 'revision'
  ) {
    this.seccionesAbiertas[seccion] = !this.seccionesAbiertas[seccion];
  }

  async guardarInvitacion() {
    if (
      !this.nuevaInvitacion.name ||
      !this.nuevaInvitacion.tipo ||
      !this.nuevaInvitacion.fecha
    ) {
      Swal.fire('Error', 'Completa los campos obligatorios', 'error');
      return;
    }

    // 🔹 Generar slug automáticamente
    this.nuevaInvitacion.slug = this.nuevaInvitacion.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '');

    const ref = doc(
      this.firestore,
      `invitaciones/${this.nuevaInvitacion.slug}`
    );

    try {
      await setDoc(ref, this.nuevaInvitacion);
      Swal.fire('Éxito', 'La invitación se guardó correctamente', 'success');
      this.nuevaInvitacion = this.getInvitacionInicial();

      // Abrir solo la primera sección al reiniciar
      this.seccionesAbiertas = {
        principales: true,
        hero: false,
        mensajes: false,
        colores: false,
        revision: false,
      };
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'No se pudo guardar la invitación', 'error');
    }
  }

  private getInvitacionInicial(): Invitacion {
    return {
      name: '',
      slug: '',
      tipo: 'boda',
      nombres: '',
      fecha: new Date().toISOString().substring(0, 16),
      lugar: '',
      frasePrincipal: '',
      mensajePrincipal: '',
      fraseDeInvValida: '',
      primaryColor: '#ffffff',
      secondaryColor: '#000000',
      fontFamily: 'Arial, sans-serif',
    };
  }
}

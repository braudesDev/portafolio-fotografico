import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SeoService } from '../../services/seo.service';

interface RedSocial {
  nombre: string;
  icono: string;
  url: string;
  cssClass: string;
  color?: string;    // Opcional
  svgIcon?: string;  // Opcional
}

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactoComponent implements OnInit {

  constructor(private seoService: SeoService) {}

ngOnInit(): void {
  this.seoService.setSeoData({
    pageTitle: 'Contacto - Fotógrafo en Irapuato',
    description: '¡Agenda tu sesión! WhatsApp: 4621304745. Servicio en todo Irapuato y alrededores.',
    keywords: 'contactar fotógrafo, WhatsApp fotógrafo, presupuesto sesión fotográfica',
    // image: 'assets/images/contact-og.jpg'
  });
}

  emailContacto = 'onoffshotph@gmail.com';
  mensajeEnviado = false;
  errorEnvio = false;
  cargando = false;
  errores: { [key: string]: string } = {};

  contacto = {
    nombre: '',
    email: '',
    mensaje: ''
  };

  redesSociales: RedSocial[] = [
    {
      nombre: 'Facebook',
      icono: 'thumb_up',
      url: 'https://www.facebook.com/share/1AXLU9Bdz3/',
      cssClass: 'facebook'
    },
    {
      nombre: 'Instagram',
      icono: 'photo_camera',
      url: 'https://www.instagram.com/on_off_shot?igsh=MXU3Mmc2aTZ1cmZ0Mg==',
      cssClass: 'instagram'
    },
    {
      nombre: 'WhatsApp',
      icono: 'chat_bubble',
      url: 'https://wa.me/524622439905',
      cssClass: 'whatsapp'
    }
  ];

  async enviarMensaje(event: Event) {
    event.preventDefault(); // Prevenir envío tradicional

    if (!this.validarFormulario()) {
      return;
    }

    this.cargando = true;
    this.mensajeEnviado = false;
    this.errorEnvio = false;

    try {
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);

      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        this.mensajeEnviado = true;
        this.contacto = { nombre: '', email: '', mensaje: '' };
        this.errores = {};
      } else {
        throw new Error('Error en el envío');
      }
    } catch (error) {
      console.error('Error al enviar:', error);
      this.errorEnvio = true;
    } finally {
      this.cargando = false;
    }
  }

  validarFormulario(): boolean {
    this.errores = {};

    if (!this.contacto.nombre) {
      this.errores['nombre'] = 'El nombre es requerido';
    } else if (this.contacto.nombre.length < 3) {
      this.errores['nombre'] = 'Mínimo 3 caracteres';
    }

    if (!this.contacto.email) {
      this.errores['email'] = 'El email es requerido';
    } else if (!this.validarEmail(this.contacto.email)) {
      this.errores['email'] = 'Email no válido';
    }

    if (!this.contacto.mensaje) {
      this.errores['mensaje'] = 'El mensaje es requerido';
    } else if (this.contacto.mensaje.length < 10) {
      this.errores['mensaje'] = 'Mínimo 10 caracteres';
    }

    return Object.keys(this.errores).length === 0;
  }

  validarEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }
}

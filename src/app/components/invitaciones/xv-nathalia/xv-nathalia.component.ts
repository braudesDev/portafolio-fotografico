import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import AOS from 'aos';
import { gsap } from 'gsap';

@Component({
  selector: 'app-xv-nathalia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './xv-nathalia.component.html',
  styleUrls: ['./xv-nathalia.component.css'],
})
export class XvNathaliaComponent implements OnInit, AfterViewInit {
  // ====================
  // Variables contador regresivo
  // ====================
  dias: number = 0;
  horas: number = 0;
  minutos: number = 0;
  segundos: number = 0;

  animarDias = false;
  animarHoras = false;
  animarMinutos = false;
  animarSegundos = false;

  // ====================
  // Galería de fotos
  // ====================
  fotos: string[] = [
    'https://res.cloudinary.com/drsyb53ae/image/upload/v1738168853/fotos%20invitacion%20paulina/vertical-galeria/ytyxsurb4spvnk1yxlrg.jpg',
    'https://res.cloudinary.com/drsyb53ae/image/upload/v1738168277/fotos%20invitacion%20paulina/vertical-galeria/clermdbdjeemzhvhnubs.jpg',
  ];
  modalActivo = false;
  fotoModal: string = '';

  // ====================
  // Itinerario / Timeline
  // ====================
  itinerario = [
    { icon: 'fas fa-church', title: 'Ceremonia', time: '6:00 PM' },
    { icon: 'fas fa-glass-cheers', title: 'Recepción', time: '8:00 PM' },
    { icon: 'fas fa-utensils', title: 'Cena', time: '9:00 PM' },
    { icon: 'fas fa-heart', title: 'Vals', time: '10:00 PM' },
    { icon: 'fas fa-music', title: 'Baile y Diversión', time: '10:30 PM' },
    { icon: 'fas fa-flag-checkered', title: 'Fin', time: '12:00 AM' },
  ];

  // ====================
  // Imágenes fullscreen dinámicas
  // ====================
  imagenesFullScreen = [
    {
      vertical:
        'https://res.cloudinary.com/drsyb53ae/image/upload/v1742255254/fotos-comprimidas/imagesHomeComprimidas/w8ehkueph7tupfrebgqh.webp',
      horizontal:
        'https://res.cloudinary.com/drsyb53ae/image/upload/v1738138633/fotos%20invitacion%20paulina/horizontal-portada/gjdbugphvswtm0yam5ts.jpg',
      alt: 'Foto vertical Quinceaniera y Horizontal boda',
    },
    {
      vertical:
        'https://res.cloudinary.com/drsyb53ae/image/upload/v1742255111/fotos-comprimidas/imagesHomeComprimidas/qcsigtzoemvcpcxe3afs.webp',
      horizontal:
        'https://res.cloudinary.com/drsyb53ae/image/upload/v1742239501/fotos-comprimidas/gczawnuavntxnuycsfsd.webp',
      alt: 'Foto vertical boda y horizontal Quinceañera',
    },
  ];

  // ====================
  // Confirmación de asistencia
  // ====================
  nombreConfirmacion: string = '';

  // ====================
  // Lifecycle hooks
  // ====================
  ngOnInit(): void {
    // Inicializar AOS
    AOS.init({ duration: 1000, once: true });

    // Animación de entrada con GSAP
    gsap.from('.texto-sobre-imagen', {
      opacity: 0,
      y: -50,
      duration: 1.2,
      delay: 0.5,
      ease: 'power2.out',
    });

    // Iniciar contador regresivo
    this.iniciarContador();
  }

  ngAfterViewInit(): void {
    // Animar íconos del timeline al hacer scroll
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.3 }
    );

    timelineItems.forEach((item) => observer.observe(item));

    // Animación línea central del timeline
    const timeline = document.querySelector('.timeline');
    if (timeline) {
      setTimeout(() => {
        timeline.classList.add('loaded');
      }, 100);
    }
  }

  // ====================
  // Métodos
  // ====================
  iniciarContador(): void {
    const fechaEvento = new Date('2025-11-29T18:00:00').getTime();

    setInterval(() => {
      const ahora = new Date().getTime();
      const diferencia = fechaEvento - ahora;

      if (diferencia > 0) {
        const nuevaDias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const nuevaHoras = Math.floor(
          (diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const nuevaMinutos = Math.floor(
          (diferencia % (1000 * 60 * 60)) / (1000 * 60)
        );
        const nuevaSegundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        // Activar animación solo si cambia el valor
        if (this.dias !== nuevaDias) this.animarDias = true;
        if (this.horas !== nuevaHoras) this.animarHoras = true;
        if (this.minutos !== nuevaMinutos) this.animarMinutos = true;
        if (this.segundos !== nuevaSegundos) this.animarSegundos = true;

        // Actualizar valores
        this.dias = nuevaDias;
        this.horas = nuevaHoras;
        this.minutos = nuevaMinutos;
        this.segundos = nuevaSegundos;

        // Reset animaciones
        setTimeout(() => {
          this.animarDias = false;
          this.animarHoras = false;
          this.animarMinutos = false;
          this.animarSegundos = false;
        }, 400);
      } else {
        this.dias = this.horas = this.minutos = this.segundos = 0;
      }
    }, 1000);
  }

  abrirModal(foto: string): void {
    this.fotoModal = foto;
    this.modalActivo = true;
  }

  cerrarModal(): void {
    this.modalActivo = false;
  }

  confirmarAsistencia(asiste: boolean): void {
    if (!this.nombreConfirmacion.trim()) {
      alert('Por favor escribe tu nombre 💬');
      return;
    }

    if (asiste) {
      alert(
        `🎉 ¡Gracias, ${this.nombreConfirmacion}! Nos encantará verte ahí 💖`
      );
    } else {
      alert(`😢 Lamentamos que no puedas asistir, ${this.nombreConfirmacion}.`);
    }

    this.nombreConfirmacion = '';
  }
}

import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
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
  // ViewChild para scroll
  // ====================
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;
  @ViewChild('destinoScroll', { static: true }) destinoScroll!: ElementRef;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

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
    'https://res.cloudinary.com/drsyb53ae/image/upload/v1738138679/fotos%20invitacion%20paulina/vertical-galeria/tfj62mmop2bzeyipxskd.jpg',
    'https://res.cloudinary.com/drsyb53ae/image/upload/v1738138678/fotos%20invitacion%20paulina/vertical-galeria/fez4ede73xnsyksurxa1.jpg',
    'https://res.cloudinary.com/drsyb53ae/image/upload/v1738138675/fotos%20invitacion%20paulina/vertical-galeria/gazw17vucyh4e3akce5x.jpg',
    'https://res.cloudinary.com/drsyb53ae/image/upload/v1738138671/fotos%20invitacion%20paulina/vertical-galeria/k9vlfb77gpaf0utgh8yp.jpg',
    'https://res.cloudinary.com/drsyb53ae/image/upload/v1738138573/fotos%20invitacion%20paulina/vertical-galeria/dyv20jg1g7avzk9awcuc.jpg',
    'https://res.cloudinary.com/drsyb53ae/image/upload/v1738138568/fotos%20invitacion%20paulina/vertical-galeria/fwgpuwchtwugsi6jcna2.jpg',
    'https://res.cloudinary.com/drsyb53ae/image/upload/v1738138567/fotos%20invitacion%20paulina/vertical-galeria/r2kz56d1qvb2kib8nvw7.jpg',
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
    {
      vertical:
        'https://res.cloudinary.com/drsyb53ae/image/upload/v1744341362/fotos-comprimidas/comprimidasPaulinaYChristian/vl0ycflhzir8hm9qtmci.webp',
      horizontal:
        'https://res.cloudinary.com/drsyb53ae/image/upload/v1744404807/fotos-comprimidas/comprimidasPaulinaYChristian/qfxfxsdkntweoryf7mrl.webp',
      alt: 'Foto vertical boda y horizontal Quinceañera',
    },
    {
      vertical:
        'https://res.cloudinary.com/drsyb53ae/image/upload/v1754589811/29062025-DSC_4081_neczgc.webp',
      horizontal:
        'https://res.cloudinary.com/drsyb53ae/image/upload/v1754589811/19072025-DSC_0077_rjclhc.webp',
      alt: 'Foto vertical boda y horizontal Quinceañera',
    },
    {
      vertical:
        'https://res.cloudinary.com/drsyb53ae/image/upload/v1738138544/fotos%20invitacion%20paulina/vertical-galeria/aztqksa1ldaxtosxeobj.jpg',
      horizontal:
        'https://res.cloudinary.com/drsyb53ae/image/upload/v1738196496/fotos%20invitacion%20paulina/horizontal-portada/fea7geegb4z54k2vuwc1.jpg',
      alt: 'Foto vertical boda y horizontal Quinceañera',
    },
  ];

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
    // ====================
    // Scroll suave hacia sección padrinos
    // ====================
    if (this.scrollContainer && this.destinoScroll) {
      this.renderer.listen(this.scrollContainer.nativeElement, 'click', () => {
        this.destinoScroll.nativeElement.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // ====================
    // Flip de cards (vestimenta)
    // ====================
    const cards = this.el.nativeElement.querySelectorAll('.card.vestimenta');
    cards.forEach((card: HTMLElement) => {
      const inner = card.querySelector('.card-inner');
      if (inner) {
        this.renderer.listen(inner, 'click', () =>
          inner.classList.toggle('is-flipped')
        );
      }
    });

    // ====================
    // Animación timeline al hacer scroll
    // ====================
    const timelineItems =
      this.el.nativeElement.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.3 }
    );
    timelineItems.forEach((item: any) => observer.observe(item));

    // Animación línea central timeline
    const timeline = this.el.nativeElement.querySelector('.timeline');
    if (timeline) {
      setTimeout(() => timeline.classList.add('loaded'), 100);
    }
  }

  // ====================
  // Contador regresivo
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

        if (this.dias !== nuevaDias) this.animarDias = true;
        if (this.horas !== nuevaHoras) this.animarHoras = true;
        if (this.minutos !== nuevaMinutos) this.animarMinutos = true;
        if (this.segundos !== nuevaSegundos) this.animarSegundos = true;

        this.dias = nuevaDias;
        this.horas = nuevaHoras;
        this.minutos = nuevaMinutos;
        this.segundos = nuevaSegundos;

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

  // ====================
  // Confirmación de asistencia
  // ====================
  nombreConfirmacion: string = '';
  telefono: string = '524621304745';

  confirmarAsistencia(asistira: boolean) {
    const nombre = this.nombreConfirmacion.trim();

    if (!nombre) {
      alert('Por favor, escribe tu nombre');
      return;
    }

    const nombreFormateado = `*${nombre}*`;
    const mensaje = asistira
      ? `Hola, soy ${nombreFormateado} y asistiré a tu evento, muchas gracias por la invitación!!! 🎉✨🥳`
      : `Hola, soy ${nombreFormateado} y lamentablemente no podré asistir a tu evento. ¡Mis mejores deseos para este gran día!`;

    const urlWhatsapp = `https://wa.me/${
      this.telefono
    }?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsapp, '_blank');

    this.nombreConfirmacion = '';
  }
}

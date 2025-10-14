import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Testimonio } from '../../interfaces/testimonio.interface';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-testimonios',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIcon, MatTooltipModule],
  templateUrl: './testimonios.component.html',
  styleUrls: ['./testimonios.component.css'],
})
export class TestimoniosComponent implements OnInit, AfterViewInit {
  @ViewChild('carrusel', { static: false })
  carruselElement!: ElementRef<HTMLDivElement>;

  // Firebase
  private FirebaseApp = initializeApp(environment.firebaseConfig);
  private db = getFirestore(this.FirebaseApp);

  // Datos
  testimonios: Testimonio[] = [];
  nuevoTestimonio: Omit<Testimonio, 'id' | 'fecha'> = {
    nombre: '',
    comentario: '',
    imagen_url: '',
  };
  mensaje = '';
  mostrarSelectorAvatares = false;
  cargando = false;
  mostrarErrorNombre = false;
  mostrarErrorComentario = false;

  // Avatares predefinidos
  avatares: string[] = [
    'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sgv/cusmeaakt5okr48fremr',
    'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sgv/eamjfrhrlk9cvcahqkdo',
    'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sgv/svzffqp07wkpzpga2cc5',
    'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sgv/p6ydhdoqw3wcouoijjsa',
    'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sgv/gpqoy4matzudueeuntjx',
    'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sgv/ehpxoyjsevns6gktuih7',
    'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sgv/wrajsnauszdnshvlbg9o',
    'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sgv/ltb0rpmcaa0b7sdfcpz0',
    'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sgv/gyw6vwacimgxhnwejqsb',
    'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sgv/ohjpik5rewpe5jfgk3pr',
    'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sgv/kwj7qnnvzsqlbrveoxkw',
    'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sgv/ktvrnqpd0qmehh9oassj',
    'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sgv/osz4gdaijlnjfqgcwvqb',
    'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sgv/bpsim4nqrocckm0umdpd',
    'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sgv/su8j3bv4cfvm062i1gcy',
  ];

  instruccionesTooltip = `
    1. Sube tu foto a un servicio como Postimages.
    2. Copia la URL de la imagen (debe terminar en .jpg, .png, etc.).
    3. Pega la URL en el campo "Foto (URL opcional)".
  `;

  ngOnInit(): void {
    this.loadTestimonios();
  }

  async loadTestimonios(): Promise<void> {
    try {
      const querySnapshot = await getDocs(collection(this.db, 'testimonios'));
      this.testimonios = querySnapshot.docs.map(
        (doc) => doc.data() as Testimonio
      );
    } catch (err) {
      console.error('Error al cargar los testimonios: ', err);
    }
  }

  async enviarTestimonio(): Promise<void> {
    // Validar antes de enviar
    this.mostrarErrorNombre = this.nuevoTestimonio.nombre.trim() === '';
    this.mostrarErrorComentario = this.nuevoTestimonio.comentario.trim() === '';

    if (!this.formularioValido) return;

    this.cargando = true;
    try {
      const testimonioConFecha = {
        ...this.nuevoTestimonio,
        fecha: new Date(),
      };

      await addDoc(collection(this.db, 'testimonios'), testimonioConFecha);
      this.mensaje = '¡Testimonio enviado con éxito!';
      await this.loadTestimonios();
      this.resetFormulario();
    } catch (err: unknown) {
      this.mensaje =
        err instanceof Error
          ? `Error al enviar el testimonio: ${err.message}`
          : 'Error desconocido al enviar el testimonio.';
    } finally {
      this.cargando = false;
    }
  }

  seleccionarAvatar(avatar: string): void {
    this.nuevoTestimonio.imagen_url = avatar;
    this.mostrarSelectorAvatares = false;
  }

  resetFormulario(): void {
    this.nuevoTestimonio = { nombre: '', comentario: '', imagen_url: '' };
    this.mostrarErrorNombre = false;
    this.mostrarErrorComentario = false;
  }

  get formularioValido(): boolean {
    return (
      this.nuevoTestimonio.nombre.trim() !== '' &&
      this.nuevoTestimonio.comentario.trim() !== ''
    );
  }

  camposCambiados(): void {
    if (!this.mostrarErrorNombre && !this.mostrarErrorComentario) return;

    // Solo actualiza los errores si ya estaban mostrándose
    if (this.mostrarErrorNombre) {
      this.mostrarErrorNombre = this.nuevoTestimonio.nombre.trim() === '';
    }
    if (this.mostrarErrorComentario) {
      this.mostrarErrorComentario =
        this.nuevoTestimonio.comentario.trim() === '';
    }
  }

  ngAfterViewInit(): void {
    this.loadTestimonios().then(() => {
      if (this.testimonios.length > 0) {
        setTimeout(() => {
          this.iniciarAnimacionCarrusel();
        }, 300);
      }
    });
  }

  private getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    const width = window.innerWidth;
    if (width <= 480) return 'mobile';
    if (width <= 768) return 'tablet';
    return 'desktop';
  }

  private isMobile(): boolean {
    return this.getDeviceType() === 'mobile';
  }

  private isTablet(): boolean {
    return this.getDeviceType() === 'tablet';
  }

  private iniciarAnimacionCarrusel(): void {
    if (!this.carruselElement?.nativeElement) return;

    const deviceType = this.getDeviceType();

    if (deviceType === 'mobile') {
      this.animarCarruselConJS();
    } else {
      this.activarAnimacionCSS();
    }
  }

  private activarAnimacionCSS(): void {
    const carrusel = this.carruselElement.nativeElement;
    carrusel.style.animation = 'none';
    void carrusel.offsetHeight; // Trigger reflow

    if (this.isTablet()) {
      carrusel.style.animation = 'desplazar 80s linear infinite';
    } else {
      carrusel.style.animation = 'desplazar 60s linear infinite';
    }
  }

  private animarCarruselConJS(): void {
    const carrusel = this.carruselElement.nativeElement;
    const container = carrusel.parentElement;
    const velocidad = 0.8;
    let posicion = 0;
    let animacionId: number;

    setTimeout(() => {
      const testimonios = Array.from(
        carrusel.querySelectorAll('.testimonio')
      ) as HTMLElement[];
      let totalWidth = testimonios.reduce((sum, testimonio) => {
        const style = window.getComputedStyle(testimonio);
        const margin =
          parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        return sum + testimonio.offsetWidth + margin;
      }, 0);

      carrusel.innerHTML = '';
      testimonios.forEach((t) => carrusel.appendChild(t.cloneNode(true)));
      carrusel.style.width = `${totalWidth * 2}px`;

      const animar = () => {
        posicion -= velocidad;
        if (posicion <= -totalWidth) {
          posicion = 0;
        }
        carrusel.style.transform = `translateX(${posicion}px)`;
        animacionId = requestAnimationFrame(animar);
      };

      animacionId = requestAnimationFrame(animar);
      container?.addEventListener('touchstart', () =>
        cancelAnimationFrame(animacionId)
      );
      container?.addEventListener(
        'touchend',
        () => (animacionId = requestAnimationFrame(animar))
      );
    }, 100);
  }
}

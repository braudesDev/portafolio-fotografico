import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-gallery',
    imports: [RouterModule, CommonModule, MatIconModule],
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  // Definimos la estructura de las imágenes
  images = [
    {
      title: 'Bodas',
      albums: [
        {
          id: '1', // Agrega un ID único para cada álbum
          name: 'Boda de Alondra y Luis',
          photos: [
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/gczawnuavntxnuycsfsd', alt: 'Hermoso paisaje 1' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/noaojucepbeih7xrqr9n', alt: 'Hermoso paisaje 2' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/ajksbg6pse9m1epbuirq', alt: 'Hermoso paisaje 3' }
          ]
        },
        {
          id: '2', // Agrega un ID único para cada álbum
          name: 'Boda de Paulina y Christian',
          photos: [
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/ccq3dl12ceaotykdbp75', alt: 'Imagen de boda' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/eha0qednduq4gigeb4pl', alt: 'Imagen de boda' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/yo7pyujif0p0ibbbzybe', alt: 'Imagen de boda' }
          ]
        }
      ]
    },
    {
      title: 'Xv anios',
      albums: [
        {
          id: '3', // Agrega un ID único para cada álbum
          name: 'Xvs de Ximena',
          photos: [
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvBrujita/japil54aowsrhop4gpfu', alt: 'Retrato de quinceanera' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvBrujita/vxl2uprkyre0wkf126xu', alt: 'Retrato de quinceanera' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvBrujita/j6rye6wtao3x3yk0usk9', alt: 'Retrato de quinceanera' }
          ]
        },
        {
          id: '4', // Agrega un ID único para cada álbum
          name: 'Xvs de Flor Nathalia',
          photos: [
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/lkn8s5hta4acrs7y85f7', alt: 'Retrato de quinceanera' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/zz35wqeun1qkkumvvhcw', alt: 'Retrato de una quinceanera' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/cxhw7mtlumufpwpruyoy', alt: 'Retrato de una quinceanera' }
          ]
        }
      ]
    },
    {
      title: 'Sesiones',
      albums: [
        {
          id: '5', // Agrega un ID único para cada álbum
          name: 'Andrea',
          photos: [
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/kd5uuj5czhtkn10dffnu', alt: 'Retrato de una persona 1' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/fozr8ili8hdy9fxa3uqo', alt: 'Retrato de una persona 2' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/se4juphdhiekdjynkv64', alt: 'Retrato de una persona 3' }
          ]
        },
        {
          id: '6', // Agrega un ID único para cada álbum
          name: 'Mariano',
          photos: [
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasMariano/cokx7svt235iiryfe7hi', alt: 'Retrato de una persona' },
            { url: '', alt: 'Retrato de una persona' },
            { url: '', alt: 'Retrato de una persona' }
          ]
        }
      ]
    },
  ];

  // Propiedad para controlar la visibilidad del indicador de scroll
  showScrollIndicator = true;

  constructor(private router: Router) {} // Inyecta el Router

  // Escucha el evento de scroll para mostrar u ocultar el indicador
  @HostListener('window:scroll', [])
  onScroll(): void {
    this.showScrollIndicator = window.scrollY < 50;
  }

  // Realiza un scroll suave hacia la galería
  scrollToContent(): void {
    document.querySelector('#gallery-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  // Método para navegar al detalle del álbum
  navigateToAlbum(albumId: string): void {
    this.router.navigate(['/album', albumId]); // Navega a la ruta del álbum
  }

  //Creamos la funcion para desplazar al inicio de la pagina
  scrollToTop() {
    window.scrollTo({
       top: 0, behavior:'smooth' // Desplazamiento suave
      });
  }
}

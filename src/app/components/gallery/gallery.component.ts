import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-gallery',
  standalone: true,
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
          name: 'Boda de Jesus y Maria',
          photos: [
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1741812223/portafolio-fotografico/tpba4mnsfsffcpv4grnm.png', alt: 'Paisaje montañoso' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1741812219/portafolio-fotografico/jndkzgk0orqbck3wtr7v.jpg', alt: 'Atardecer en la playa' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1741812219/portafolio-fotografico/wpkezvdesgw9akpybvmu.jpg', alt: 'Noche en el pueblo' }
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
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1741812225/portafolio-fotografico/ok19giw3dcceukshipbt.jpg', alt: 'Retrato de una persona 1' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1741812227/portafolio-fotografico/vya06jiidskyzq5millv.png', alt: 'Retrato de una persona 2' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1741812229/portafolio-fotografico/aa8vmhbkyfh2vsh3o59c.png', alt: 'Retrato de una persona 3' }
          ]
        },
        {
          id: '4', // Agrega un ID único para cada álbum
          name: 'Xvs de Lolita',
          photos: [
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1741812226/portafolio-fotografico/fhpwq5gih1folxh41yvr.jpg', alt: 'Retrato de una persona 3' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1741812227/portafolio-fotografico/sgpmyy3ocnpn5pqyiclc.jpg', alt: 'Retrato de una persona 4' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1741812229/portafolio-fotografico/npt8skkm9ccoovglpchu.png', alt: 'Retrato de una persona 5' }
          ]
        }
      ]
    },
    {
      title: 'Retratos',
      albums: [
        {
          id: '3', // Agrega un ID único para cada álbum
          name: 'Andrea',
          photos: [
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/kd5uuj5czhtkn10dffnu', alt: 'Retrato de una persona 1' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/fozr8ili8hdy9fxa3uqo', alt: 'Retrato de una persona 2' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/se4juphdhiekdjynkv64', alt: 'Retrato de una persona 3' }
          ]
        },
        {
          id: '4', // Agrega un ID único para cada álbum
          name: 'Mariano',
          photos: [
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1741812228/portafolio-fotografico/izfhn6jgwuqr6duwq0kx.png', alt: 'Hermoso paisaje 1' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1741812228/portafolio-fotografico/hql2eoeywrdvpc2qcvvc.jpg', alt: 'Hermoso paisaje 2' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1741812228/portafolio-fotografico/odqsdbcudoi5x8zri0zt.png', alt: 'Hermoso paisaje 3' }
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

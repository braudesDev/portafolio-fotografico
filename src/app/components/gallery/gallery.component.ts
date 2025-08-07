import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-gallery',
  imports: [RouterModule, CommonModule, MatIconModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
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
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/gczawnuavntxnuycsfsd',
              alt: 'Hermoso paisaje 1',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/noaojucepbeih7xrqr9n',
              alt: 'Hermoso paisaje 2',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/ajksbg6pse9m1epbuirq',
              alt: 'Hermoso paisaje 3',
            },
          ],
        },
        {
          id: '2', // Agrega un ID único para cada álbum
          name: 'Boda de Paulina y Christian',
          photos: [
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/ccq3dl12ceaotykdbp75',
              alt: 'Imagen de boda',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/eha0qednduq4gigeb4pl',
              alt: 'Imagen de boda',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/yo7pyujif0p0ibbbzybe',
              alt: 'Imagen de boda',
            },
          ],
        },
        {
          id: '3', // Agrega un ID único para cada álbum
          name: 'Boda de Santiago y Andrea',
          photos: [
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasBodaPapasDavid/izhnsezjifjxs0unrgju',
              alt: 'Imagen de boda',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasBodaPapasDavid/iyambz3e0o4jaz7u9f4l',
              alt: 'Imagen de boda',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasBodaPapasDavid/xyacx1ypkqwkcwmwhjif',
              alt: 'Imagen de boda',
            },
          ],
        },
        {
          id: '4',
          name: 'Boda de Citlali y Donovan',
          photos: [
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1754589811/29062025-DSC_4071_dqkkd3.webp',
              alt: 'Imagen de boda',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1754589810/29062025-DJI_0104_wmvsl3.webp',
              alt: 'Imagen de boda',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1754589810/19072025-DSC_0052_efdb9p.webp',
              alt: 'Imagen de boda',
            },
          ],
        },
      ],
    },
    {
      title: 'Xv años',
      albums: [
        {
          id: '5', // Agrega un ID único para cada álbum
          name: 'Xvs de Jareli',
          photos: [
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvBrujita/japil54aowsrhop4gpfu',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvBrujita/vxl2uprkyre0wkf126xu',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvBrujita/j6rye6wtao3x3yk0usk9',
              alt: 'Retrato de quinceanera',
            },
          ],
        },
        {
          id: '6', // Agrega un ID único para cada álbum
          name: 'Xvs de Nathalia',
          photos: [
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/lkn8s5hta4acrs7y85f7',
              alt: 'Retrato de una quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/zz35wqeun1qkkumvvhcw',
              alt: 'Retrato de una quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/cxhw7mtlumufpwpruyoy',
              alt: 'Retrato de una quinceanera',
            },
          ],
        },
      ],
    },
    {
      title: 'Sesiones',
      albums: [
        {
          id: '7', // Agrega un ID único para cada álbum
          name: 'Andrea',
          photos: [
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/kd5uuj5czhtkn10dffnu',
              alt: 'Retrato de una persona 1',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/fozr8ili8hdy9fxa3uqo',
              alt: 'Retrato de una persona 2',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/se4juphdhiekdjynkv64',
              alt: 'Retrato de una persona 3',
            },
          ],
        },
        {
          id: '8', // Agrega un ID único para cada álbum
          name: 'Mariano',
          photos: [
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasMariano/ysjyagr0qmudpiqx8tit',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasMariano/kvfeqzu9lurshsxqplhu',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasMariano/rqn2ordusfhozy5ajgnw',
              alt: 'Retrato de una persona',
            },
          ],
        },
        {
          id: '9',
          name: 'Christian',
          photos: [
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasChristian/gmv1yiaawtfacmyqpr7f',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasChristian/w9tmrkocixni7uevo5my',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasChristian/bqjwbsasf058tiztxbyc',
              alt: 'Retrato de una persona',
            },
          ],
        },
        {
          id: '10',
          name: 'Gabriela',
          photos: [
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasGaby/suxil3uau17qzxhulmfj',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasGaby/uozqdompcm9y08bryk7t',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasGaby/oo9eyjwsggvmtbi5nbpk',
              alt: 'Retrato de una persona',
            },
          ],
        },
      ],
    },
  ];

  // Propiedad para controlar la visibilidad del indicador de scroll
  showScrollIndicator = true;

  constructor(private router: Router, private seoService: SeoService) {} // Inyecta el Router

  // Ejemplo en galeria.component.ts
  ngOnInit(): void {
    this.seoService.setSeoData({
      pageTitle: 'Galería de Trabajos Recientes',
      description:
        'Portafolio de nuestras mejores sesiones en Irapuato. Bodas, retratos y más.',
      image:
        'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/qfxfxsdkntweoryf7mrl',
      urlPath: 'gallery', // Generará: https://onoffshot.com/galeria
    });
  }

  // Escucha el evento de scroll para mostrar u ocultar el indicador
  @HostListener('window:scroll', [])
  onScroll(): void {
    this.showScrollIndicator = window.scrollY < 50;
  }

  // Realiza un scroll suave hacia la galería
  scrollToContent(): void {
    document
      .querySelector('#gallery-section')
      ?.scrollIntoView({ behavior: 'smooth' });
  }

  // Método para navegar al detalle del álbum
  navigateToAlbum(albumId: string): void {
    this.router.navigate(['/album', albumId]); // Navega a la ruta del álbum
  }

  //Creamos la funcion para desplazar al inicio de la pagina
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Desplazamiento suave
    });
  }
}

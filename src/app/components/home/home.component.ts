import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import Typewriter from 'typewriter-effect/dist/core';


@Component({
    selector: 'app-home',
    imports: [
        CommonModule,
        RouterModule,
        MatToolbarModule,
        MatCardModule,
        MatGridListModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
    ],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  navHidden = false; // Controla si la barra de navegacion esta oculta
  isMenuOpen = false; //Controla si el menu hanburguesa esta abieto



  showScrollIndicator = true;

  // Arreglo de imágenes
  images = [
    {
      name: 'Bodas',
      mainImage: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/imagesHomeComprimidas/jopkatjkxpakzuacynim',
      hoverImage: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/imagesHomeComprimidas/v2km4a4nolybw1ymcjtn'
    },
    {
      name: 'XV Años',
      mainImage: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/imagesHomeComprimidas/w8ehkueph7tupfrebgqh',
      hoverImage: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/imagesHomeComprimidas/qcsigtzoemvcpcxe3afs'
    },
    {
      name: 'Retratos/Sesiones',
      mainImage: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/imagesHomeComprimidas/cuapkisa2v03oparzqgj',
      hoverImage: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/imagesHomeComprimidas/wlxnuuj67bvnmizimvy3'
    },

    //Agregamos mas imagenes cuando tengamos xd

    // {
    //   name: 'Comida/Comercial',
    //   mainImage: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1741812226/portafolio-fotografico/fhpwq5gih1folxh41yvr.jpg',
    //   hoverImage: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1741812227/portafolio-fotografico/sgpmyy3ocnpn5pqyiclc.jpg'
    // },
    {
      name: 'Bandas/Conciertos',
      mainImage: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/imperioEncartado/p2hlxftzcw4r1ftiohfg',
      hoverImage: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/imperioEncartado/hfz8m0xj8lyng9eciqzw'
    },
    // {
    //   name: 'Paisajes',
    //   mainImage: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1741812219/portafolio-fotografico/jndkzgk0orqbck3wtr7v.jpg',
    //   hoverImage: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1741812219/portafolio-fotografico/wpkezvdesgw9akpybvmu.jpg'
    // }
  ];



  @ViewChild('parallaxHeroImage', { static: false }) parallaxHeroImage!: ElementRef<HTMLImageElement>;

  ngAfterViewInit(): void {
  // Inicializa Typewriter.js
    const typewriter = new Typewriter('#typewriter-text', {
      strings: [
        'ON OFF SHOT',
        'Fotografía',
        'Profesional',
        'Creativa',
        'Auténtica',
        'Minimal',
        'Estilo',
        'Momentos',
        'Emoción',
        'Luz',
        'Sombra',
        'Tu esencia',
        'En foco',
        'Captura',
        'Retrato',
        'Arte visual'
      ],
      autoStart: true,
      loop: true,
    });


    const videos = document.querySelectorAll('video');

    videos.forEach((video) => {
      video.muted = true; // Asegura que siempre inicie silenciado
      video.play().catch((error) => console.log("Autoplay bloqueado:", error));
    });
}

// Array de videos
videoStates = [
  { id: 'video1', muted: true },
  { id: 'video2', muted: true }
];

toggleMute(video: HTMLVideoElement, id: string) {
  video.muted = !video.muted;
  const state = this.videoStates.find(s => s.id === id);
  if (state) state.muted = video.muted;
}

isMuted(id: string): boolean {
  const state = this.videoStates.find(s => s.id === id);
  return state ? state.muted : true;
}

  @HostListener('window:scroll', [])
  onScroll() {
    this.showScrollIndicator = window.scrollY < 50; // Ocultar la flecha al hacer scroll
  }

  scrollToContent() {
    const contentSection = document.querySelector('.content');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Crear una funcion para desplazar al inicio de la pagina
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Desplazamiento suave
    });
  }

}


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
  standalone: true,
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
      mainImage: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1741812226/portafolio-fotografico/djzndmb45hlhbvfyblyd.jpg',
      hoverImage: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1741812225/portafolio-fotografico/ok19giw3dcceukshipbt.jpg'
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
      strings: ['Braulio Rodríguez', 'Fotógrafo Profesional', 'Creativo', 'Apasionado'],
      autoStart: true,
      loop: true,
    });

    
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


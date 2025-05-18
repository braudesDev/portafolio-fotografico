
import { Component, AfterViewInit, ViewChild, ElementRef, HostListener, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import Typewriter from 'typewriter-effect/dist/core';
import { SeoService } from '../../services/seo.service';
import { AnalyticsService } from '../../services/analytics.service';

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
export class HomeComponent implements AfterViewInit, OnInit {

  navHidden = false;
  isMenuOpen = false;
  showScrollIndicator = true;
  videoStates = [
    { id: 'video1', muted: true },
    { id: 'video2', muted: true }
  ];

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

  constructor(private cdRef: ChangeDetectorRef, private seoService: SeoService, private analytics: AnalyticsService) {}

  onContactClick() {
    this.analytics.trackEvent('click_contacto', {
      buton_id: 'contacto_home',
      page_title: 'Home'
    })
  }

// Ejemplo en home.component.ts
ngOnInit(): void {
  this.seoService.setSeoData({
    pageTitle: 'Fotografía Profesional en Irapuato',
    description: 'Especialistas en bodas, quinceañeras y sesiones creativas. ¡6 años de experiencia!',
    keywords: 'fotógrafo Irapuato, sesiones de bodas, álbumes digitales',
    image: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1744682880/logotiposPortafolioFotografico/v7voslzcc1uz9f7tmpqg.png', // Ruta relativa
    urlPath: '' // Para la home no necesita path
  });
}

  ngAfterViewInit(): void {
    this.initializeTypewriter();
    this.initializeVideos();
    this.cdRef.detectChanges(); // Importante para evitar el error
  }

  private initializeTypewriter(): void {
    new Typewriter('#typewriter-text', {
      strings: [
        'ON OFF SHOT',
        'Fotografía',
        'Profesional',
        'Irapuato',
        'Bajio',
        'Creativa',
        'Auténtica',
        'Momentos',
        'Emoción',
        'Luz',
        'Sombra',
        'Tu esencia',
        'En foco',
        'Retrato',
      ],
      autoStart: true,
      loop: true,
    });
  }

  private initializeVideos(): void {
    setTimeout(() => {
      const videos = document.querySelectorAll('video');
      videos.forEach((video) => {
        video.muted = true;
        video.play().catch(error => console.log("Autoplay bloqueado:", error));
      });
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const newValue = window.scrollY < 50;
    if (this.showScrollIndicator !== newValue) {
      this.showScrollIndicator = newValue;
      this.cdRef.detectChanges(); // Notificar a Angular del cambio
    }
  }

  toggleMute(video: HTMLVideoElement, id: string): void {
    video.muted = !video.muted;
    const state = this.videoStates.find(s => s.id === id);
    if (state) {
      state.muted = video.muted;
      this.cdRef.detectChanges();
    }
  }

  isMuted(id: string): boolean {
    const state = this.videoStates.find(s => s.id === id);
    return state ? state.muted : true;
  }

  scrollToContent(): void {
    const contentSection = document.querySelector('.content');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}


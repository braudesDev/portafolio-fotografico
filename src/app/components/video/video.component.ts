import { Component } from '@angular/core';
import { SafeUrlPipe } from '../../safe-url.pipe'; // Asegúrate de que la ruta sea correcta
import { CommonModule

 } from '@angular/common';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [SafeUrlPipe, CommonModule],  // Importa el pipe aquí
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent {

  showScrollIndicator = true;
  selectedVideo: any = null;

  // Videos por categoría
  bodasVideos = [
    {
      title: 'Boda 1',
      url: 'https://www.youtube.com/embed/FXW01_U1jSA', //Se esta haciendo prueba solo con este por el momento
    },
    {
      title: 'Boda 2',
      url: 'https://www.youtube.com/embed/yyyyyy',
    }
  ];

  xvaniosVideos = [
    {
      title: 'XV Años 1',
      url: 'https://www.youtube.com/embed/zzzzzz',
    },
    {
      title: 'XV Años 2',
      url: 'https://www.youtube.com/embed/aaaaaa',
    }
  ];

  bautizosVideos = [
    {
      title: 'Bautizo 1',
      url: 'https://www.youtube.com/embed/bbbbbb',
    },
    {
      title: 'Bautizo 2',
      url: 'https://www.youtube.com/embed/ccccc',
    }
  ];


  loadVideo(video: any) {
    this.selectedVideo = video;
  }

  scrollToContent() {
    document.getElementById('bodas-section')?.scrollIntoView({ behavior: 'smooth' });
    this.showScrollIndicator = false; //Opcional: ocultar el indicador después de hacer scroll
  }
}

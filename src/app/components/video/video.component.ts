import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { SafeUrlPipe } from '../../safe-url.pipe';
import { CommonModule } from '@angular/common';
import Typewriter from 'typewriter-effect/dist/core';


//Interfaz para el tipo writetinte
interface Typewriter {
  //Definir los metodos que vamos a usar
  start(): void;
  stop(): void;
  //Agragar mas metodos si se necesitan
}

interface Video {
  title: string;
  url: string;
}

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [SafeUrlPipe, CommonModule],
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, AfterViewInit {
  // View Children
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  // Properties
  showScrollIndicator = true;
  selectedVideo: Video | null = null;

  // Video collections
  readonly bodasVideos: Video[] = [
    {
      title: 'Boda de Paulina y Christian',
      url: 'https://www.youtube.com/embed/FXW01_U1jSA'
    },
    {
      title: 'Boda de ejemplo 2',
      url: 'https://www.youtube.com/embed/yyyyyy'
    },
    {
      title: 'Boda de ejemplo 3',
      url: 'https://www.youtube.com/embed/zzzzzz'
    }
  ];

  readonly xvaniosVideos: Video[] = [
    {
      title: 'XV Años de ejemplo 1',
      url: 'https://www.youtube.com/embed/aaaaaa'
    },
    {
      title: 'XV Años de ejemplo 2',
      url: 'https://www.youtube.com/embed/bbbbbb'
    }
  ];

  readonly bautizosVideos: Video[] = [
    {
      title: 'Bautizo de ejemplo 1',
      url: 'https://www.youtube.com/embed/cccccc'
    },
    {
      title: 'Bautizo de ejemplo 2',
      url: 'https://www.youtube.com/embed/dddddd'
    }
  ];

  // Private properties
  private typewriter!: Typewriter;

  // Lifecycle hooks
  ngOnInit(): void {
    this.initializeTypewriter();
  }

  ngAfterViewInit(): void {
    this.initializeVideo();
  }

  // Public methods
  loadVideo(video: Video): void {
    this.selectedVideo = video;
  }

  scrollToContent(): void {
    document.getElementById('bodas-section')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  getVideoId(url: string): string {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  }

  trackById(index: number, video: Video): string {
    return this.getVideoId(video.url) || index.toString();
  }

  // Private methods
  private initializeTypewriter(): void {
    this.typewriter = new Typewriter('#typewriter-text', {
      strings: [
        'Videos que emocionan ',
        'Edición creativa ',
        'Cada detalle cuenta'
      ],
      autoStart: true,
      loop: true,
      delay: 75,
    });
  }

  private initializeVideo(): void {
    try {
      const video = this.videoPlayer.nativeElement;
      video.muted = true;
      video.play().catch(error => {
        console.error('Error al reproducir video:', error);
      });
    } catch (error) {
      console.error('Error al inicializar video:', error);
    }
  }
}

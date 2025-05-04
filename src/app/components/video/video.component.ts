import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { SafeUrlPipe } from '../../safe-url.pipe';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import Typewriter from 'typewriter-effect/dist/core';

interface Typewriter {
  start(): void;
  stop(): void;
}

interface Video {
  title: string;
  url: string;
}

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [SafeUrlPipe, CommonModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, AfterViewInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  // Propiedades de video
  videoSource = "https://res.cloudinary.com/drsyb53ae/video/upload/v1746390160/fotos-comprimidas/videos-codecs/oq5zziei4vgxewjwzju2.mp4";
  showPlayButton = false;
  showScrollIndicator = true;
  selectedVideo: Video | null = null;

  // Colecciones de videos
  readonly bodasVideos: Video[] = [
    {
      title: 'Boda de Paulina y Christian',
      url: 'https://www.youtube.com/embed/FXW01_U1jSA'
    },
    {
      title: 'Boda de Mirna y Luis',
      url: 'https://www.youtube.com/embed/v0p3TTt_qsQ'
    },
    // {
    //   title: 'Boda de ejemplo 3',
    //   url: 'https://www.youtube.com/embed/zzzzzz'
    // }
  ];

  readonly xvaniosVideos: Video[] = [
    {
      title: 'XV Años de Flor Nathalia',
      url: 'https://www.youtube.com/embed/eTeUraUAH2I'
    },
    // {
    //   title: 'XV Años de ejemplo 2',
    //   url: 'https://www.youtube.com/embed/bbbbbb'
    // }
  ];

  readonly bautizosVideos: Video[] = [
    // {
    //   title: 'Bautizo de ejemplo 1',
    //   url: 'https://www.youtube.com/embed/cccccc'
    // },
    // {
    //   title: 'Bautizo de ejemplo 2',
    //   url: 'https://www.youtube.com/embed/dddddd'
    // }
  ];

  private typewriter!: Typewriter;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initializeTypewriter();
  }

  ngAfterViewInit(): void {
    this.initializeVideo();
  }

  private isiPad(): boolean {
    const userAgent = navigator.userAgent.toLowerCase();
    const isSafari = /safari/.test(userAgent);
    const isIPad = /ipad|macintosh/.test(userAgent) && isSafari;
    const hasTouch = 'ontouchend' in document;
    return isIPad && hasTouch;
  }

  private async initializeVideo(): Promise<void> {
    try {
      const video = this.videoPlayer.nativeElement;

      if (this.isiPad()) {
        this.videoSource = "https://res.cloudinary.com/drsyb53ae/video/upload/v1746390160/fotos-comprimidas/videos-codecs/oq5zziei4vgxewjwzju2.mp4";
        this.changeDetector.detectChanges();
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      video.muted = true;
      video.playsInline = true;

      const playVideo = async () => {
        try {
          await video.play();
          this.showPlayButton = false;
        } catch (err) {
          console.warn('Autoplay falló, mostrando botón de reproducción:', err);
          this.showPlayButton = true;
          this.changeDetector.detectChanges();
        }
      };

      if (video.readyState >= 3) {
        await playVideo();
      } else {
        const loadedHandler = () => {
          video.removeEventListener('loadeddata', loadedHandler);
          playVideo();
        };
        video.addEventListener('loadeddata', loadedHandler);
      }
    } catch (error) {
      console.error('Error en initializeVideo:', error);
      this.showPlayButton = true;
    }
  }

  playVideo(): void {
    this.videoPlayer.nativeElement.play()
      .then(() => this.showPlayButton = false)
      .catch(err => console.error('Error al reproducir manualmente:', err));
  }

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

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

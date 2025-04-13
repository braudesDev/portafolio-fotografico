import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-album',
    imports: [CommonModule, NgOptimizedImage], //Aniadimos para optimizar imagenes
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  album: { id: string; name: string; photos: { url: string; alt: string }[] } | undefined;
  currentImageIndex: number = 0;
  showModal: boolean = false;

  @ViewChild('modal', { static: false }) modalRef!: ElementRef;
  @ViewChild('imagenModal', { static: false }) modalImgRef!: ElementRef<HTMLImageElement>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtener el ID del álbum desde la URL
    const albumId = this.route.snapshot.paramMap.get('id');

    // Cargar el álbum correspondiente
    this.loadAlbum(albumId);
  }

  loadAlbum(albumId: string | null): void {
    if (albumId) {

      // Simulación: Buscar el álbum en un arreglo (puedes usar un servicio real)
      const albums = [
        {
          id: '1',
          name: 'Alondra y Luis',
          photos: [
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1742239501/fotos-comprimidas/gczawnuavntxnuycsfsd.webp', alt: '1' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1742239502/fotos-comprimidas/noaojucepbeih7xrqr9n.webp', alt: '2' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/ajksbg6pse9m1epbuirq', alt: '3' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sfai1yjxd70n1plvjskq', alt: '4' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/m37xmjtgajmmokvnrqoa', alt: '5' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/ru9srh4o2nwphghd4sni', alt: '6' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/o7m1b1rimxxwkfccheil', alt: '7' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/cwzc5kkmztdlfkhmnqxb', alt: '8' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/dbypxrqfyldihqqcwdev', alt: '9' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/etpyolqei80npuk86upt', alt: '10' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/pfuwwr8bdjajhbbby45z', alt: '11' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/e6ksqqetzs3xaumdvnlx', alt: '12' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/oyt1rqnw8g39vrjcixlx', alt: '13' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/ituwuzmsgvqeetldiqoc', alt: '14' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/lgqcxcfgqgognmdvjozw', alt: '15' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xsx0vokqotbvpddloupb', alt: '16' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/ixwj5q4n5h9zsj9efvw8', alt: '17' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/dxxvrsix3reizxmnjnqn', alt: '18' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/jic4dm9thk68ojhshgr0', alt: '19' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/clv5kow6amipbf8xranf', alt: '20' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/ylghsdorhalsqe1t5zpt', alt: '21' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/qwtgqp1f6d8ue1chhigs', alt: '22' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/b5up48vsuexlpqhiaiew', alt: '23' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/asajzosjaxtjwclfp9pj', alt: '24' },
          ]
        },
        {
          id: '2',
          name: 'Paulina y Christian',
          photos: [
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/yo7pyujif0p0ibbbzybe', alt: 'Imagen de Boda' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/eha0qednduq4gigeb4pl', alt: 'Imagen de Boda' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/ccq3dl12ceaotykdbp75', alt: 'Imagen de Boda' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/ijov9tsfhqlor9comzgg', alt: 'Imagen de Boda' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/kpxc7fvb2zpivsmvata8', alt: 'Imagen de Boda' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/vqmcclfgg0fqqayctc43', alt: 'Imagen de Boda' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/ycgvu5ioqdupuqdo1nkr', alt: 'Imagen de Boda' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/umnhyd8odky8hlfvuj4v', alt: 'Imagen de Boda' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/vl0ycflhzir8hm9qtmci', alt: 'Imagen de Boda' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/sdtndcjxua2vozsjacrz', alt: 'Imagen de Boda' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/e92imbjv0l7ie65jyrpe', alt: 'Imagen de Boda' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/wbfmpiscp9vhdhu1w6mj', alt: 'Imagen de Boda' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/wyhjwolxczeddfqegd1u', alt: 'Imagen de Boda' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/z676gmddknibxjfxl1as', alt: 'Imagen de Boda' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/ofelkq8tv03miubgsysq', alt: 'Imagen de Boda' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/qewld4t2ztksjrcnflin', alt: 'Imagen de Boda' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/bpwa8ngsaced2kbz9job', alt: 'Imagen de Boda' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/auq4jcgyqo2g0lzcricc', alt: 'Imagen de Boda' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/kpxc7fvb2zpivsmvata8', alt: 'Imagen de Boda' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/q1fx8algtxrojoccl9tq', alt: 'Imagen de Boda' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/kwzl7rgqhyqvuf7meisy', alt: 'Imagen de Boda' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/xcnmxg9omqriemy3sa4s', alt: 'Imagen de Boda' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/qfxfxsdkntweoryf7mrl', alt: 'Imagen de Boda' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/tiejrk5pwimq2btd3fuu', alt: 'Imagen de Boda' },
          ]
        },
        {
          id: '5',
          name: 'Andrea',
          photos: [
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/kd5uuj5czhtkn10dffnu', alt: 'Retrato de una persona 1' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/fozr8ili8hdy9fxa3uqo', alt: 'Retrato de una persona 2' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/se4juphdhiekdjynkv64', alt: 'Retrato de una persona 3' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/jpm2tephjpvdvx16egco', alt: 'Retrato de una persona 4' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/ivun1uosi7lg6gxtgrss', alt: 'Retrato de una persona 5' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/l70gdqymmrxwr08swzll', alt: 'Retrato de una persona 6' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/jkkybcgu0izneinnyemj', alt: 'Retrato de una persona 7' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/eh0saxvjm2o4ttrohwxe', alt: 'Retrato de una persona 8' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/oaaviufkqarsypj6fbxy', alt: 'Retrato de una persona 9' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/cn6ok6wbaqhzqgumwhvt', alt: 'Retrato de una persona 10' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/ake5jrkm0muoy8fthqug', alt: 'Retrato de una persona 11' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/l35wqxpuakeun3wehdns', alt: 'Retrato de una persona 12' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/fyzxvjpddq57srhp9icc', alt: 'Retrato de una persona 13' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/nwjunmvosl1yn1zz7dju', alt: 'Retrato de una persona 14' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/rhokwm4uiqbes7zm9dml', alt: 'Retrato de una persona 15' },
            { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/ldshc7tumohrqtpcajlo', alt: 'Retrato de una persona 16' },

          ]
        }
      ];
      this.album = albums.find(album => album.id === albumId);
    }
  }

  isImageVertical(imageUrl: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        resolve(img.height > img.width); // True si es vertical, false si es horizontal
      };
    });
  }

  async openModal(imageIndex: number): Promise<void> {
    this.currentImageIndex = imageIndex;
    this.showModal = true;

    const imageUrl = this.album!.photos[imageIndex].url;
    const isVertical = await this.isImageVertical(imageUrl);

    // Ajustar el modal según la orientación de la imagen
    if (isVertical) {
      // Modal para imágenes verticales
      this.modalImgRef.nativeElement.classList.add('vertical');
      this.modalImgRef.nativeElement.classList.remove('horizontal');
    } else {
      // Modal para imágenes horizontales
      this.modalImgRef.nativeElement.classList.add('horizontal');
      this.modalImgRef.nativeElement.classList.remove('vertical');
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

  prevImage(event: MouseEvent): void {
    event.stopPropagation(); // Evita que el click se propague al modal
    if (this.album?.photos && this.currentImageIndex > 0) {
      this.currentImageIndex--;  // Solo va a la imagen anterior si no está en la primera imagen
    }
  }

  nextImage(event: MouseEvent): void {
    event.stopPropagation(); // Evita que el click se propague al modal
    if (this.album?.photos && this.currentImageIndex < this.album.photos.length - 1) {
      this.currentImageIndex++;  // Solo va a la imagen siguiente si no está en la última imagen
    }
  }


  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }

  toggleZoom(event: MouseEvent): void {
    event.stopPropagation();//Evitamos que el click se rpopague al modal
    this.modalImgRef.nativeElement.classList.toggle('zoomed');
  }
}

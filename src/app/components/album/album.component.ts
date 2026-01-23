import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { idToken } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  imports: [CommonModule, NgOptimizedImage], //Aniadimos para optimizar imagenes
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit {
  album:
    | { id: string; name: string; photos: { url: string; alt: string }[] }
    | undefined;
  currentImageIndex: number = 0;
  showModal: boolean = false;

  @ViewChild('modal', { static: false }) modalRef!: ElementRef;
  @ViewChild('imagenModal', { static: false })
  modalImgRef!: ElementRef<HTMLImageElement>;

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
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1742239501/fotos-comprimidas/gczawnuavntxnuycsfsd.webp',
              alt: '1',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1742239502/fotos-comprimidas/noaojucepbeih7xrqr9n.webp',
              alt: '2',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/ajksbg6pse9m1epbuirq',
              alt: '3',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sfai1yjxd70n1plvjskq',
              alt: '4',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/m37xmjtgajmmokvnrqoa',
              alt: '5',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/ru9srh4o2nwphghd4sni',
              alt: '6',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/o7m1b1rimxxwkfccheil',
              alt: '7',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/cwzc5kkmztdlfkhmnqxb',
              alt: '8',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/dbypxrqfyldihqqcwdev',
              alt: '9',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/etpyolqei80npuk86upt',
              alt: '10',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/pfuwwr8bdjajhbbby45z',
              alt: '11',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/e6ksqqetzs3xaumdvnlx',
              alt: '12',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/oyt1rqnw8g39vrjcixlx',
              alt: '13',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/ituwuzmsgvqeetldiqoc',
              alt: '14',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/lgqcxcfgqgognmdvjozw',
              alt: '15',
            },
          ],
        },
        {
          id: '2',
          name: 'Paulina y Christian',
          photos: [
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/yo7pyujif0p0ibbbzybe',
              alt: 'Imagen de Boda',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/eha0qednduq4gigeb4pl',
              alt: 'Imagen de Boda',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/ccq3dl12ceaotykdbp75',
              alt: 'Imagen de Boda',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/ijov9tsfhqlor9comzgg',
              alt: 'Imagen de Boda',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/kpxc7fvb2zpivsmvata8',
              alt: 'Imagen de Boda',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/vqmcclfgg0fqqayctc43',
              alt: 'Imagen de Boda',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/ycgvu5ioqdupuqdo1nkr',
              alt: 'Imagen de Boda',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/umnhyd8odky8hlfvuj4v',
              alt: 'Imagen de Boda',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/vl0ycflhzir8hm9qtmci',
              alt: 'Imagen de Boda',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/sdtndcjxua2vozsjacrz',
              alt: 'Imagen de Boda',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/e92imbjv0l7ie65jyrpe',
              alt: 'Imagen de Boda',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/wbfmpiscp9vhdhu1w6mj',
              alt: 'Imagen de Boda',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/wyhjwolxczeddfqegd1u',
              alt: 'Imagen de Boda',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/z676gmddknibxjfxl1as',
              alt: 'Imagen de Boda',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasPaulinaYChristian/ofelkq8tv03miubgsysq',
              alt: 'Imagen de Boda',
            },
          ],
        },
        {
          id: '3',
          name: 'Santiago y Andrea',
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
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasBodaPapasDavid/rnnchgameubny80u3ytp',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasBodaPapasDavid/jkg62nzelxcjqsa12ls6',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasBodaPapasDavid/v0e95xynw7wkdtjp8o2t',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasBodaPapasDavid/mcnrs9foqbhtfaohgdry',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasBodaPapasDavid/fajcmihjuccltir7met7',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasBodaPapasDavid/fihpue7mnba7v4hyml6r',
              alt: 'Retrato de una persona',
            },
          ],
        },
        {
          id: '4',
          name: 'Clitlali y Donovan',
          photos: [
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1754589811/29062025-DSC_4071_dqkkd3.webp',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1754589810/29062025-DJI_0104_wmvsl3.webp',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1754589810/19072025-DSC_0052_efdb9p.webp',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1754589812/29062025-DSC_4125_cuyzax.webp',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1754589812/29062025-DSC_4139_fbqyqi.webp',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1754589811/29062025-DSC_4097_hiquyc.webp',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1754589811/29062025-DSC_4081_neczgc.webp',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1754589811/19072025-DSC_0077_rjclhc.webp',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1754589811/29062025-DSC_4078_s8kbr0.webp',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1754589810/19072025-DSC_0073_m8opzk.webp',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1754589809/19072025-DSC_0023_jtz2ft.webp',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1754589809/19072025-DSC_0034_sh4siw.webp',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1754589809/19072025-DSC_0010_zwaing.webp',
              alt: 'Retrato de quinceanera',
            },
          ],
        },
        {
          id: '5',
          name: 'Lucero y Omar',
          photos: [
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1768718926/luceroServices_hott6d.webp',
              alt: 'Foto de una pareja de novios',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1768718918/paraAlbumGaleria2_fupqip.webp',
              alt: 'Foto de una pareja de novios',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1768718914/paraAlbumGaleria7_xr45ta.webp',
              alt: 'Foto de una pareja de novios',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1768718930/lucero_ksmg05.webp',
              alt: 'Foto de una pareja de novios',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1768718907/paraAlbumGaleria3_jfn8j1.webp',
              alt: 'Foto de una pareja de novios',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1768718900/paraAlbumGaleria9_vfofug.webp',
              alt: 'Foto de una pareja de novios',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1768718892/paraAlbumGaleria15_qw464v.webp',
              alt: 'Foto de una pareja de novios',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1768718891/paraAlbumGaleria14_uomlax.webp',
              alt: 'Foto de una pareja de novios',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1768718868/paraAlbumGaleria13_kinntd.webp',
              alt: 'Foto de una pareja de novios',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1768718861/paraAlbumGaleria11_u4upbw.webp',
              alt: 'Foto de una pareja de novios',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1768718860/paraAlbumGaleria10_wzhuim.webp',
              alt: 'Foto de una pareja de novios',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1768718860/paraAlbumGaleria_epihcf.webp',
              alt: 'Foto de una pareja de novios',
            },
          ],
        },
        {
          id: '6',
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
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvBrujita/jvdl19mwh74er7q3y3n0',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvBrujita/fpwqnwqc9erwq7i5otaa',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvBrujita/jhkna6sszm3hbp4xx3oi',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvBrujita/ihlbqrgkzly5xngnok7w',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvBrujita/d0xlnt9sxkrdz2mavuy7',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvBrujita/plj9fsi8efthftrrpoy3',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvBrujita/uw5eeseiqtecnkq5lbne',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvBrujita/wbuetpmdafpforwoixvx',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvBrujita/fvw3xocq2lhlenxasfv5',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvBrujita/mddxbexq74nfku5edeby',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvBrujita/zivi2pynyct0ga6t7ffb',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvBrujita/zmuc6vgvrumm4ysqq25b',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvBrujita/cpbpdr4p7jbrvwk4hzvb',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvBrujita/v2osn9evrp0aqsi1fotg',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvBrujita/caetzgcpjqtfaqm3b4qh',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvBrujita/vreu78dyidokcoqzvlsy',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvBrujita/fqiah9qjsyxzmwavdsdj',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvBrujita/jq2hbdylmjibkfy0geyr',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvBrujita/ubamta2vye2tzpudmg0v',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvBrujita/h39oygndrt2qavm54ivj',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvBrujita/gytry1iud7lwmziq9k6a',
              alt: 'Retrato de quinceanera',
            },
          ],
        },
        {
          id: '7',
          name: 'Xvs de Flor Nathalia',
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
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/l1tzusy3pwoldstmnqja',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/to6supzcffpt7uaovzkf',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/mbwk28hfj4s1ukg8wo4f',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/vd6mqqstagrib4fqpwht',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/mprxs3lxggk96clf5cq7',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/ox51g34xxvdjole0fjh4',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/fumyqs1dhcd54h40ztuj',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/qyubnglwnkohenqwx1dj',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/mfqrewqxmou9qqpodt3h',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/jammt1wbpdckwjldl0qr',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/v81qcrifmayolijgrvuc',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/t1mzkjtlxobooaasmmm6',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/q0yt9rktjbtxh5pql7rq',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/wcssk7gl4jyyz7jxfdeb',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/puse8ls9qwlwh1jigons',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/haaaekucbvbkz9nn1pue',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/mtceaylavfzrnwkftjyz',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/qzbq09arkbtoxtiyjmkf',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/rjhey9xvnpziaqjnrvzf',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/j4hnqk4ndulpxzrch3a9',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/gd10qrma0zufw56xa7vg',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/h0q5zqdh66377rlywdiu',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/gghfqyvpsb120v1husag',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/xbevdzhpd7acxq1afbya',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/gzrdke3izgbzbfugwwtk',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/iwqysrvunwyhs60iil2v',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/tehzlsvguylxewfgunma',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/tehzlsvguylxewfgunma',
              alt: 'Retrato de quinceanera',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/xvAniosMalvas/zpmlgiujlm1rzcoh2tio',
              alt: 'Retrato de quinceanera',
            },
          ],
        },
        {
          id: '8',
          name: 'Osvaldo',
          photos: [
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1768787181/paraAlbumOsvaldo1_q6fsod.webp',
              alt: 'Retrato de osvaldo',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1768787181/paraAlbumOsvaldo4_jsm7uh.webp',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1768787191/paraAlbumOsvaldo6_tbrrse.webp',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1768787204/paraAlbumOsvaldo3_iwewug.webp',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1768787205/paraAlbumOsvaldo2_hnvwpx.webp',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1768787185/paraAlbumOsvaldo12_gnqhxc.webp',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1768787183/paraAlbumOsvaldo11_rgatmb.webp',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1768787189/paraAlbumOsvaldo7_muqvlw.webp',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1768787192/paraAlbumOsvaldo8_drbl5k.webp',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1768787195/paraAlbumOsvaldo13_k0d581.webp',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1768787200/paraAlbumOsvaldo10_njsggt.webp',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1768787208/paraAlbumOsvaldo9_eo3jy4.webp',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1768787199/paraAlbumOsvaldo15_evtuhu.webp',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1768787196/paraAlbumOsvaldo14_fopbt6.webp',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1768787187/paraAlbumOsvaldo5_an2pt1.webp',
              alt: 'Retrato de una persona',
            },
          ],
        },
        {
          id: '9',
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
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/jpm2tephjpvdvx16egco',
              alt: 'Retrato de una persona 4',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/ivun1uosi7lg6gxtgrss',
              alt: 'Retrato de una persona 5',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/l70gdqymmrxwr08swzll',
              alt: 'Retrato de una persona 6',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/jkkybcgu0izneinnyemj',
              alt: 'Retrato de una persona 7',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/eh0saxvjm2o4ttrohwxe',
              alt: 'Retrato de una persona 8',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/oaaviufkqarsypj6fbxy',
              alt: 'Retrato de una persona 9',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/cn6ok6wbaqhzqgumwhvt',
              alt: 'Retrato de una persona 10',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/ake5jrkm0muoy8fthqug',
              alt: 'Retrato de una persona 11',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/l35wqxpuakeun3wehdns',
              alt: 'Retrato de una persona 12',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/fyzxvjpddq57srhp9icc',
              alt: 'Retrato de una persona 13',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/nwjunmvosl1yn1zz7dju',
              alt: 'Retrato de una persona 14',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasAndrea/rhokwm4uiqbes7zm9dml',
              alt: 'Retrato de una persona 15',
            },
          ],
        },
        {
          id: '10',
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
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasMariano/gljkbl8atwbouwmbw7fg',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasMariano/cokx7svt235iiryfe7hi',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasMariano/y99b0fvan4pvnmcmbcnn',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasMariano/opph6u5ngyxnb1sgx1j9',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasMariano/vkshtru8z1vdic92t9gn',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasMariano/uj9opaq0uphuwzhzgpkq',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasMariano/aq9qt0mvvb6mdm8secxl',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasMariano/tqk5qd7ed6plf5tv4so3',
              alt: 'Retrato de una persona',
            },
          ],
        },
        {
          id: '11',
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
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasChristian/tn6aokfmzpskaoocxgeb',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasChristian/n6ahia6dyp24hhj4cobe',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasChristian/mwpdofdo9ehloycq1ok5',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasChristian/pd2hsqktip0nrixcjcmg',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasChristian/zpyvzs3jejmudvwhwwbs',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasChristian/krxizbtuybolicfodx2s',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasChristian/rodg5djjidbstutgashz',
              alt: 'Retrato de una persona',
            },
          ],
        },
        {
          id: '12',
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
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasGaby/drsgccp12sxx7b8ugkbx',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasGaby/mdtsn98varyg9a5rl8ar',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasGaby/yoekl3qfxmvo0cgohpyv',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasGaby/gzaoxzha88m2nrnvnfiq',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasGaby/rqnllbwcmkh9gg1r8svy',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasGaby/z1ykx2vuzofhzuwwsjyf',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasGaby/gy1qggmmxud3rmtpckqo',
              alt: 'Retrato de una persona',
            },
            {
              url: 'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/comprimidasGaby/wkcdrccxqyugrfygk1aj',
              alt: 'Retrato de una persona',
            },
          ],
        },
      ];
      this.album = albums.find((album) => album.id === albumId);
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
      this.currentImageIndex--; // Solo va a la imagen anterior si no está en la primera imagen
    }
  }

  nextImage(event: MouseEvent): void {
    event.stopPropagation(); // Evita que el click se propague al modal
    if (
      this.album?.photos &&
      this.currentImageIndex < this.album.photos.length - 1
    ) {
      this.currentImageIndex++; // Solo va a la imagen siguiente si no está en la última imagen
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }

  toggleZoom(event: MouseEvent): void {
    event.stopPropagation(); //Evitamos que el click se rpopague al modal
    this.modalImgRef.nativeElement.classList.toggle('zoomed');
  }
}

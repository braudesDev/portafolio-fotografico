import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { TestimoniosService } from '../../servicios/testimonios.service';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Testimonio } from '../../interfaces/testimonio.interface';
import { addDoc, collection } from 'firebase/firestore'; // Importa Firestore si lo vas a usar
import { FirebaseApp } from '@angular/fire/app';
import { environment } from './../../../enviroments/enviroment';
import { initializeApp } from 'firebase/app';  // Importa initializeApp de firebase
import { getFirestore } from 'firebase/firestore';  // Importa Firestore si lo vas a usar
import { getDocs } from 'firebase/firestore'; // Importa Firestore si lo vas a usar



@Component({
  selector: 'app-testimonios',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIcon,
    MatTooltipModule,
  ],
  templateUrl: './testimonios.component.html',
  styleUrls: ['./testimonios.component.css']
})

export class TestimoniosComponent implements OnInit {

  // Inicializa Firebase
  private FirebaseApp = initializeApp(environment.firebaseConfig); // Inicializamos firebase con nuestra configuracion
  private db = getFirestore(this.FirebaseApp); // Obtenemos firestore

  // Tipamos las variables
  testimonios: Testimonio[] = [];
  nuevoTestimonio: Omit<Testimonio, 'id' | 'fecha'> = {
  nombre: '',
  comentario: '',
  imagen_url: ''
  };
  mensaje = '';
  mostrarSelectorAvatares = false; // Controla la visibilidad del selector de avatares
  cargando = false;
  //lista de avatares predeterminados
  avatares: string[] = [
     'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sgv/cusmeaakt5okr48fremr',
     'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sgv/eamjfrhrlk9cvcahqkdo',
     'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sgv/svzffqp07wkpzpga2cc5',
     'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sgv/p6ydhdoqw3wcouoijjsa',
     'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sgv/gpqoy4matzudueeuntjx',
     'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sgv/ehpxoyjsevns6gktuih7',
     'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sgv/wrajsnauszdnshvlbg9o',
     'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sgv/ltb0rpmcaa0b7sdfcpz0',
     'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sgv/gyw6vwacimgxhnwejqsb',
     'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sgv/ohjpik5rewpe5jfgk3pr',
     'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sgv/kwj7qnnvzsqlbrveoxkw',
     'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sgv/ktvrnqpd0qmehh9oassj',
     'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sgv/osz4gdaijlnjfqgcwvqb',
     'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sgv/bpsim4nqrocckm0umdpd',
     'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/fotos-comprimidas/sgv/su8j3bv4cfvm062i1gcy'
  ]

  instruccionesTooltip = `
    1. Sube tu foto a un servicio como Imgur o Postimages.
    2. Copia la URL de la imagen (debe terminar en .jpg, .png, etc.).
    3. Pega la URL en el campo "Foto (URL opcional)".
  `;



  ngOnInit(): void {
    this.loadTestimonios();
  }
  // Método para cargar los testimonios desde Firestore
  async loadTestimonios(): Promise<void> {
    try {
      const querySnapshot = await getDocs(collection(this.db, 'testimonios'));
      this.testimonios = querySnapshot.docs.map(doc => doc.data() as Testimonio);
    } catch (err) {
      console.error("Error al cargar los testimonios: ", err);
    }
  }

  // Método para agregar un testimonio usando Firestore
  async enviarTestimonio(): Promise<void> {
    this.cargando = true;
    try {
      const testimonioConFecha = {
        ...this.nuevoTestimonio,
        fecha: new Date()
      };
      const docRef = await addDoc(collection(this.db, 'testimonios'), testimonioConFecha);
      this.mensaje = 'Testimonio enviado correctamente.';
      this.loadTestimonios(); // Recargar la lista de testimonios
      this.nuevoTestimonio = { nombre: '', comentario: '', imagen_url: '' }; // Limpiar el formulario
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.mensaje = `Error al enviar el testimonio: ${err.message}`;
      } else {
        this.mensaje = 'Error desconocido al enviar el testimonio.';
      }
    } finally {
      this.cargando = false;
    }
  }


  seleccionarAvatar(avatar: string): void {
    this.nuevoTestimonio.imagen_url = avatar;
    this.mostrarSelectorAvatares = false;
  }
}

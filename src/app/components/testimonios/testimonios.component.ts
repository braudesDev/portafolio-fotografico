import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule aquí
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí
import { TestimoniosService } from '../../servicios/testimonios.service';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Testimonio } from '../../interfaces/testimonio.interface'; // Importa la interfaz Testimonio


@Component({
  selector: 'app-testimonios',
  standalone: true, // Indica que el componente es standalone
  imports: [FormsModule, CommonModule, MatIcon, MatTooltipModule], // Añades FormsModule aquí
  templateUrl: './testimonios.component.html',
  styleUrls: ['./testimonios.component.css']
})



export class TestimoniosComponent implements OnInit {


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

  constructor(private testimoniosService: TestimoniosService) {}

  ngOnInit(): void {
    this.loadTestimonios();
  }

  loadTestimonios(): void {
    this.testimoniosService.getTestimonios().subscribe(data => {
      this.testimonios = data;
    });
  }

  enviarTestimonio(): void {
    this.cargando = true;
    this.testimoniosService.addTestimonio(this.nuevoTestimonio).subscribe({
      next: () => {
        this.mensaje = 'Testimonio enviado correctamente.';
        this.loadTestimonios();
        this.nuevoTestimonio = { nombre: '', comentario: '', imagen_url: '' };
        this.cargando = false;
      },
      error: (err) => {
        this.mensaje = `Error al enviar el testimonio: ${err.message}`;
        this.cargando = false;
      }
    });
  }

  editarTestimonio(id: number, testimonio: Testimonio): void {
    this.testimoniosService.updateTestimonio(id, testimonio).subscribe(response => {
      this.mensaje = 'Testimonio actualizado correctamente.';
      this.loadTestimonios(); // Recargar la lista de testimonios
    }, error => {
      this.mensaje = 'Error al actualizar el testimonio.';
    });
  }

  eliminarTestimonio(id: number): void {
    this.testimoniosService.deleteTestimonio(id).subscribe(response => {
      this.mensaje = 'Testimonio eliminado correctamente.';
      this.loadTestimonios(); // Recargar la lista de testimonios
    }, error => {
      this.mensaje = 'Error al eliminar el testimonio.';
    });
  }

  seleccionarAvatar(avatar: string): void {
    this.nuevoTestimonio.imagen_url = avatar; //Asignar el avatar seleccionado
    this.mostrarSelectorAvatares = false; // Ocultar el selector de avatareas
  }

}

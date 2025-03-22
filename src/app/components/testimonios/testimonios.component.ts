import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule aquí
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí
import { TestimoniosService } from '../../servicios/testimonios.service';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-testimonios',
  standalone: true, // Indica que el componente es standalone
  imports: [FormsModule, CommonModule, MatIcon, MatTooltipModule], // Añades FormsModule aquí
  templateUrl: './testimonios.component.html',
  styleUrls: ['./testimonios.component.css']
})
export class TestimoniosComponent implements OnInit {
  testimonios: any[] = [];
  nuevoTestimonio = { nombre: '', comentario: '', imagen_url: '' };
  mensaje = '';
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
    console.log("DAtos enviados", this.nuevoTestimonio);

    this.testimoniosService.addTestimonio(this.nuevoTestimonio).subscribe(response => {
      this.mensaje = 'Testimonio enviado correctamente.';
      this.loadTestimonios(); // Recargar la lista de testimonios
      this.nuevoTestimonio = { nombre: '', comentario: '', imagen_url: '' }; // Limpiar el formulario
    }, error => {
      this.mensaje = 'Error al enviar el testimonio.';
    });
  }

  editarTestimonio(id: number, testimonio: any): void {
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

}

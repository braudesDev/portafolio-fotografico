import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Testimonio } from '../interfaces/testimonio.interface'; // Importa la interfaz Testimonio


@Injectable({
  providedIn: 'root'
})
export class TestimoniosService {

  private apiUrl = 'http://localhost:3000/testimonios'; // Cambia esta URL según tu API

  constructor(private http: HttpClient) {}

// Tipar las respuestas como "Testimonio[]"
getTestimonios(): Observable<Testimonio[]> {
  return this.http.get<Testimonio[]>(this.apiUrl).pipe(
    tap(data => console.log('Testimonios obtenidos:', data)) // Agrega este log para ver los datos
  );
}


  // Agregar un nuevo testimonio
  addTestimonio(testimonio: Omit<Testimonio, 'id'> ): Observable<Testimonio> {
    return this.http.post<any>(this.apiUrl, testimonio);
  }

  // Actualizar un testimonio
  updateTestimonio(id: number, testimonio: Testimonio): Observable<Testimonio> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, testimonio);
  }

  // Eliminar un testimonio
  deleteTestimonio(id: number): Observable<Testimonio> {
    return this.http.delete<Testimonio>(`${this.apiUrl}/${id}`);
  }
}

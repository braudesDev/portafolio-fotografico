import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestimoniosService {

  private apiUrl = 'http://localhost:3000/testimonios'; // Cambia esta URL según tu API

  constructor(private http: HttpClient) {}

  // Obtener todos los testimonios
  getTestimonios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Agregar un nuevo testimonio
  addTestimonio(testimonio: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, testimonio);
  }

  // Actualizar un testimonio
  updateTestimonio(id: number, testimonio: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, testimonio);
  }

  // Eliminar un testimonio
  deleteTestimonio(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

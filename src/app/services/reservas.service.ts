import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp,
  docData,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

export interface Reserva {
  id?: string;
  clienteNombre: string;
  fechaEvento: Timestamp;
  estado: 'apartado' | 'liquidado' | 'pendiente';
  anticipo: number;
  total: number;
  restante: number;
  paquete: string;
  notas?: string;
  fechaCreacion: Timestamp;
}

@Injectable({
  providedIn: 'root',
})
export class ReservasService {
  constructor(private firestore: Firestore) {}

  getReservas(): Observable<Reserva[]> {
    const colRef = collection(this.firestore, 'reservas');
    return collectionData(colRef, { idField: 'id' }) as Observable<Reserva[]>;
  }

  addReserva(reserva: Reserva) {
    const colRef = collection(this.firestore, 'reservas');
    return addDoc(colRef, reserva);
  }

  updateReserva(id: string, data: Partial<Reserva>) {
    const reservaDoc = doc(this.firestore, `reservas/${id}`);
    return updateDoc(reservaDoc, data);
  }

  deleteReserva(id: string) {
    const reservaDoc = doc(this.firestore, `reservas/${id}`);
    return deleteDoc(reservaDoc);
  }
  getReservaById(id: string): Observable<Reserva> {
    const reservaDoc = doc(this.firestore, `reservas/${id}`);
    return docData(reservaDoc, { idField: 'id' }) as Observable<Reserva>;
  }
}

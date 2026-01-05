import {
  collectionData,
  collection,
  query,
  where,
  Firestore,
  doc,
  addDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Invitado } from '../models/invitado.model';

@Injectable({
  providedIn: 'root',
})
export class InvitadosService {
  constructor(private firestore: Firestore) {}

  private getCollection() {
    return collection(this.firestore, 'invitados');
  }

  getInvitadosPorAnfitrion(
    anfitrionId: string,
    estado?: string
  ): Observable<Invitado[]> {
    const ref = collection(this.firestore, 'invitados');
    const q = estado
      ? query(
          ref,
          where('anfitrionId', '==', anfitrionId),
          where('estado', '==', estado)
        )
      : query(ref, where('anfitrionId', '==', anfitrionId));

    return collectionData<any>(q, { idField: 'id' }).pipe(
      map((docs: any[]) =>
        docs.map((doc) => ({
          id: doc.id ?? '',
          nombre: doc.nombre ?? '',
          pases: doc.pases ?? 1,
          mensajePersonalizado: doc.mensajePersonalizado ?? '',
          slug: doc.slug ?? '',
          estado: doc.estado ?? 'pendiente',
          anfitrionId: doc.anfitrionId ?? '',
        }))
      )
    );
  }

  getInvitadoPorSlug(slug: string): Observable<Invitado | undefined> {
    const ref = collection(this.firestore, 'invitados');
    const q = query(ref, where('slug', '==', slug));
    return collectionData<any>(q, { idField: 'id' }).pipe(
      map((docs: any[]) => {
        if (!docs || !docs.length) return undefined;
        const doc = docs[0];
        return {
          id: doc.id ?? '',
          nombre: doc.nombre ?? '',
          pases: doc.pases ?? 1,
          mensajePersonalizado: doc.mensajePersonalizado ?? '',
          slug: doc.slug ?? '',
          estado: doc.estado ?? 'pendiente',
          anfitrionId: doc.anfitrionId ?? '',
        } as Invitado;
      })
    );
  }

  async agregarInvitado(invitado: Invitado) {
    return addDoc(this.getCollection(), invitado);
  }

  async actualizarInvitado(id: string, data: Partial<Invitado>) {
    const ref = doc(this.firestore, `invitados/${id}`);
    return updateDoc(ref, data);
  }
}

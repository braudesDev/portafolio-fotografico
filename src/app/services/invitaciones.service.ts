import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Invitacion {
  id: string;
  name: string;
  slug: string;
  tipo: 'boda' | 'xv' | 'bautizo' | 'cumples';

  // PRINCIPALES
  descripcion?: string;
  componente?: string;
  nombres?: string;
  fecha: Date;
  lugar?: string;

  // MENSAJES
  frasePrincipal?: string;
  mensajePrincipal?: string;
  fraseDeInvValida?: string;
  mensajePersonalizado?: string;
  historia?: string;

  // DISEÑO / HERO
  heroImage?: string;
  shareImage?: string;
  photos?: string[];
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
  fuente?: string;
  colorTexto?: string;

  // DATOS DEL INVITADO
  invitado?: string;
  pases?: number;

  // INFO ADICIONAL DEL EVENTO
  evento?: string;
  anfitrion?: string;
  totalInvitados?: number;
  enviadas?: number;

  // 🔹 SECCIONES QUE TU TEMPLATE USA 🔹
  padres?: {
    padreNovia?: string;
    madreNovia?: string;
    padreNovio?: string;
    madreNovio?: string;
  };

  ceremonia?: {
    lugar?: string;
    direccion?: string;
    hora?: string;
  };

  recepcion?: {
    lugar?: string;
    direccion?: string;
    hora?: string;
  };

  padrinos?: string[];
  damas?: string[];

  itinerario?: {
    titulo?: string;
    items?: { hora: string; actividad: string }[];
  };

  dressCode?: {
    descripcion?: string;
    sugerencia?: string;
    imagen?: string;
  };

  hospedaje?: {
    hoteles?: {
      nombre: string;
      direccion: string;
      telefono?: string;
      link?: string;
    }[];
  };

  hashtag?: string;

  contador?: {
    fechaObjetivo: string; // ISO o timestamp
  };

  regalos?: {
    texto?: string;
    links?: { nombre: string; url: string }[];
  };

  consideraciones?: string;

  confirmacion?: {
    telefono?: string;
    whatsapp?: string;
    link?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class InvitacionesService {
  private invitaciones: Invitacion[] = [
    {
      id: '2',
      name: 'XV de Nathalia',
      slug: 'xv-nathalia',
      tipo: 'xv',
      nombres: 'Nathalia',
      fecha: new Date('2024-11-10T19:00:00'),
      lugar: 'Salón Los Cedros, Salamanca',
      heroImage: 'assets/invitaciones/xv-nathalia/hero.jpg',
      shareImage: 'assets/invitaciones/xv-nathalia/share.jpg',
      primaryColor: '#fdf0f5',
      secondaryColor: '#d63384',
      fontFamily: "'Dancing Script', cursive",
    },
  ];

  constructor(private firestore: Firestore) {}

  // 🔹 NUEVO: obtener invitación por slug
  getInvitacionBySlug(slug: string): Observable<Invitacion | undefined> {
    const ref = collection(this.firestore, 'invitaciones');
    const q = query(ref, where('slug', '==', slug));

    return new Observable((observer) => {
      getDocs(q)
        .then((snapshot) => {
          if (!snapshot.empty) {
            const data = snapshot.docs[0].data() as Invitacion;
            observer.next({ ...data, id: snapshot.docs[0].id });
          } else {
            observer.next(undefined);
          }
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  // ✅ getter para la colección (seguro y limpio)
  private get coleccion() {
    return collection(this.firestore, 'invitaciones');
  }

  async guardarInvitacion(invitacion: Invitacion) {
    try {
      const ref = collection(this.firestore, 'invitaciones');
      const docRef = await addDoc(ref, invitacion);
      console.log('Invitación guardada con ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error al guardar invitación:', error);
      throw error;
    }
  }

  // 🔹 Obtener todas la invitaciones
  getAll(): Observable<Invitacion[]> {
    return collectionData(this.coleccion, { idField: 'id' }) as Observable<
      Invitacion[]
    >;
  }

  // 🔹 Buscar por slug
  async getBySlug(slug: string): Promise<Invitacion | undefined> {
    const snapshot = await getDocs(collection(this.firestore, 'invitaciones'));
    const invitaciones = snapshot.docs.map((doc) => doc.data() as Invitacion);
    return invitaciones.find((inv) => inv.slug === slug);
  }

  // 🔹 Obtener una invitación por ID
  getInvitacionById(id: string): Observable<Invitacion | undefined> {
    const docRef = doc(this.firestore, `invitaciones/${id}`);
    return docData(docRef, { idField: 'id' }) as Observable<
      Invitacion | undefined
    >;
  }

  // 🔹 Agregar nueva invitación
  addInvitacion(invitacion: Invitacion): Promise<void> {
    invitacion.slug = invitacion.name.toLowerCase().replace(/\s+/g, '-');
    return addDoc(this.coleccion, invitacion).then(() => {});
  }

  // 🔹 Actualizar invitación existente
  updateInvitacion(id: string, data: Partial<Invitacion>): Promise<void> {
    const docRef = doc(this.firestore, `invitaciones/${id}`);
    return updateDoc(docRef, { ...data });
  }

  // 🔹 Eliminar invitación
  deleteInvitacion(id: string): Promise<void> {
    const docRef = doc(this.firestore, `invitaciones/${id}`);
    return deleteDoc(docRef);
  }
}

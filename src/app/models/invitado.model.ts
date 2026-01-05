// src/app/models/invitado.model.ts

export interface Invitado {
  id?: string;
  nombre: string;
  pases: number;
  mensajePersonalizado: string;
  slug: string;
  estado: 'pendiente' | 'confirmado' | 'rechazado';
  anfitrionId: string; // para saber a qué anfitrión pertenece
}

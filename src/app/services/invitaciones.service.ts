import { Injectable } from '@angular/core';

export interface Invitacion {
  id: string;
  name: string;
  slug: string;
  description?: string;
  photos?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class InvitacionesService {
  private invitaciones: Invitacion[] = [
    {
      id: '1',
      name: 'Boda de Alondra y Luis',
      slug: 'boda-alondra-y-luis',
      photos: ['foto1.jpg', 'foto2.jpg'],
    },
    {
      id: '2',
      name: 'XV de Jareli',
      slug: 'xv-anos-jareli',
      photos: ['foto1.jpg', 'foto2.jpg'],
    },
    {
      id: '3',
      name: 'XV Años de Nathalia',
      slug: 'xv-nathalia', // 👈 este es el que estás usando
      photos: ['foto1.jpg', 'foto2.jpg'],
    },
  ];

  constructor() {}

  getAll() {
    return this.invitaciones;
  }

  getBySlug(slug: string) {
    return this.invitaciones.find((inv) => inv.slug === slug);
  }
}

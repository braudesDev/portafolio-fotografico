import { Injectable } from '@angular/core';

export interface Invitacion {
  id: string;
  name: string; // nombre interno (por ti)
  slug: string; // ruta amigable (ej. /invitacion/xv-nathalia)
  tipo: 'boda' | 'xv'; // tipo de evento
  descripcion?: string;
  componente?: string; // por ejemplo, 'XvNathaliaComponent' o 'BodaPilotoComponent'

  // 💍 Datos específicos del evento
  nombres?: string; // ej. “Ángeles & Braulio” o “Natalia”
  fecha?: string;
  lugar?: string;

  // textis personalizados
  frasePrincipal?: string; // Ej: "¡Nos casamos!"
  mensajePrincipal?: string; // Ej: "Queremos compartir este momento tan especial contigo 💕"
  fraseDeInvValida?: string; // Ej: "Tu invitación es válida"
  historia?: string; // Ejemplo: “Después de grandes aventuras...”

  // 🖼 Recursos gráficos
  heroImage?: string; // imagen de portada
  shareImage?: string; // imagen para compartir (Facebook/WhatsApp)
  photos?: string[];

  // 🎨 Personalización visual
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;

  // 👥 Datos del invitado (opcionales)
  invitado?: string;
  pases?: number;
}

@Injectable({
  providedIn: 'root',
})
export class InvitacionesService {
  private invitaciones: Invitacion[] = [
    {
      id: '1',
      name: 'Ejemplo Boda Invitación',
      slug: 'ejemplo-boda-invitacion',
      tipo: 'boda',
      nombres: 'Ángeles & Braulio',
      fecha: '12 de diciembre de 2025',
      lugar: 'Hacienda San Miguel, Irapuato',
      frasePrincipal: '¡Nos Casamos!',
      mensajePrincipal:
        'Estamos emocionados de compartir este momento especial con ustedes. ¡Acompáñennos en nuestra boda y celebremos juntos el amor!',
      fraseDeInvValida: `Tu invitación es válida para el evento. ¡Esperamos verte allí! {{invitado}}`,
      historia:
        'Después de años de aventuras, risas y crecimiento juntos, hemos decidido dar el siguiente paso en nuestro viaje. Nos encantaría que fueran parte de este día tan especial para nosotros.',
      heroImage:
        'https://res.cloudinary.com/drsyb53ae/image/upload/v1754589811/29062025-DSC_4071_dqkkd3.webp',
      shareImage: 'assets/invitaciones/boda-piloto/share.jpg',
      primaryColor: '#f7e9e8',
      secondaryColor: '#5a3e36',
      fontFamily: "'Playfair Display', serif",
    },
    {
      id: '2',
      name: 'XV de Nathalia',
      slug: 'xv-nathalia',
      tipo: 'xv',
      nombres: 'Nathalia',
      fecha: '8 de marzo de 2026',
      lugar: 'Salón Los Cedros, Salamanca',
      heroImage: 'assets/invitaciones/xv-nathalia/hero.jpg',
      shareImage: 'assets/invitaciones/xv-nathalia/share.jpg',
      primaryColor: '#fdf0f5',
      secondaryColor: '#d63384',
      fontFamily: "'Dancing Script', cursive",
    },
  ];

  getAll() {
    return this.invitaciones;
  }

  getBySlug(slug: string) {
    return this.invitaciones.find((inv) => inv.slug === slug);
  }
}

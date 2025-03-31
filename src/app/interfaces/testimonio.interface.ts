export interface Testimonio {
  id?: number;
  nombre: string;
  comentario: string;    // O "testimonio" si prefieres ese nombre
  imagen_url: string;    // O "imagen" si prefieres ese nombre
  fecha?: Date;
  // Otros campos opcionales...
}

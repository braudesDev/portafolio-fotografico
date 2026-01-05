import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import {
  Firestore,
  collection,
  query,
  where,
  collectionData,
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable, from, of } from 'rxjs';
import {
  InvitacionesService,
  Invitacion,
} from '../../services/invitaciones.service';
import { InvitacionGenericaComponent } from './invitacion-generica/invitacion-generica.component';

@Component({
  selector: 'app-invitaciones',
  standalone: true,
  imports: [CommonModule, InvitacionGenericaComponent],
  templateUrl: './invitaciones.component.html',
  styleUrls: ['./invitaciones.component.css'],
})
export class InvitacionesComponent implements OnInit {
  invitacion$?: Observable<Invitacion | undefined>;
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private invitacionesService: InvitacionesService,
    private meta: Meta,
    private title: Title,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    const invitado = this.route.snapshot.queryParamMap.get('invitado');
    const pases = this.route.snapshot.queryParamMap.get('pases');

    if (!slug) {
      this.cargando = false;
      return;
    }

    // 🔹 Buscar invitación en Firestore
    const colRef = collection(this.firestore, 'invitaciones');
    const q = query(colRef, where('slug', '==', slug));
    this.invitacion$ = collectionData<any>(q, { idField: 'id' }).pipe(
      map((docs) => {
        const doc = docs[0];
        if (!doc) return undefined;

        const inv: Invitacion = {
          // CAMPOS BASE
          id: doc.id ?? '',
          name: doc.name ?? '',
          slug: doc.slug ?? '',
          tipo: doc.tipo ?? 'cumples',
          fecha: doc.fecha ? new Date(doc.fecha) : new Date(),

          // TEXTO E IMÁGENES
          descripcion: doc.descripcion ?? '',
          componente: doc.componente ?? '',
          nombres: doc.nombres ?? '',
          lugar: doc.lugar ?? '',
          frasePrincipal: doc.frasePrincipal ?? '',
          mensajePrincipal: doc.mensajePrincipal ?? '',
          fraseDeInvValida: doc.fraseDeInvValida ?? '',
          historia: doc.historia ?? '',
          heroImage: doc.heroImage ?? '',
          shareImage: doc.shareImage ?? '',
          photos: doc.photos ?? [],

          // COLORES Y FUENTES
          primaryColor: doc.primaryColor ?? '',
          secondaryColor: doc.secondaryColor ?? '',
          fontFamily: doc.fontFamily ?? '',
          fuente: doc.fuente ?? '',
          colorTexto: doc.colorTexto ?? '',

          // INFO DEL INVITADO (desde query params o desde Firebase)
          invitado: invitado ?? doc.invitado ?? 'Invitado especial',
          pases: pases ? +pases : doc.pases ?? 1,
          mensajePersonalizado: doc.mensajePersonalizado ?? '',

          // DATOS DEL EVENTO
          evento: doc.evento ?? '',
          anfitrion: doc.anfitrion ?? '',
          totalInvitados: doc.totalInvitados ?? 0,
          enviadas: doc.enviadas ?? 0,
        };

        this.setMetaTags(inv);
        return inv;
      })
    );

    this.cargando = false;
  }

  private procesarInvitacion(
    inv?: Invitacion,
    invitado?: string | null,
    pases?: string | null
  ): Invitacion | undefined {
    if (!inv) return undefined;
    inv.invitado = invitado ?? 'Invitado especial';
    inv.pases = pases ? +pases : 1;
    this.setMetaTags(inv);
    return inv;
  }

  private setMetaTags(inv: Invitacion) {
    this.title.setTitle(`${inv.name} | On Off Shot Invitaciones`);
    this.meta.updateTag({ property: 'og:title', content: inv.name });
    this.meta.updateTag({
      property: 'og:description',
      content: `Te invitamos a ${inv.name}. ¡Haz clic para ver los detalles!`,
    });
    this.meta.updateTag({
      property: 'og:image',
      content: inv.shareImage ?? 'assets/default-share.jpg',
    });
  }
}

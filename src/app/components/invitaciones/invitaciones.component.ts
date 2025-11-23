import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import {
  Firestore,
  collection,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
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
  invitacion?: Invitacion;
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private invitacionesService: InvitacionesService,
    private meta: Meta,
    private title: Title,
    private firestore: Firestore
  ) {}

  async ngOnInit(): Promise<void> {
    const slug = this.route.snapshot.paramMap.get('slug');
    const invitado = this.route.snapshot.queryParamMap.get('invitado');
    const pases = this.route.snapshot.queryParamMap.get('pases');

    if (!slug) {
      this.cargando = false;
      return;
    }

    try {
      // 🔹 1. Intentar obtener desde el servicio local (si existe)
      let posible = this.invitacionesService.getBySlug(slug);
      this.invitacion = posible instanceof Promise ? await posible : posible;

      // 🔹 2. Si no existe localmente, buscar en Firestore por slug
      if (!this.invitacion) {
        const colRef = collection(this.firestore, 'invitaciones');
        const q = query(colRef, where('slug', '==', slug));
        const snap = await getDocs(q);

        if (!snap.empty) {
          this.invitacion = snap.docs[0].data() as Invitacion;
        } else {
          console.warn(`No se encontró invitación con slug="${slug}"`);
        }
      }

      // 🔹 3. Si se encontró, asignar invitado/pases y meta-tags
      if (this.invitacion) {
        this.invitacion.invitado = invitado ?? 'Invitado especial';
        this.invitacion.pases = pases ? +pases : 1;
        console.log('Invitación cargada:', this.invitacion); // 🔹
        this.setMetaTags(this.invitacion);
      }
    } catch (err) {
      console.error('Error cargando invitación:', err);
    } finally {
      this.cargando = false;
    }
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

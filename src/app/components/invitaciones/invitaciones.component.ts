import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import {
  InvitacionesService,
  Invitacion,
} from '../../services/invitaciones.service';
import { XvNathaliaComponent } from './xv-nathalia/xv-nathalia.component';
import { InvitacionGenericaComponent } from './invitacion-generica/invitacion-generica.component';

@Component({
  selector: 'app-invitaciones',
  standalone: true,
  imports: [CommonModule, XvNathaliaComponent, InvitacionGenericaComponent],
  templateUrl: './invitaciones.component.html',
  styleUrls: ['./invitaciones.component.css'],
})
export class InvitacionesComponent implements OnInit {
  invitacion?: Invitacion;

  constructor(
    private route: ActivatedRoute,
    private invitacionesService: InvitacionesService,
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.invitacion = this.invitacionesService.getBySlug(slug);

      const invitado = this.route.snapshot.queryParamMap.get('invitado');
      const pases = this.route.snapshot.queryParamMap.get('pases');

      if (this.invitacion) {
        // asignamos los datos del query param
        this.invitacion.invitado = invitado ?? 'Invitado especial';
        this.invitacion.pases = pases ? +pases : 1;

        this.setMetaTags(this.invitacion);
      }
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

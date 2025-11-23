import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Invitacion } from '../../../services/invitaciones.service';
import { HeroSectionComponent } from './sections/hero-section/hero-section.component';
import { NosCasamosSectionComponent } from './sections/nos-casamos-section/nos-casamos-section.component';
import { InvitacionValidaSectionComponent } from './sections/invitacion-valida-section/invitacion-valida-section.component';
import { CeremoniaSectionComponent } from './sections/ceremonia-section/ceremonia-section.component';
// Importa los demás componentes que crearás
import { PadresSectionComponent } from './sections/padres-section/padres-section.component';
import { RecepcionSectionComponent } from './sections/recepcion-section/recepcion-section.component';
import { PadrinosSectionComponent } from './sections/padrinos-section/padrinos-section.component';
import { DamasSectionComponent } from './sections/damas-section/damas-section.component';
import { DresscodeSectionComponent } from './sections/dresscode-section/dresscode-section.component';
import { HistoriaSectionComponent } from './sections/historia-section/historia-section.component';
import { ItinerarioSectionComponent } from './sections/itinerario-section/itinerario-section.component';
import { HospedajeSectionComponent } from './sections/hospedaje-section/hospedaje-section.component';
import { HashtagSectionComponent } from './sections/hashtag-section/hashtag-section.component';
import { ContadorSectionComponent } from './sections/contador-section/contador-section.component';
import { RegalosSectionComponent } from './sections/regalos-section/regalos-section.component';
import { ConsideracionesSectionComponent } from './sections/consideraciones-section/consideraciones-section.component';
import { ConfirmacionSectionComponent } from './sections/confirmacion-section/confirmacion-section.component';
import { FooterSectionComponent } from './sections/footer-section/footer-section.component';

@Component({
  selector: 'app-invitacion-generica',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    NosCasamosSectionComponent,
    InvitacionValidaSectionComponent,
    // CeremoniaSectionComponent,
    // PadresSectionComponent,
    // RecepcionSectionComponent,
    // PadrinosSectionComponent,
    // DamasSectionComponent,
    // DresscodeSectionComponent,
    // HistoriaSectionComponent,
    // ItinerarioSectionComponent,
    // HospedajeSectionComponent,
    // HashtagSectionComponent,
    // ContadorSectionComponent,
    // RegalosSectionComponent,
    // ConsideracionesSectionComponent,
    // ConfirmacionSectionComponent,
    FooterSectionComponent,
  ],
  templateUrl: './invitacion-generica.component.html',
  styleUrls: ['./invitacion-generica.component.css'],
})
export class InvitacionGenericaComponent implements OnInit {
  @Input() data!: Invitacion;

  constructor() {}

  ngOnInit() {}

  get fechaFormateada(): string {
    if (!this.data?.fecha) return '';
    const fecha =
      this.data.fecha instanceof Date
        ? this.data.fecha
        : new Date(this.data.fecha as any);

    return fecha.toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  InvitacionesService,
  Invitacion,
} from '../../../services/invitaciones.service';
import { HeroSectionComponent } from './sections/hero-section/hero-section.component';
import { NosCasamosSectionComponent } from './sections/nos-casamos-section/nos-casamos-section.component';
import { InvitacionValidaSectionComponent } from './sections/invitacion-valida-section/invitacion-valida-section.component';
import { CeremoniaSectionComponent } from './sections/ceremonia-section/ceremonia-section.component';

@Component({
  selector: 'app-invitacion-generica',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    NosCasamosSectionComponent,
    InvitacionValidaSectionComponent,
    CeremoniaSectionComponent,
  ],
  templateUrl: './invitacion-generica.component.html',
  styleUrls: ['./invitacion-generica.component.css'],
})
export class InvitacionGenericaComponent implements OnInit {
  @Input() data!: Invitacion;

  constructor(private invitacionesService: InvitacionesService) {}

  ngOnInit() {
    // 🔹 Cargamos una invitación por defecto (por ejemplo la invitacion de ejemplo de boda)
    this.data = this.invitacionesService.getBySlug('ejemplo-boda-invitacion')!;
  }

  get estilo() {
    return {
      '--primary-color': this.data?.primaryColor,
      '--secondary-color': this.data?.secondaryColor,
      '--font-family': this.data?.fontFamily,
    };
  }
}

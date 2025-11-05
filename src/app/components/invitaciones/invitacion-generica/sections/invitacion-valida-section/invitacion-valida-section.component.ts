import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invitacion-valida-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invitacion-valida-section.component.html',
  styleUrls: ['./invitacion-valida-section.component.css'],
})
export class InvitacionValidaSectionComponent {
  @Input() invitado: string = '';
  @Input() pases = 1;
  @Input() mensajePersonalizado?: string;

  get fraseDeInvValida(): string {
    return this.invitado
      ? `Nos encantaria verte ahi, ${this.invitado}!`
      : 'Nos encantaria verte ahi!';
  }
}

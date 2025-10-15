import { Component, OnInit } from '@angular/core';
import {
  InvitacionesService,
  Invitacion,
} from '../../services/invitaciones.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { XvNathaliaComponent } from '../invitaciones/xv-nathalia/xv-nathalia.component';

@Component({
  selector: 'app-invitaciones',
  standalone: true,
  imports: [CommonModule, XvNathaliaComponent],
  templateUrl: './invitaciones.component.html',
  styleUrls: ['./invitaciones.component.css'],
})
export class InvitacionesComponent implements OnInit {
  invitacion!: Invitacion | undefined;

  constructor(
    private route: ActivatedRoute,
    private invitacionesService: InvitacionesService
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.invitacion = this.invitacionesService.getBySlug(slug);
    }
  }
}

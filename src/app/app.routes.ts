import { Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guards';
import { InvitacionesComponent } from './components/invitaciones/invitaciones.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'gallery',
    loadComponent: () =>
      import('./components/gallery/gallery.component').then(
        (m) => m.GalleryComponent
      ),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./components/contact/contact.component').then(
        (m) => m.ContactoComponent
      ),
  },
  {
    path: 'my-services',
    loadComponent: () =>
      import('./components/my-services/my-services.component').then(
        (m) => m.MyServicesComponent
      ),
  },
  {
    path: 'about-me',
    loadComponent: () =>
      import('./components/about-me/about-me.component').then(
        (m) => m.AboutMeComponent
      ),
  },
  {
    path: 'testimonios',
    loadComponent: () =>
      import('./components/testimonios/testimonios.component').then(
        (m) => m.TestimoniosComponent
      ),
  },
  {
    path: 'video',
    loadComponent: () =>
      import('./components/video/video.component').then(
        (m) => m.VideoComponent
      ),
  },
  {
    path: 'album/:id',
    loadComponent: () =>
      import('./components/album/album.component').then(
        (m) => m.AlbumComponent
      ),
  },
  {
    path: 'admin-login',
    loadComponent: () =>
      import('./admin-login/admin-login.component').then(
        (m) => m.AdminLoginComponent
      ),
  },
  {
    path: 'admin-dashboard',
    loadComponent: () =>
      import('./components/admin-dashboard/admin-dashboard.component').then(
        (m) => m.AdminDashboardComponent
      ),
    canActivate: [AdminGuard],
  },
  {
    path: 'reserva-form',
    loadComponent: () =>
      import('./components/reserva-form/reserva-form.component').then(
        (m) => m.ReservaFormComponent
      ),
    canActivate: [AdminGuard],
  },
  {
    path: 'editar-reserva/:id',
    loadComponent: () =>
      import('./components/edit-reserva/edit-reserva.component').then(
        (m) => m.EditReservaComponent
      ),
    canActivate: [AdminGuard],
  },

  // app.routes.ts
  {
    path: 'invitacion/:slug',
    loadComponent: () =>
      import('./components/invitaciones/invitaciones.component').then(
        (m) => m.InvitacionesComponent
      ),
  },
];

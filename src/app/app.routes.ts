  import { Routes } from '@angular/router';
  import { AdminGuard } from './guards/admin.guards';
  import { FormularioInvitacionComponent } from './components/invitaciones/formulario-invitacion/formulario-invitacion.component';

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
      path: 'invitaciones-digitales',
      loadComponent: () =>
        import(
          './components/invitaciones-digitales/invitaciones-digitales.component'
        ).then((m) => m.InvitacionesDigitalesComponent),
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
      path: 'anfitrion-login',
      loadComponent: () =>
        import('./anfitrion-login/anfitrion-login.component').then(
          (m) => m.AnfitrionLoginComponent
        ),
    },
    {
      path: 'boda',
      loadComponent: () =>
        import('./components/invitaciones-digitales/boda/boda.component').then(
          (m) => m.BodaComponent
        ),
    },
    {
      path: 'catalogo-invitaciones-boda',
      loadComponent: () =>
        import(
          './components/invitaciones-digitales/boda/catalogo-invitaciones-boda/catalogo-invitaciones-boda.component'
        ).then((m) => m.CatalogoInvitacionesBodaComponent),
    },
    {
      path: 'xv-anios',
      loadComponent: () =>
        import(
          './components/invitaciones-digitales/xv-anios/xv-anios.component'
        ).then((m) => m.XvAniosComponent),
    },
    {
      path: 'catalogo-invitaciones-xv',
      loadComponent: () =>
        import(
          './components/invitaciones-digitales/xv-anios/catalogo-invitaciones-xv-anios/catalogo-invitaciones-xv-anios.component'
        ).then((m) => m.CatalogoInvitacionesXvAniosComponent),
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
      path: 'anfitrion-dashboard',
      loadComponent: () =>
        import(
          './components/anfitrion-dashboard/anfitrion-dashboard.component'
        ).then((m) => m.AnfitrionDashboardComponent),
      //canActivate: [AdminGuard],
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
    {
      path: 'formulario-invitacion',
      loadComponent: () =>
        import(
          './components/invitaciones/formulario-invitacion/formulario-invitacion.component'
        ).then((m) => m.FormularioInvitacionComponent),
      canActivate: [AdminGuard],
    },
    {
      path: 'editar-invitacion/:id',
      loadComponent: () =>
        import(
          './components/invitaciones/formulario-invitacion/formulario-invitacion.component'
        ).then((m) => m.FormularioInvitacionComponent),
      canActivate: [AdminGuard],
    },

    // app.routes.ts
    {
      path: 'invitaciones/:slug',
      loadComponent: () =>
        import('./components/invitaciones/invitaciones.component').then(
          (m) => m.InvitacionesComponent
        ),
    },
  ];

import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ContactComponent } from './components/contact/contact.component';
import { MyServicesComponent } from './components/my-services/my-services.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { TestimoniosComponent } from './components/testimonios/testimonios.component';
import { VideoComponent } from './components/video/video.component';
import { AlbumComponent } from './components/album/album.component';

export const routes: Routes = [
  { path: '', component: HomeComponent}, //Pagina de inicio
  { path: 'gallery', component: GalleryComponent}, //Galeria
  { path: 'contact', component: ContactComponent}, //Contacto
  { path: 'my-services', component: MyServicesComponent}, //
  { path: 'about-me', component: AboutMeComponent}, //
  { path: 'testimonios', component: TestimoniosComponent}, //
  { path: 'video', component: VideoComponent},
  { path: 'album/:id', component: AlbumComponent} //Ruta modificada para aceptar un parametro de id
];

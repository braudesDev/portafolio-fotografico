import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { GalleryComponent } from './components/gallery/gallery.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portafolio-fotografia';

  yourImageArray = [
    { url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1741812223/portafolio-fotografico/tpba4mnsfsffcpv4grnm.png', alt: 'Descripción de la imagen 1' },
    { url: 'https://example.com/image2.jpg', alt: 'Descripción de la imagen 2' },
    // Agrega más imágenes si es necesario
  ];
}

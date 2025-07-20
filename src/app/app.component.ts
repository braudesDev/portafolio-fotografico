import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AdminLoginComponent } from './admin-login/admin-login.component'; // Ajusta ruta

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'portafolio-fotografia';

  yourImageArray = [
    {
      url: 'https://res.cloudinary.com/drsyb53ae/image/upload/v1741812223/portafolio-fotografico/tpba4mnsfsffcpv4grnm.png',
      alt: 'Descripción de la imagen 1',
    },
    {
      url: 'https://example.com/image2.jpg',
      alt: 'Descripción de la imagen 2',
    },
  ];

  constructor(private dialog: MatDialog) {}

  @HostListener('document:keydown', ['$event'])

  //ctrl+shift+l
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.shiftKey && event.key.toLowerCase() === 'l') {
      this.openAdminLogin();
    }
  }

  openAdminLogin() {
    this.dialog.open(AdminLoginComponent, {
      width: '350px',
    });
  }
}

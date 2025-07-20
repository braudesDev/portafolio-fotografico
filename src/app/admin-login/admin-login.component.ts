import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { ReservasService } from '../services/reservas.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';

  private dialogRef = inject(MatDialogRef<AdminLoginComponent>);
  private router = inject(Router);
  private auth = inject(Auth);

  async login() {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        this.username,
        this.password
      );

      console.log('Login exitoso!', userCredential);

      //Guardar el token de sesion
      localStorage.setItem('isAdmin', 'true');

      this.dialogRef.close();
      this.router.navigate(['/admin-dashboard']);
    } catch (error: any) {
      console.error(error);
      alert('Usuario o contrasenia incorrecta');
    }
  }
}

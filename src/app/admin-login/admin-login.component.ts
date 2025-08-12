import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  Auth,
} from '@angular/fire/auth';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';

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
    MatIconModule,
  ],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  auth = inject(Auth);
  router = inject(Router);

  private dialogRef = inject(MatDialogRef<AdminLoginComponent>);

  // Login
  email: string = '';
  password: string = '';
  hidePassword: boolean = true;

  // Registro
  registerEmail: string = '';
  registerPassword: string = '';
  hideRegisterPassword: boolean = true;
  // Propiedades para confirmar contraseña
  confirmPassword: string = '';
  hideConfirmPassword: boolean = true;

  // Controla la tarjeta que se ve
  isFlipped: boolean = false;

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleRegisterPasswordVisibility() {
    this.hideRegisterPassword = !this.hideRegisterPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  async login() {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        this.email,
        this.password
      );
      console.log('Login exitoso!', userCredential);
      localStorage.setItem('isAdmin', 'true');

      this.dialogRef.close(); // <-- aquí se cierra el diálogo
      this.router.navigate(['/admin-dashboard']);
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: 'Usuario o constrasenia incorrectos',
        confirmButtonText: 'Aceptar',
      });
    }
  }

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(this.auth, provider);
      console.log('Login con Google exitoso!', userCredential);
      localStorage.setItem('isAdmin', 'true');

      this.dialogRef.close(); // <-- cerrar diálogo
      this.router.navigate(['/admin-dashboard']);
    } catch (error: any) {
      console.error('Error en login con Google:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión con Google',
        text: error.message,
        confirmButtonText: 'Aceptar',
      });
    }
  }

  async register() {
    if (!this.registerEmail || !this.registerEmail.includes('@')) {
      Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: 'Por favor, ingresa un correo electrónico válido',
        confirmButtonText: 'Aceptar',
      });
      return;
    }
    if (!this.registerPassword || this.registerPassword.length < 6) {
      Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: 'La contraseña debe tener al menos 6 caracteres',
      });
    }
    if (this.registerPassword !== this.confirmPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: 'Las contraseñas no coinciden',
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        this.registerEmail,
        this.registerPassword
      );
      console.log('Registro exitoso!', userCredential);
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Registro exitoso, ahora puedes iniciar sesión',
      });
      this.toggleFlip(); // Volver al login
    } catch (error: any) {
      console.error('Error registrando usuario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo registrar. ' + error.message,
      });
    }
  }
}

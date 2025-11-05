import { Component } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-anfitrion-login',
  templateUrl: './anfitrion-login.component.html',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./anfitrion-login.component.css'],
})
export class AnfitrionLoginComponent {
  email = '';
  password = '';

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {}

  async login() {
    const result = await signInWithEmailAndPassword(
      this.auth,
      this.email,
      this.password
    );
    this.checkAccess(result.user.email);
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.auth, provider);
    this.checkAccess(result.user.email);
  }

  private async checkAccess(email: string | null) {
    if (!email) return;
    const docRef = doc(this.firestore, 'clientesAutorizados', email);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      this.router.navigate(['/anfitrion-dashboard']);
    } else {
      alert('No tienes invitaciones activas.');
      await this.auth.signOut();
    }
  }
}

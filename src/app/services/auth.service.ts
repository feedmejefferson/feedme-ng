import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model'; 

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

    user$: Observable<User>;

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router
    ) { 
      this.user$ = this.afAuth.authState;
    }

    async googleSignin() {
      const provider = new auth.GoogleAuthProvider();
      this.afAuth.auth.signInWithRedirect(provider);
    }
  
  
    async signOut() {
      await this.afAuth.auth.signOut();
      this.router.navigate(['/']);
    }
  
}
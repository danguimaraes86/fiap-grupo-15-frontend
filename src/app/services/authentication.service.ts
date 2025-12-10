import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  updateProfile
} from 'firebase/auth';
import { firebaseApp } from '../config/firebase.config';
import { LoginRequest, RegisterRequest } from '../models/request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private auth = getAuth(firebaseApp);

  login(request: LoginRequest): Observable<User> {
    return from(
      signInWithEmailAndPassword(this.auth, request.email, request.password)
        .then(credential => credential.user)
    );
  }

  register(request: RegisterRequest): Observable<User> {
    return from(
      createUserWithEmailAndPassword(this.auth, request.email, request.password)
        .then(credential => {
          // Update user profile with display name
          return updateProfile(credential.user, {
            displayName: request.name
          }).then(() => credential.user);
        })
    );
  }
}

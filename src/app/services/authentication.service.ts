import { Injectable, signal } from '@angular/core';
import {
  Auth,
  AuthError,
  createUserWithEmailAndPassword,
  User as FirebaseUser,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { firebaseApp } from '../config/firebase.config';
import { LoginRequest, RegisterRequest } from '../models/request.model';
import { getFirebaseErrorMessage } from '../utils/firebase-errors.util';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _firebaseAuth: Auth;
  public currentUserSignal = signal<FirebaseUser | null>(null);
  public authErrorMessage = signal<string | null>(null);

  constructor() {
    this._firebaseAuth = getAuth(firebaseApp)
  }

  async register(request: RegisterRequest): Promise<void> {
    try {
      this.authErrorMessage.set(null)
      const credential = await createUserWithEmailAndPassword(
        this._firebaseAuth,
        request.email,
        request.password
      );
      await updateProfile(credential.user, { displayName: request.name });
      this.currentUserSignal.set(credential.user)
    } catch (error) {
      this.handleAuthError(error as AuthError)
    }
  }

  async login(request: LoginRequest): Promise<void> {
    try {
      this.authErrorMessage.set(null);
      const credential = await signInWithEmailAndPassword(
        this._firebaseAuth,
        request.email,
        request.password
      );
      this.currentUserSignal.set(credential.user)
    } catch (error) {
      this.handleAuthError(error as AuthError);
    }
  }

  async logout(): Promise<void> {
    try {
      await this._firebaseAuth.signOut();
      this.currentUserSignal.set(null);
      this.authErrorMessage.set(null);
    } catch (error) {
      this.handleAuthError(error as AuthError);
    }
  }

  private handleAuthError(error: AuthError): void {
    this.authErrorMessage.set(getFirebaseErrorMessage(error.code));
    console.error('Firebase Auth Error:', error.code, this.authErrorMessage());
  }
}

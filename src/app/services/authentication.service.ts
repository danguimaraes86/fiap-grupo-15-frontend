import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  AuthError,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  User as FirebaseUser,
  getAuth,
  onAuthStateChanged,
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
  private _router = inject(Router)

  private _userSignal = signal<FirebaseUser | null>(null);
  public userSignal = this._userSignal.asReadonly()

  private _authErrorMessage = signal<string | null>(null);
  public authErrorMessage = this._authErrorMessage.asReadonly()

  private _isLoading = signal<boolean>(true);
  public isLoading = this._isLoading.asReadonly()

  constructor() {
    this._firebaseAuth = getAuth(firebaseApp)
    this._firebaseAuth.setPersistence(browserLocalPersistence)
    this.initAuthStateListener()
  }

  private initAuthStateListener() {
    onAuthStateChanged(this._firebaseAuth, (user) => {
      this._userSignal.set(user);
      this._isLoading.set(false)
    });
  }

  isAuthenticated(): boolean {
    return this._userSignal() !== null;
  }

  async register(request: RegisterRequest): Promise<void> {
    this._isLoading.set(true)
    try {
      this.clearAuthError()
      const credential = await createUserWithEmailAndPassword(
        this._firebaseAuth,
        request.email,
        request.password
      );
      await updateProfile(credential.user, { displayName: request.name });
    } catch (error) {
      this.handleAuthError(error as AuthError)
    } finally {
      this._isLoading.set(false)
    }
  }

  async login(request: LoginRequest): Promise<void> {
    this._isLoading.set(true)
    try {
      this.clearAuthError()
      await signInWithEmailAndPassword(
        this._firebaseAuth,
        request.email,
        request.password
      );
    } catch (error) {
      this.handleAuthError(error as AuthError);
    } finally {
      this._isLoading.set(false)
    }
  }

  async logout(): Promise<void> {
    try {
      await this._firebaseAuth.signOut();
      this._userSignal.set(null);
      this._authErrorMessage.set(null);
      this._router.navigate([''])
    } catch (error) {
      this.handleAuthError(error as AuthError);
    }
  }

  clearAuthError() {
    this._authErrorMessage.set(null);
  }

  private handleAuthError(error: AuthError): void {
    this._authErrorMessage.set(getFirebaseErrorMessage(error.code));
    console.error('Firebase Auth Error:', error.code, this._authErrorMessage());
  }
}

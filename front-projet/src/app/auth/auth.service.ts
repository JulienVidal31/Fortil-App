import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Signin } from './signin/signin.interface';
import { Signup } from './signup/signup.interface';
import { ResetPasswordAsk } from './reset-password-ask/reset-password-ask.interface';
import { ResetPasswordConfirm } from './reset-password-confirmation/reset-password-confirmation.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signin(signinData: Signin) {
    return this.http.post<Signin>('http://localhost:3000/auth/signin', signinData).pipe(
      tap((response) => this.log(response)), //on log la réponse, tap = console log pour Observable
      catchError((error) => this.handleError(error, error)) //on retourne Observable contenant erreur si erreur
      )
  }

  signup(signupData: Signup) {
    return this.http.post<Signup>('http://localhost:3000/auth/signup', signupData).pipe(
      tap((response) => this.log(response)), //on log la réponse, tap = console log pour Observable
      catchError((error) => this.handleError(error, error)) //on retourne Observable contenant erreur si erreur
      )
  }

  resetPasswordAsk(email: ResetPasswordAsk | undefined) {
    return this.http.post('http://localhost:3000/auth/reset-password', email).pipe(
      tap((response) => this.log(response)), //on log la réponse, tap = console log pour Observable
      catchError((error) => this.handleError(error, error)) //on retourne Observable contenant erreur si erreur
      )
  }

  resetPasswordConfirm(newPasswordData: ResetPasswordConfirm) {
    return this.http.post('http://localhost:3000/auth/reset-password-confirmation', newPasswordData).pipe(
      tap((response) => this.log(response)), //on log la réponse, tap = console log pour Observable
      catchError((error) => this.handleError(error, error)) //on retourne Observable contenant erreur si erreur
      )
  }

  
  private log(response: any) {
    console.table(response)
  }

  private handleError(error: Error, errorValue: any) { 
    console.log(error)
    return of(errorValue) //on retourne Observable vide si erreur
  }
}

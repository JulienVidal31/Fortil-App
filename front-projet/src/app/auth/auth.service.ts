import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Signin } from './signin/signin.interface';
import { Signup } from './signup/signup.interface';
import { ResetPasswordAsk } from './reset-password-ask/reset-password-ask.interface';
import { ResetPasswordConfirm } from './reset-password-confirmation/reset-password-confirmation.interface';
import { environment } from '../environment';
import * as jwt_decode from "jwt-decode"
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) { }

  signin(signinData: Signin) {
    const httpOptions = { //obligatoire ou non ?
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }
    return this.http.post<Signin>(`${environment.apiUrl}auth/signin`, signinData, httpOptions).pipe(
      tap((response) => this.log(response)), //on log la réponse, tap = console log pour Observable
      catchError((error) => this.handleError(error, error)) //on retourne Observable contenant erreur si erreur
      )
  }

  signup(signupData: Signup) {
    return this.http.post<Signup>(`${environment.apiUrl}auth/signup`, signupData).pipe(
      tap((response) => this.log(response)), //on log la réponse, tap = console log pour Observable
      catchError((error) => this.handleError(error, error)) //on retourne Observable contenant erreur si erreur
      )
  }

  resetPasswordAsk(email: ResetPasswordAsk | undefined) {
    return this.http.post(`${environment.apiUrl}auth/reset-password`, email).pipe(
      tap((response) => this.log(response)), //on log la réponse, tap = console log pour Observable
      catchError((error) => this.handleError(error, error)) //on retourne Observable contenant erreur si erreur
      )
  }

  resetPasswordConfirm(newPasswordData: ResetPasswordConfirm) {
    return this.http.post(`${environment.apiUrl}auth/reset-password-confirmation`, newPasswordData).pipe(
      tap((response) => this.log(response)), //on log la réponse, tap = console log pour Observable
      catchError((error) => this.handleError(error, error)) //on retourne Observable contenant erreur si erreur
      )
  }

  userIsLogin(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    const token = localStorage.getItem('token')
    return token
  }

  decodeToken(token: string | null): any {
    if (token) {
      return jwtDecode(token);
    } else {
      return null;
    }
  }

  getNameUser() {
    const token = this.getToken()
    if(token) {
      const name = this.decodeToken(token).name.toUpperCase()
    return name
    }
  }

  private log(response: any) {
    console.table(response)
  }

  private handleError(error: Error, errorValue: any) { 
    console.log(error)
    return of(errorValue) //on retourne Observable vide si erreur
  }
  
}

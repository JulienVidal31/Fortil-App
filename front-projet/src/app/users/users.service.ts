import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './users.interface';
import { Observable, catchError, of, tap } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> { 
    return this.http.get<User[]>(`${environment.apiUrl}users`).pipe(
      tap((response) => this.log(response)), //on log la réponse, tap = console log pour Observable
      catchError((error) => this.handleError(error, [])) //on retourne Observable vide si erreur
      )
  }

  getUserInfos(id: number): Observable<User> { 
    return this.http.get<User>(`${environment.apiUrl}users/${id}`).pipe(
      tap((response) => this.log(response)), //on log la réponse, tap = console log pour Observable
      catchError((error) => this.handleError(error, [])) //on retourne Observable vide si erreur
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

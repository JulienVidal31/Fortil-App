import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './users.interface';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> { 
    return this.http.get<User[]>('http://localhost:3000/users').pipe(
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

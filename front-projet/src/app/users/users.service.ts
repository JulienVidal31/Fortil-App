import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './users.interface';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> { //Observable : donnée qui arrive dans le temps contenant un tableau de pokemons = flux
    return this.http.get<User[]>('http://localhost:3000/users').pipe( //requete http avec méthode get d'angular, à l'url api/pokemons
      tap((response) => this.log(response)), //on log la réponse, tap = console log pour Observable
      catchError((error) => this.handleError(error, [])) //on retourne Observable vide si erreur
      )
  }

  private log(response: any) { //fonction se répétant dans les fonction getPokemonList et getPokemonById
    console.table(response)
  }

  private handleError(error: Error, errorValue: any) { //fonction se répétant dans les fonction getPokemonList et getPokemonById
    console.log(error)
    return of(errorValue) //on retourne Observable vide si erreur
  }


}

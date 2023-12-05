import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Annonce } from './annonces.interface';
import { Observable, catchError, of, tap } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AnnoncesService {

  annonceToUpdate!: Annonce //on récupère dans cette variable les données de l'annonce que l'on veut mettre à jour (transit du composant annonce-by-user vers add-annonce)

  constructor(private http: HttpClient) { }

  getAnnonces(): Observable<Annonce[]> {
    const token = localStorage.getItem('token') //a récupérer dans service authService
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
    }
    return this.http.get<Annonce[]>(`${environment.apiUrl}annonces`, httpOptions).pipe(
      tap((response) => this.log(response)), //on log la réponse, tap = console log pour Observable
      catchError((error) => this.handleError(error, [])) //on retourne Observable vide si erreur
      )
  }

  getAnnoncesById(annoncesId: number): Observable<Annonce> {
    return this.http.get<Annonce>(`${environment.apiUrl}annonces/${annoncesId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    )
  }

  getAnnoncesByUserId(UserId: number): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${environment.apiUrl}annonces/user/${UserId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    )
  }

  addAnnonce(annonce: Annonce): Observable<Annonce> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.post<Annonce>(`${environment.apiUrl}annonces/create`, annonce, httpOptions).pipe( //on passe dans l'url le corps de la requete (annonce) et un headers
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    )
  }

  deleteAnnonce(annonce: Annonce): Observable<Annonce> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.delete<Annonce>(`${environment.apiUrl}annonces/${annonce.id}`).pipe( //on passe dans l'url le corps de la requete (annonce) et un headers
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    )
  }

  updateAnnonce(annonce: Annonce): Observable<Annonce> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.patch<Annonce>(`${environment.apiUrl}annonces/${annonce.id}`, annonce, httpOptions).pipe( //on passe dans l'url le corps de la requete (annonce) et un headers
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
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

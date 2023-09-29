import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Annonce } from './annonces.interface';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnoncesService {

  constructor(private http: HttpClient) { }

  getAnnonces(): Observable<Annonce[]> { 
    return this.http.get<Annonce[]>('http://localhost:3000/annonces').pipe(
      tap((response) => this.log(response)), //on log la réponse, tap = console log pour Observable
      catchError((error) => this.handleError(error, [])) //on retourne Observable vide si erreur
      )
  }

  getAnnoncesById(annoncesId: number): Observable<Annonce> {
    return this.http.get<Annonce>(`http://localhost:3000/annonces/id/${annoncesId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
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

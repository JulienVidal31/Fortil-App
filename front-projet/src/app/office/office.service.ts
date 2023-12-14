import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { environment } from '../environment';
import { Office } from './office.interface';
import { Reservation } from './reservation.interface';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  constructor(private http: HttpClient) { }

  getOffices(): Observable<Office[]> {
    return this.http.get<Office[]>(`${environment.apiUrl}offices`).pipe(
      tap((response) => this.log(response)), //on log la réponse, tap = console log pour Observable
      catchError((error) => this.handleError(error, [])) //on retourne Observable vide si erreur
      )
  }

  createReservation(reservation: {}, userId: number, officeId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.post<any>(`${environment.apiUrl}reservations/${userId}/reserve/${officeId}`, reservation, httpOptions).pipe( //on passe dans l'url le corps de la requete (annonce) et un headers
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, error))
    )
  }

  cancelReservation(userId: number, reservationId: number) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.delete<any>(`${environment.apiUrl}reservations/${userId}/cancel/${reservationId}`, httpOptions).pipe( //on passe dans l'url le corps de la requete (annonce) et un headers
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, error))
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

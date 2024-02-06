import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WelcomePageService {

  constructor(private http: HttpClient) { }

  getMeteoToulouse(): Observable<{}> {
    //TEST AVEC site 1 : pas top car pas de logo
    // const params = new HttpParams() //Construction des paramètres de la requête
    // .set('token', 'e7e0e21af2f0feb780e416e039e9c67ecd657fa001143551499466fdb64e83d3') //token de l'API
    // .set('insee', '31555'); //code insee de la ville de Toulouse
    // const options = {   // Options formatées pour la requête HTTP
    //   params: params
    // };
    // return this.http.get(`https://api.meteo-concept.com/api/forecast/daily/0`, options).pipe(
    
    //TEST AVEC site 2 openweather : logo ok
    const ApiKey = '63b86ccc6d55c58d81196cac6a504f01'
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=Toulouse&appid=${ApiKey}&lang=fr&units=metric`).pipe(
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

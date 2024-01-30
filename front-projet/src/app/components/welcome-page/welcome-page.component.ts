import { Component } from '@angular/core';
import { WelcomePageService } from './welcome-page.service';

@Component({
  selector: 'app-welcome-page',
  styleUrls: ['./welcome-page.component.css'],
  template: `
  <div nz-row>
    <div class="left-divider" nz-col nzSpan="6">
      <div class="weather-card">
        <div class="weather-info">
          <img class="weather-logo" [src]="image_url" alt="Logo Météo">
          <div class="weather-details" *ngIf="meteoToulouseDatas">
            <h3>Météo {{ meteoToulouseDatas.name }}</h3>
            <h4>{{ meteoToulouseDatas.weather[0].description | titlecase}} - {{ meteoToulouseDatas.main.temp }} °C</h4>
            <h5>Min : {{ meteoToulouseDatas.main.temp_min }} - Max : {{ meteoToulouseDatas.main.temp_max }}</h5>
          </div>
        </div>
      </div>
      <iframe class="map" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11559.268567100306!2d1.489745!3d43.589525!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aea3405d835ec7%3A0xcc7d9c8b9a636c34!2sFortil%20Toulouse!5e0!3m2!1sfr!2sfr!4v1706623027050!5m2!1sfr!2sfr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    <div nz-col nzSpan="17" nzOffset="1">
        <h1>Bienvenue sur la plate-forme de l'agence Fortil SO !</h1>
        <img class="welcome-img" src="assets/images/img-welcome-page.jpg" alt="">
        <p>Postez vos annonces (services, covoiturages, dons ou ventes...) directement via la rubrique <b>"ANNONCES"</b>.</p>
        <p>Vous pouvez aussi réserver votre bureau pour une date souhaitée dans vos locaux de Balma (2 Rue Jean Giono, 31130 Balma) via la rubrique <b>"RESERVATION BUREAU"</b>.</p>
    </div>
  </div>
`,
})
export class WelcomePageComponent {

  meteoToulouseDatas!: any
  image_url!: any

  constructor(
    private welcomePageService: WelcomePageService, 
  ) {}

  ngOnInit() {
    this.getMeteoToulouse()
    // console.log(this.meteoToulouseDatas.weather[0].description)
  }

  getMeteoToulouse() {
    this.welcomePageService.getMeteoToulouse()
    .subscribe((response: any) => {
      this.meteoToulouseDatas = response,
      this.image_url = `https://openweathermap.org/img/wn/${this.meteoToulouseDatas.weather[0].icon}@2x.png`

      // if (response.status != 201) {
      // } else if (response.status === 201) {
      // }
    })
  }


}

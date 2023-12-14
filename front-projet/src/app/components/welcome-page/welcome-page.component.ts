import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-page',
  template: `
  <h1>Bienvenue sur la page d'accueil Fortil !</h1>
  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.816942207706!2d1.4871702748301419!3d43.58952915654861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aea3405d835ec7%3A0xcc7d9c8b9a636c34!2sFortil%20Toulouse!5e0!3m2!1sfr!2sfr!4v1701875925006!5m2!1sfr!2sfr" width="500" height="200" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
`,
})
export class WelcomePageComponent {}

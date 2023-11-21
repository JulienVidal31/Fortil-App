import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  constructor(
    private router: Router,
    readonly authService: AuthService
  ) { }
  
  nameLabel = this.authService.getNameUser()

  // getNameUser() {
  //   const token = this.authService.getToken()
  //   if(token) {
  //     const name = this.authService.decodeToken(token).name
  //   return name
  //   }
  // }

  // nameLabel!: string | null
  // ngOnInit() {
  //   const token = this.authService.getToken()
  //   if(token) {
  //     this.nameLabel = this.authService.decodeToken(token).name
  //   }
  //   // console.log('nom', this.nameLabel)
  // }

  goToAnnonces() {
    this.router.navigate(['/annonces'])
  }

  deconnexion() {
    localStorage.removeItem('token')
    this.router.navigate(['/signin'])
  }

  userIsLogin(): boolean {
    return this.authService.userIsLogin();
  }

}

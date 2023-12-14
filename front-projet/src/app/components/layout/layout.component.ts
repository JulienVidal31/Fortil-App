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
  ) {  }
  
  deconnexion() {
    localStorage.removeItem('token')
    this.router.navigate(['/signin'])
  }

  userIsLogin(): boolean {
    return this.authService.userIsLogin();
  }

}

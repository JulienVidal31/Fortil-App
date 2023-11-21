import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.userIsLogin()) {
      return true;
    } else {
      this.router.navigate(['/login']); // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      return false;
    }
  }
}
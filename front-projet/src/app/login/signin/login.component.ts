import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Signin } from './login.interface';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  signinData!: Signin
  errorMessageEmail: string = 'Veuillez saisir votre email'
  errorMessagePassword: string = 'Veuillez saisir votre mot de passe'

  constructor(
    private fb: NonNullableFormBuilder,
    private loginService: LoginService,
    private router: Router,
    private msg: NzMessageService,
  ) {}

  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    // remember: FormControl<boolean>;
  }> = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    // remember: [true]
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      // console.log('submit', this.validateForm.value);
      this.signinData = this.validateForm.value
      this.loginService.login(this.signinData)
      .subscribe((response) => {
        if (response.status === 401) {
          this.errorMessagePassword = 'Mot de passe incorrect'
          const passwordControl = this.validateForm.get('password'); // Obtenez le contrôle du mot de passe
          if (passwordControl) {
            passwordControl.setErrors({ 'incorrect': true }); // Définir une erreur personnalisée sur le contrôle
          }
        } else if (response.status === 404) {
          this.errorMessageEmail = 'Adresse email inconnue'
          const emailControl = this.validateForm.get('email'); // Obtenez le contrôle du mot de passe
          if (emailControl) {
            emailControl.setErrors({ 'incorrect': true }); // Définir une erreur personnalisée sur le contrôle
          }
        } else if (response.status === 201) {
          this.msg.success(`Connexion réussie !`);
          //this.router.navigate(['/annonces']) //après envoie du formulaire, on revient sur la page d'accueil
        }
        }
      );
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Signin } from './signin.interface';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  signinData!: Signin
  errorMessageEmail: string = 'Veuillez saisir votre email'
  errorMessagePassword: string = 'Veuillez saisir votre mot de passe'
  isVisibleModal: boolean = false;
  email?: string

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private router: Router,
    private msg: NzMessageService,
  ) {}

  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      // console.log('submit', this.validateForm.value);
      this.signinData = this.validateForm.value
      this.authService.signin(this.signinData)
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
          this.router.navigate(['/welcome-page']) //après envoie du formulaire, on revient sur la page d'accueil
        }
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  closeModal(): void {
    this.isVisibleModal = false;
  }

  getEmail() {
    this.email = this.validateForm.value.email //récupère les données de la carte
    // console.log(this.email)
    this.isVisibleModal = true; //ouvre la modal
  }


}

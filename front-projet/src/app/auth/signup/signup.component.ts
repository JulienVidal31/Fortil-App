import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Signup } from './signup.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {

  signupForm: FormGroup;
  // signupData!: Signup;
  errorMessageEmail: string = "Champs requis";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private msg: NzMessageService,
    ) {
      this.signupForm = this.fb.group({
        name: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        role: ['user'],
        confirmPassword: [null, [Validators.required]]
      });
    }

  submitForm(): void {
    if (this.signupForm.valid) {
      const matchPasswords = this.passwordMatchValidator(this.signupForm)
      
      if (matchPasswords) {
        const { confirmPassword, ...signupData } = this.signupForm.value; //destructuration de signupForm pour enlever confirmPassword avant envoie des données
        // console.log(signupData)
        this.authService.signup(signupData).subscribe((response) => {
          if (response.status === 409) {
            this.errorMessageEmail = 'Email déjà utilisé'
            const emailControl = this.signupForm.get('email');
            if (emailControl) {
              emailControl.setErrors({ 'incorrect': true }); // Définir une erreur personnalisée sur le contrôle
            }
          } else if (response.status === 201) {
            this.msg.success(`Inscription réussie !`);
            this.router.navigate(['/signin']) //après envoie du formulaire, on revient sur la page signin
          }
        })
      } else {
        const confirmPasswordControl = this.signupForm.get('confirmPassword');
        if (confirmPasswordControl) {
          confirmPasswordControl.setErrors({ 'incorrect': true }); // Définir une erreur personnalisée sur le contrôle
        }
      }
    
    }
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    const match = password === confirmPassword ? true : false;
    return match
  }
}

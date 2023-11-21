import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-reset-password-confirmation',
  templateUrl: './reset-password-confirmation.component.html',
})
export class ResetPasswordConfirmationComponent {

  newPasswordForm: FormGroup;
  errorMessageEmail: string = "Champs requis";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private msg: NzMessageService,
    ) {
      this.newPasswordForm = this.fb.group({
        email: ['', [Validators.required]],
        code: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmNewPassword: ['', [Validators.required]]
      });
    }

  submitForm(): void {
    console.log('test')
    if (this.newPasswordForm.valid) {
      console.log('test2')
      const matchPasswords = this.passwordMatchValidator(this.newPasswordForm)
      if (matchPasswords) {
        const { confirmNewPassword, ...newPasswordData } = this.newPasswordForm.value; //destructuration de signupForm pour enlever confirmPassword avant envoie des données
        console.log(newPasswordData)
        this.authService.resetPasswordConfirm(newPasswordData).subscribe((response) => {
          if (response.status === 404) {
            this.errorMessageEmail = 'Email introuvable'
            const emailControl = this.newPasswordForm.get('email');
            if (emailControl) {
              emailControl.setErrors({ 'incorrect': true }); // Définir une erreur personnalisée sur le contrôle
            }
          } else if (response.status === 401) {
            const codeControl = this.newPasswordForm.get('code');
            if (codeControl) {
              codeControl.setErrors({ 'incorrect': true }); // Définir une erreur personnalisée sur le contrôle
            }
          } else if (response.status === 201) {
            this.msg.success(`Changement du mot de passe réussi !`);
            this.router.navigate(['/signin']) //après envoie du formulaire, on revient sur la page signin
          }
        })
      } else {
        const confirmPasswordControl = this.newPasswordForm.get('confirmNewPassword');
        if (confirmPasswordControl) {
          confirmPasswordControl.setErrors({ 'incorrect': true }); // Définir une erreur personnalisée sur le contrôle
        }
      }
    
    }
  }

  passwordMatchValidator(group: FormGroup) {
    const newPassword = group.get('password')?.value;
    const confirmNewPassword = group.get('confirmNewPassword')?.value;
    const match = newPassword === confirmNewPassword ? true : false;
    return match
  }
}

import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-add-annonce',
  templateUrl: './add-annonce.component.html',

  styleUrls: ['./add-annonce.component.css']
})
export class AddAnnonceComponent {

  validateForm: FormGroup<{
    title: FormControl<string>;
    description: FormControl<string>;
    // categorie: FormControl<string>;
    // date: FormControl<Date>;
    // image: FormControl<string>;
  }>;

  submitForm(): void {
    console.log('submit', this.validateForm.value);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
  }

  // validateConfirmPassword(): void {
  //   setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  // }

  // userNameAsyncValidator: AsyncValidatorFn = (control: AbstractControl) =>
  //   new Observable((observer: Observer<ValidationErrors | null>) => {
  //     setTimeout(() => {
  //       if (control.value === 'JasonWood') {
  //         // you have to return `{error: true}` to mark it as an error event
  //         observer.next({ error: true, duplicated: true });
  //       } else {
  //         observer.next(null);
  //       }
  //       observer.complete();
  //     }, 1000);
  //   });

  // confirmValidator: ValidatorFn = (control: AbstractControl) => {
  //   if (!control.value) {
  //     return { error: true, required: true };
  //   } else if (control.value !== this.validateForm.controls.password.value) {
  //     return { confirm: true, error: true };
  //   }
  //   return {};
  // };

  constructor(private fb: NonNullableFormBuilder) {
    this.validateForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      // categorie: ['', [Validators.required]],
      // date: ['', [Validators.required]],
      // image: ['', [Validators.required]]
    });
  }

}

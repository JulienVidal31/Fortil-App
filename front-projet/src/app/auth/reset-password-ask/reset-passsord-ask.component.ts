import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ResetPasswordAsk } from './reset-password-ask.interface';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password-ask',
  templateUrl: './reset-passsord-ask.component.html'
})
export class ResetPasswordAskComponent {
  
  @Input() isVisibleModal = false;
  @Output() onClose = new EventEmitter<void>();
  // @Input() email?: string

  // emailToSendMail!: ResetPasswordAsk
  
  constructor(
    private authService: AuthService,
    private msg: NzMessageService,
    private fb: NonNullableFormBuilder,
  ) {}

  closeModal(): void {
    this.onClose.emit();
  }

  emailForm: FormGroup<{
    email: FormControl<string>;
  }> = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });
  
  sendEmail() {
    this.authService.resetPasswordAsk(this.emailForm.value)
      .subscribe((response) => {
        if (response.status === 404) {
          this.msg.error(`Adresse email introuvable`);
        } else if (response.status === 201) {
          this.msg.success(`Email de confirmation envoyé à ${this.emailForm.value.email}`)
          this.onClose.emit();
        }
      })
  }


}

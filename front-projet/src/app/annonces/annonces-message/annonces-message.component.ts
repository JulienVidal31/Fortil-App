import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Annonce } from '../annonces.interface';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AnnoncesService } from '../annonces.service';
import { AnnonceMessageInterface } from './annonces-message.interface';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-annonces-message',
  templateUrl: './annonces-message.component.html'
})
export class AnnoncesMessageComponent {
  
  @Input() isVisibleModal = false;
  @Output() onClose = new EventEmitter<void>();
  @Input() annonce!: Annonce
  messageToSend: string = ''

  constructor(
    private annoncesService: AnnoncesService,
    private authService: AuthService,
    private msg: NzMessageService
  ) {}

  closeModal(): void {
    this.messageToSend = '' //reinitialisation champs message
    this.onClose.emit();
  }

  sendMessage(): void {
    const token: string | null = this.authService.getToken() //récupération du token pour ensuite en extraire l'email de l'emmetteur de l'email
    const dataEmail: AnnonceMessageInterface = {
      emailSender: this.authService.decodeToken(token).email,
      emailTarget: this.annonce.user.email,
      message: this.messageToSend,
      title: this.annonce.title
    }
    // console.log(dataEmail) //test

    this.annoncesService.sendEmailAnnonce(dataEmail)
    .subscribe((response) => {
      if (response.status != 201) {
        this.msg.error(`Echec de l'envoie de l'email...`);
      } else if (response.status === 201) {
        this.msg.success(`Email envoyé avec succès à ${dataEmail.emailTarget}`)
        this.closeModal()

      }
    })
        
  }


}

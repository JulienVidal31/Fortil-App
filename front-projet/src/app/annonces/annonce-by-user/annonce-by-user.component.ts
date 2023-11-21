import { Component } from '@angular/core';
import { Annonce } from '../annonces.interface';
import { AnnoncesService } from '../annonces.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-annonce-by-user',
  templateUrl: './annonce-by-user.component.html'
})
export class AnnonceByUserComponent {

  annoncesList!: Annonce[]
  annonce!: Annonce
  userId!: number

  constructor(
    private annoncesService: AnnoncesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const token: string | null = this.authService.getToken()
    if(token) {
      this.userId = this.authService.decodeToken(token).id;
      this.getAnnoncesByUserId(this.userId)
    }
    // this.annoncesService.getAnnoncesByUserId(this.userId)
    // .subscribe(annoncesList => this.annoncesList = annoncesList)
  }

  getAnnoncesByUserId(userID: number) {
    this.annoncesService.getAnnoncesByUserId(userID)
      .subscribe(annoncesList => this.annoncesList = annoncesList);
  }

  deleteConfirmation(annonce: Annonce) {
    // console.log(annonce)
    this.annoncesService.deleteAnnonce(annonce.id)
    .subscribe(() => this.getAnnoncesByUserId(this.userId)) //refresh annonces du user
  }
}

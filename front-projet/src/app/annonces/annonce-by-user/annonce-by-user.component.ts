import { Component } from '@angular/core';
import { Annonce } from '../annonces.interface';
import { AnnoncesService } from '../annonces.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-annonce-by-user',
  templateUrl: './annonce-by-user.component.html'
})
export class AnnonceByUserComponent {

  annoncesList!: Annonce[]
  annonceToUpdate!: Annonce
  userId!: number

  constructor(
    private annoncesService: AnnoncesService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    const token: string | null = this.authService.getToken()
    if(token) {
      this.userId = this.authService.decodeToken(token).id;
      this.getAnnoncesByUserId(this.userId)
    }
  }

  getAnnoncesByUserId(userID: number) {
    this.annoncesService.getAnnoncesByUserId(userID)
      .subscribe(annoncesList => this.annoncesList = annoncesList);
  }

  deleteConfirmation(annonce: Annonce) {
    // console.log(annonce)
    this.annoncesService.deleteAnnonce(annonce)
    .subscribe(() => this.getAnnoncesByUserId(this.userId)) //refresh annonces du user
  }

  updateAnnonce(annonce: Annonce) {
    //récupérer les données de l'annonce pour les pré-afficher dans le formulaire
    this.annoncesService.annonceToUpdate = annonce //on stocke dans la variable annonceToUpdate du service Annonce l'annonce à modifier     
    this.router.navigate(['/annonces/update'])
  }

}

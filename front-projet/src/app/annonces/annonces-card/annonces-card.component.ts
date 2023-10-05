import { Component, OnInit } from '@angular/core';
import { Annonce } from '../annonces.interface';
import { AnnoncesService } from '../annonces.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-annonces-card',
  templateUrl: './annonces-card.component.html',
  styleUrls: ['./annonces-card.component.css']
})
export class AnnoncesCardComponent implements OnInit {

  annoncesList!: Annonce[] //no initializer, pb ?
  annonce!: Annonce
  isVisibleModal: boolean = false;

  constructor(
    private annoncesService: AnnoncesService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.annoncesService.getAnnonces()
    .subscribe(annoncesList => this.annoncesList = annoncesList)
  }
  
  closeModal(): void {
    this.isVisibleModal = false;
  }

  getAnnonceValue(annonce: any): void {
    console.log(annonce)
    this.annonce = annonce //récupère les données de la carte
    this.isVisibleModal = true; //ouvre la modal
  }

  goToAddAnnonces() {
    this.router.navigate(['/annonces/add'])
  }

}
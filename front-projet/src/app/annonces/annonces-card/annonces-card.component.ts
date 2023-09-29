import { Component, OnInit } from '@angular/core';
import { Annonce } from '../annonces.interface';
import { AnnoncesService } from '../annonces.service';

@Component({
  selector: 'app-annonces-card',
  templateUrl: './annonces-card.component.html'
})
export class AnnoncesCardComponent implements OnInit {

  annoncesList!: Annonce[] //no initializer, pb ?
  isVisible = false
  annonce!: Annonce

  constructor(
    private annoncesService: AnnoncesService
  ) {}

  ngOnInit() {
    this.annoncesService.getAnnonces()
    .subscribe(annoncesList => this.annoncesList = annoncesList)
  }
  
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    // console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    // console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  getAnnonceValue(annonce: Annonce): void {
    console.log(annonce)
    this.annonce = annonce
  }

}
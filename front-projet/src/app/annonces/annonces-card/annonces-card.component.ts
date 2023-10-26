import { Component, OnInit } from '@angular/core';
import { Annonce } from '../annonces.interface';
import { AnnoncesService } from '../annonces.service';
import { Router } from '@angular/router';
import { categories } from '../categories';

@Component({
  selector: 'app-annonces-card',
  templateUrl: './annonces-card.component.html',
  styleUrls: ['./annonces-card.component.css']
})
export class AnnoncesCardComponent implements OnInit {

  annoncesList!: Annonce[]
  annonce!: Annonce
  annoncesFilteredList: Annonce[] = this.annoncesList //copie des données originales
  isVisibleModal: boolean = false;
  selectedCategory: string | null = null // Variable pour stocker la catégorie sélectionnée
  // categories: string[] = categories.map(item => item.labelForForm)
  categories = categories

  constructor(
    private annoncesService: AnnoncesService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.annoncesService.getAnnonces()
    .subscribe(annoncesList => {
      this.annoncesList = annoncesList;
      this.annoncesFilteredList = annoncesList
    })
  }
  
  closeModal(): void {
    this.isVisibleModal = false;
  }

  getAnnonceValue(annonce: any): void {
    // console.log(annonce)
    this.annonce = annonce //récupère les données de la carte
    this.isVisibleModal = true; //ouvre la modal
  }

  goToAddAnnonces() {
    this.router.navigate(['/annonces/add'])
  }
  
  // Fonction de filtrage
  applyFilter(value: string): any[] {
    // console.log(this.selectedCategory)
    if (this.selectedCategory === null) {
      return this.annoncesList
    } else {
      return this.annoncesList.filter(annonce => annonce.categorie === value);
    }
  }

  onCategoryChange(value: string): void { // Fonction appelée lorsqu'une catégorie est sélectionnée
    // console.log('Catégorie sélectionnée : ', value);
    this.annoncesFilteredList = this.annoncesList; // Réinitialiser les données filtrées aux données d'origine
    this.annoncesFilteredList = this.applyFilter(value); // Appliquer le filtre sur les données d'origine
  }


}





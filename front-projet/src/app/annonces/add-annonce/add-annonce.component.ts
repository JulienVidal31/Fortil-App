import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { AnnoncesService } from '../annonces.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Annonce } from '../annonces.interface';

//CE MEME COMPOSANT EST UTILISE POUR AJOUTER ET METTRE A JOUR LES ANNONCES
@Component({
  selector: 'app-add-annonce',
  templateUrl: './add-annonce.component.html',
  styleUrls: ['./add-annonce.component.css']
})
export class AddAnnonceComponent {

  isAddForm!: boolean
  addAnnonceForm!: FormGroup;
  updateAnnonceData!: Annonce; //FormGroup ???
  optionsCategories = [ // Liste d'options pour le menu déroulant catégories
    { value: 'covoiturage', label: 'Covoiturage' },
    { value: 'service', label: 'Service' },
    { value: 'vente', label: 'Vente' },
    { value: 'autre', label: 'Autre' },
  ];
  selectedOption!: string //sert uniquement pour gérer l'affichage de Date dans formulaire
  userId!: number

  constructor(  
    private msg: NzMessageService,
    private annonceService: AnnoncesService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
    ) {
      // const token: string | null = this.authService.getToken()
      // if(token) {this.userId = this.authService.decodeToken(token).id}

      // if(this.isAddForm) {
      //   this.addAnnonceForm = this.fb.group({
      //     title: ['', [Validators.required]],
      //     description: ['', [Validators.required]],
      //     categorie: ['', [Validators.required]],
      //     date: [null],
      //     image: [null],
      //     user: [this.userId] //va chercher l'id du user connecté dans le token
      //   });
      // } else {
      //   this.addAnnonceForm = this.fb.group({
      //     title: ['titre', [Validators.required]],
      //     description: ['', [Validators.required]],
      //     categorie: ['', [Validators.required]],
      //     date: [null],
      //     image: [null],
      //     user: [this.userId] //va chercher l'id du user connecté dans le token
      //   });
      // }
    }

  ngOnInit(): void {
    this.isAddForm = this.router.url.includes('add') //on check si on est en mode ajour ou modif
    // console.log('isAdd :', this.isAddForm) //test
    //récupération de l'id du user
    const token: string | null = this.authService.getToken()
    if(token) {this.userId = this.authService.decodeToken(token).id}
    if(this.isAddForm) { //si on est en mode ajout
      this.addAnnonceForm = this.fb.group({
        title: ['', [Validators.required]],
        description: ['', [Validators.required]],
        categorie: ['', [Validators.required]],
        date: [null],
        image: [null],
        user: [this.userId] //va chercher l'id du user connecté dans le token
      });
    } else { //si on est en mode modif, on récupère les datas de l'annonce à modifier dans le composant gestions des annonces pour les pré-afficher dans le form
      this.updateAnnonceData = this.annonceService.annonceToUpdate
      this.selectedOption = this.annonceService.annonceToUpdate.categorie
      // console.log(this.updateAnnonceData) //test
      this.addAnnonceForm = this.fb.group({
        title: [this.updateAnnonceData.title, [Validators.required]],
        description: [this.updateAnnonceData.description, [Validators.required]],
        categorie: [this.selectedOption, [Validators.required]],
        date: [this.updateAnnonceData.date],
        image: [this.updateAnnonceData.image],
        user: [this.userId],
        id: [this.updateAnnonceData.id] //comparé à l'ajout, nécessite l'ajout de l'id de l'annonce pour la mettre a jour
      });
    }

  }

  submitForm(): void {
    if (this.isAddForm) { //si mode AJOUT d'annonce
      if (this.addAnnonceForm.valid) {
        // console.log(this.addAnnonceForm.value)
        if (!this.addAnnonceForm.value.image) { //si pas d'image, image par défaut
          this.addAnnonceForm.value.image = "annonce-sans-image.png"
        }
        if (this.addAnnonceForm.value.categorie == "covoiturage") { //si covoiturage, image covoit par défaut
          this.addAnnonceForm.value.image = "covoit2.jpg"
        }
        this.annonceService.addAnnonce(this.addAnnonceForm.value)
        .subscribe((response) => {
          if (response) {
            this.msg.success(`Publication de l'annonce réussie !`);
            this.router.navigate(['/annonces']) //après envoie du formulaire, on revient sur la page des annonces
          } else {
            this.msg.error(`La publication de l'annonce a échouée...`);
          }
        })
    }
    } else { //si mode MAJ d'annonce 
      if (this.addAnnonceForm.valid) {
        // console.log('maj :',this.addAnnonceForm.value)
        this.annonceService.updateAnnonce(this.addAnnonceForm.value)
        .subscribe((response) => {
          if (response) {
            this.msg.success(`Mise à jour de l'annonce réussie !`);
            this.router.navigate(['/annonces']) //après envoie du formulaire, on revient sur la page des annonces
          } else {
            this.msg.error(`La mise à jour à échouée...`);
          }
        })
      }
    }
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.addAnnonceForm.reset();
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.msg.success(`Chargement de ${info.file.name} réussi !`);
    } else if (info.file.status === 'error') {
      this.msg.error(`Chargement de ${info.file.name} échoué...`);
    }
    this.addAnnonceForm.value.image = info.file.name //on fait passer le nom de l'image dans le POST manuellement
  }

  onCategoryChange(value: string): void { // Fonction appelée lorsqu'une catégorie est sélectionnée
    // console.log('Catégorie sélectionnée : ', value); //test
    if (value != 'covoiturage')
    this.addAnnonceForm.get('date')!.setValue(null)
  }




}

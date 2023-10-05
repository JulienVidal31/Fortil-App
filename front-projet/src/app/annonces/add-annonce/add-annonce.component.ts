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

@Component({
  selector: 'app-add-annonce',
  templateUrl: './add-annonce.component.html',
  styleUrls: ['./add-annonce.component.css']
})
export class AddAnnonceComponent {

  addAnnonceForm: FormGroup;
  optionsCategories = [ // Liste d'options pour le menu déroulant catégories
    { value: 'Covoiturage', label: 'Covoiturage' },
    { value: 'Service', label: 'Service' },
    { value: 'Vente', label: 'Vente' },
    { value: 'Autre', label: 'Autre' },
  ];
  selectedOption: any //sert uniquement pour gérer l'affichage de Date dans formulaire

  constructor(
    private msg: NzMessageService,
    private annonceService: AnnoncesService,
    private router: Router,
    private fb: FormBuilder
    ) {
      this.addAnnonceForm = this.fb.group({
        title: ['', [Validators.required]],
        description: ['', [Validators.required]],
        categorie: ['', [Validators.required]],
        date: [null],
        image: [null],
        user: 2, //a rendre automatique par la suite avec l'autentification
      });
    }

  submitForm(): void {
    if (this.addAnnonceForm.valid) {
      console.log(this.addAnnonceForm.value)
      if (!this.addAnnonceForm.value.image) { this.addAnnonceForm.value.image = "annonce-sans-image.jpg" }//controle pour si pas d'image
      this.annonceService.addAnnonce(this.addAnnonceForm.value)
      .subscribe((response) => {
        if (response) {
          this.msg.success(`Publication de l'annonce réussie !`);
          this.router.navigate(['/annonces']) //après envoie du formulaire, on revient sur la page des annonces
        } else {
          this.msg.error(`La publication de l'annonce a échouée...`);
        }
      })
    } else {
      // Le formulaire est invalide, affichez un message d'erreur ou effectuez une autre action appropriée.
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





}

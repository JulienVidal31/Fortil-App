import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AnnoncesCardComponent } from './annonces-card/annonces-card.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { AddAnnonceComponent } from './add-annonce/add-annonce.component';
import { AnnoncesDetailComponent } from './annonces-detail/annonces-detail.component';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin'
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'; // Ajoutez le module du DatePicker
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import { AnnoncesService } from './annonces.service';


@NgModule({
  declarations: [
    AnnoncesCardComponent,
    LoaderComponent,
    AddAnnonceComponent,
    AnnoncesDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzCardModule,
    NzGridModule,
    NzListModule,
    NzIconModule,
    NzSpinModule,
    NzModalModule,
    NzButtonModule,
    NzFormModule,
    NzDatePickerModule,
    NzInputModule,
    NzSelectModule,
    NzUploadModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [AnnoncesService]
})
export class AnnoncesModule { }

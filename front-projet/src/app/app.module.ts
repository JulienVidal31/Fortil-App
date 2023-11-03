import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgZorroModule } from './ng-zorro-antd.module';

import { LayoutComponent } from './components/layout/layout.component';
import { UserTableComponent } from './users/user-table/user-table.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AnnoncesDetailComponent } from './annonces/annonces-detail/annonces-detail.component';
import { AddAnnonceComponent } from './annonces/add-annonce/add-annonce.component';
import { LoaderComponent } from './components/loader/loader.component';
import { AnnoncesCardComponent } from './annonces/annonces-card/annonces-card.component';

import { AnnoncesService } from './annonces/annonces.service';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';

registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    UserTableComponent,
    SigninComponent,
    AnnoncesCardComponent,
    LoaderComponent,
    AddAnnonceComponent,
    AnnoncesDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgZorroModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    { provide: NZ_I18N, useValue: fr_FR },
    UsersService,
    AuthService,
    AnnoncesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

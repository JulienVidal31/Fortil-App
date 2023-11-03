import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnoncesCardComponent } from './annonces/annonces-card/annonces-card.component';
import { UserTableComponent } from './users/user-table/user-table.component';
import { AddAnnonceComponent } from './annonces/add-annonce/add-annonce.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SigninComponent } from './auth/signin/signin.component';

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' }, //route par défaut, qd ouverture site
  { path: 'signin', component: SigninComponent },
  { path: 'annonces', component: AnnoncesCardComponent },
  { path: 'annonces/add', component: AddAnnonceComponent },
  { path: 'users', component: UserTableComponent },
  // { path: '**', component: PageNotFoundComponent }, //** intercepte toutes les routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnoncesCardComponent } from './annonces/annonces-card/annonces-card.component';
import { UserTableComponent } from './users/user-table/user-table.component';
import { AddAnnonceComponent } from './annonces/add-annonce/add-annonce.component';

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' }, //route par défaut, qd ouverture site
  { path: 'annonces', component: AnnoncesCardComponent }, //route par défaut, qd ouverture site
  { path: 'annonces/add', component: AddAnnonceComponent }, //route par défaut, qd ouverture site
  { path: 'users', component: UserTableComponent }, //route par défaut, qd ouverture site
  // { path: '**', component: PageNotFoundComponent }, //** intercepte toutes les routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnoncesCardComponent } from './annonces/annonces-card/annonces-card.component';
import { UserTableComponent } from './users/user-table/user-table.component';
import { AddAnnonceComponent } from './annonces/add-annonce/add-annonce.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ResetPasswordConfirmationComponent } from './auth/reset-password-confirmation/reset-password-confirmation.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' }, //route par défaut, qd ouverture site
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'reset-password', component: ResetPasswordConfirmationComponent },
  { path: 'welcome-page', component: WelcomePageComponent },
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

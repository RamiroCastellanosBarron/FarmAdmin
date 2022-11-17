import { AccontModule } from './account/account.module';
import { AccountComponent } from './account/account.component';
import { LandingComponent } from './landing/landing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '', component: LandingComponent,
    loadChildren: () => import('./landing/landing.module').then(x => x.LandingModule)
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'account', component: AccountComponent,
    loadChildren: () => import('./account/account.module').then(x => x.AccontModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

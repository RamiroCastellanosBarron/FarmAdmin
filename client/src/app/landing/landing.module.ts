import { NavComponent } from './nav.component';
import { FooterComponent } from './footer.component';
import { LandingComponent } from './landing.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    LandingComponent,
    FooterComponent,
    NavComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
  ],
})
export class LandingModule { }

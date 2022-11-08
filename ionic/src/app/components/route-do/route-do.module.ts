import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouteDoPageRoutingModule } from './route-do-routing.module';
import { RouteDoPage } from './route-do.page';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavbarPageModule } from '../navbar/navbar.module';
import { MdbModule } from 'mdb-angular-ui-kit';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { RoutePageModule } from '../route/route.module';
import { RoutePlacePageModule } from '../route-place/route-place.module';
import { RouteDoStepFirstComponent } from './route-do-step-first/route-do-step-first.component';
import { RouteDoStepSecondComponent } from './route-do-step-second/route-do-step-second.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouteDoPageRoutingModule,
    MDBBootstrapModule,
    NavbarPageModule,
    MdbModule,
    MatSliderModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    RoutePageModule,
    RoutePlacePageModule,
    ReactiveFormsModule
  ],
  declarations: [
    RouteDoPage,
    RouteDoStepFirstComponent,
    RouteDoStepSecondComponent
  ]
})
export class RouteDoPageModule {}

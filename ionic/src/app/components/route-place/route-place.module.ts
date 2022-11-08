import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RoutePlacePageRoutingModule } from './route-place-routing.module';
import { RoutePlacePage } from './route-place.page';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavbarPageModule } from '../navbar/navbar.module';
import { RoutePlaceFormComponent } from './route-place-form/route-place-form.component';
import { RoutePlaceDoComponent } from './route-place-do/route-place-do.component';
import { RoutePlaceListComponent } from './route-place-list/route-place-list.component';
import { RoutePlaceInfoComponent } from './route-place-info/route-place-info.component';
import { RoutePlaceTableComponent } from './route-place-table/route-place-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoutePlacePageRoutingModule,
    MDBBootstrapModule,
    NavbarPageModule
  ],
  declarations: [
    RoutePlacePage,
    RoutePlaceFormComponent,
    RoutePlaceDoComponent,
    RoutePlaceListComponent,
    RoutePlaceInfoComponent,
    RoutePlaceTableComponent
  ],
  exports: [
    RoutePlaceDoComponent,
    RoutePlaceListComponent,
    RoutePlaceTableComponent
  ]
})
export class RoutePlacePageModule {}

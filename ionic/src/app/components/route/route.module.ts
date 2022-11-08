import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RoutePageRoutingModule } from './route-routing.module';
import { RoutePage } from './route.page';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatTabsModule } from '@angular/material/tabs';
import { NavbarPageModule } from '../navbar/navbar.module';
import { RouteFormComponent } from './route-form/route-form.component';
import { RouteTableComponent } from './route-table/route-table.component';
import { RouteConsultComponent } from './route-consult/route-consult.component';
import { RoutePlacePageModule } from '../route-place/route-place.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoutePageRoutingModule,
    MDBBootstrapModule,
    MatTabsModule,
    NavbarPageModule,
    RoutePlacePageModule
  ],
  declarations: [
    RoutePage, 
    RouteFormComponent, 
    RouteTableComponent, 
    RouteConsultComponent
  ],
  exports: [
    RouteFormComponent
  ]
})
export class RoutePageModule {}

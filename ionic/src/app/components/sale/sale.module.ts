import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SalePageRoutingModule } from './sale-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { NavbarPageModule } from '../navbar/navbar.module';
import { SalePage } from './sale.page';
import { SaleDoLinkComponent } from './sale-do-link/sale-do-link.component';
import { SaleFormComponent } from './sale-form/sale-form.component';
import { SaleTableComponent } from './sale-table/sale-table.component';
import { SaleConsultComponent } from './sale-consult/sale-consult.component';
import { SaleDetailPageModule } from '../sale-detail/sale-detail.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalePageRoutingModule,
    MDBBootstrapModule,
    MatTabsModule,
    MatStepperModule,
    NavbarPageModule,
    SaleDetailPageModule
  ],
  declarations: [SalePage,
    SaleDoLinkComponent, 
    SaleFormComponent,
    SaleTableComponent,
    SaleConsultComponent],
  exports: [
    SaleFormComponent, 
    SaleDoLinkComponent
  ]
})
export class SalePageModule {}

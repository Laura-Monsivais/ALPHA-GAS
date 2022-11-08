import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BuyPageRoutingModule } from './buy-routing.module';
import { BuyPage } from './buy.page';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavbarPageModule } from '../navbar/navbar.module';
import { BuyConsultComponent } from './buy-consult/buy-consult.component';
import { BuyTableComponent } from './buy-table/buy-table.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { BuyFormComponent } from './buy-form/buy-form.component';
import { BuyDetailTableComponent } from '../buy-detail/buy-detail-table/buy-detail-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuyPageRoutingModule,
    MDBBootstrapModule,
    MatStepperModule,
    NavbarPageModule,
    MatTabsModule
  ],
  declarations: [BuyPage, BuyTableComponent, BuyConsultComponent, BuyFormComponent, BuyDetailTableComponent],
  exports: [BuyFormComponent]
})
export class BuyPageModule {}

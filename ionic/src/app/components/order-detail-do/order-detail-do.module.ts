import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrderDetailDoPageRoutingModule } from './order-detail-do-routing.module';
import { OrderDetailDoPage } from './order-detail-do.page';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavbarPageModule } from '../navbar/navbar.module';
import { OrderDetailPageModule } from '../order-detail/order-detail.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderDetailDoPageRoutingModule,
    MDBBootstrapModule,
    NavbarPageModule,
    OrderDetailPageModule
  ],
  declarations: [OrderDetailDoPage]
})
export class OrderDetailDoPageModule {}

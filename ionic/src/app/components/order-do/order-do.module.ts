import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrderDoPageRoutingModule } from './order-do-routing.module';
import { OrderDoPage } from './order-do.page';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavbarPageModule } from '../navbar/navbar.module';
import { OrderPageModule } from '../order/order.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderDoPageRoutingModule,
    MDBBootstrapModule,
    NavbarPageModule,
    OrderPageModule
  ],
  declarations: [OrderDoPage]
})
export class OrderDoPageModule {}

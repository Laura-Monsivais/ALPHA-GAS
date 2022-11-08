import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrderPageRoutingModule } from './order-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { NavbarPageModule } from '../navbar/navbar.module';
import { OrderPage } from './order.page';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderTableComponent } from './order-table/order-table.component';
import { OrderConsultComponent } from './order-consult/order-consult.component';
import { OrderInfoComponent } from './order-info/order-info.component';
import { AddressPageModule } from '../address/address.module';
import { OrderDetailPageModule } from '../order-detail/order-detail.module';
import { SalePageModule } from '../sale/sale.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderPageRoutingModule,
    MDBBootstrapModule,
    MatListModule,
    MatTabsModule,
    NavbarPageModule,
    AddressPageModule,
    OrderDetailPageModule,
    SalePageModule
  ],
  declarations: [OrderPage, 
    OrderFormComponent, 
    OrderListComponent,
    OrderTableComponent, 
    OrderInfoComponent,
    OrderConsultComponent],
  exports: [OrderFormComponent, 
    OrderListComponent, 
    OrderInfoComponent,]
})
export class OrderPageModule {}

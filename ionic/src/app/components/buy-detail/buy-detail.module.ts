import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BuyDetailPageRoutingModule } from './buy-detail-routing.module';
import { BuyDetailPage } from './buy-detail.page';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BuyDetailListComponent } from './buy-detail-list/buy-detail-list.component';
import { BuyDetailDoComponent } from './buy-detail-do/buy-detail-do.component';
import { ProductPageModule } from '../product/product.module';
import { ServicePageModule } from '../service/service.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuyDetailPageRoutingModule,
    MDBBootstrapModule,
    ProductPageModule,
    ServicePageModule
  ],
  declarations: [BuyDetailPage, BuyDetailListComponent, BuyDetailDoComponent],
  exports: [BuyDetailDoComponent]
})
export class BuyDetailPageModule {}


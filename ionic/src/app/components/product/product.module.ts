import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductPageRoutingModule } from './product-routing.module';
import { ProductPage } from './product.page';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatTabsModule } from '@angular/material/tabs';
import { NavbarPageModule } from '../navbar/navbar.module';
import { ProductInsertComponent } from './product-insert/product-insert.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductImageComponent } from './product-image/product-image.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductConsultComponent } from './product-consult/product-consult.component';
import { ProductListComponent } from './product-list/product-list.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductPageRoutingModule,
    MDBBootstrapModule,
    MatTabsModule,
    NavbarPageModule
  ],
  declarations: [ProductPage, 
    ProductInsertComponent, 
    ProductFormComponent, 
    ProductTableComponent, 
    ProductUpdateComponent, 
    ProductImageComponent, 
    ProductCardComponent,
    ProductInfoComponent,
    ProductConsultComponent,
    ProductListComponent],
  exports: [ProductListComponent, ProductInfoComponent]
})
export class ProductPageModule {}

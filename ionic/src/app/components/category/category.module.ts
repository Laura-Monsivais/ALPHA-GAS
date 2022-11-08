import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CategoryPageRoutingModule } from './category-routing.module';
import { CategoryPage } from './category.page';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatTabsModule } from '@angular/material/tabs';
import { NavbarPageModule } from '../navbar/navbar.module';
import { CategoryInsertComponent } from './category-insert/category-insert.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryTableComponent } from './category-table/category-table.component';
import { CategoryUpdateComponent } from './category-update/category-update.component';
import { CategoryConsultComponent } from './category-consult/category-consult.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryPageRoutingModule,
    MDBBootstrapModule,
    MatTabsModule,
    NavbarPageModule
  ],
  declarations: [CategoryPage, CategoryInsertComponent, CategoryFormComponent, CategoryTableComponent, CategoryUpdateComponent,
    CategoryConsultComponent]
})
export class CategoryPageModule {}

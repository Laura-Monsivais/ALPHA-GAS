import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BusinessPageRoutingModule } from './business-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatTabsModule } from '@angular/material/tabs';
import { NavbarPageModule } from '../navbar/navbar.module';
import { BusinessPage } from './business.page';
import { BusinessFormComponent } from './business-form/business-form.component';
import { BusinessInsertComponent } from './business-insert/business-insert.component';
import { BusinessTableComponent } from './business-table/business-table.component';
import { BusinessConsultComponent } from './business-consult/business-consult.component';
import { BusinessUpdateComponent } from './business-update/business-update.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessPageRoutingModule, 
    MDBBootstrapModule,
    MatTabsModule,
    NavbarPageModule
  ],
  declarations: [BusinessPage,
    BusinessFormComponent, 
    BusinessInsertComponent, 
    BusinessTableComponent, 
    BusinessConsultComponent,
    BusinessUpdateComponent],
  exports: [BusinessTableComponent]
})
export class BusinessPageModule {}

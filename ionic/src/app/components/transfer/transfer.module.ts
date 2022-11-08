import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TransferPageRoutingModule } from './transfer-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatTabsModule } from '@angular/material/tabs';
import { NavbarPageModule } from '../navbar/navbar.module';
import { TransferPage } from './transfer.page';
import { TransferFormComponent } from './transfer-form/transfer-form.component';
import { TransferInsertComponent } from './transfer-insert/transfer-insert.component';
import { TransferTableComponent } from './transfer-table/transfer-table.component';
import { TransferConsultComponent } from './transfer-consult/transfer-consult.component';
import { TransferUpdateComponent } from './transfer-update/transfer-update.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferPageRoutingModule, 
    MDBBootstrapModule,
    MatTabsModule,
    NavbarPageModule
  ],
  declarations: [TransferPage,
    TransferFormComponent, 
    TransferInsertComponent, 
    TransferTableComponent, 
    TransferConsultComponent,
    TransferUpdateComponent]
})
export class TransferPageModule {}

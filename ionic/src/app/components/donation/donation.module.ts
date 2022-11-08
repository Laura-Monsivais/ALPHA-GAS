import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DonationPageRoutingModule } from './donation-routing.module';
import { DonationPage } from './donation.page';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavbarPageModule } from '../navbar/navbar.module';
import { DonationFormComponent } from './donation-form/donation-form.component';
import { DonationInsertComponent } from './donation-insert/donation-insert.component';
import { DonationTableComponent } from './donation-table/donation-table.component';
import { DonationConsultComponent } from './donation-consult/donation-consult.component';
import { DonationUpdateComponent } from './donation-update/donation-update.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonationPageRoutingModule,
    MDBBootstrapModule,
    NavbarPageModule,
    MatTabsModule
  ],
  declarations: [DonationPage,
    DonationFormComponent,
    DonationInsertComponent,
    DonationTableComponent,
    DonationConsultComponent,
    DonationUpdateComponent
  ]
})
export class DonationPageModule {}

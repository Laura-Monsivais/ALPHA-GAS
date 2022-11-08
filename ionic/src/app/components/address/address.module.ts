import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddressPageRoutingModule } from './address-routing.module';
import { AddressPage } from './address.page';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavbarPageModule } from '../navbar/navbar.module';
import { AddressInsertComponent } from './address-insert/address-insert.component';
import { AddressFormComponent } from './address-form/address-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddressPageRoutingModule,
    MDBBootstrapModule,
    NavbarPageModule
  ],
  declarations: [AddressPage, AddressInsertComponent, AddressFormComponent],
  exports: [AddressInsertComponent]
})
export class AddressPageModule {}

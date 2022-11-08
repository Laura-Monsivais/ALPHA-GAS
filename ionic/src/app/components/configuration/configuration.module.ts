import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConfigurationPageRoutingModule } from './configuration-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatTabsModule } from '@angular/material/tabs';
import { NavbarPageModule } from '../navbar/navbar.module';
import { ConfigurationPage } from './configuration.page';
import { UserPageModule } from '../user/user.module';
import { SubsidiaryPageModule } from '../subsidiary/subsidiary.module';
import { EnterprisePageModule } from '../enterprise/enterprise.module';
import { RolPageModule } from '../rol/rol.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigurationPageRoutingModule,
    MDBBootstrapModule,
    MatTabsModule,
    NavbarPageModule,
    UserPageModule,
    SubsidiaryPageModule,
    EnterprisePageModule,
    RolPageModule,
  ],
  declarations: [
    ConfigurationPage
  ]
})
export class ConfigurationPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RolPageRoutingModule } from './rol-routing.module';
import { RolPage } from './rol.page';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RolManualComponent } from './rol-manual/rol-manual.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RolPageRoutingModule,
    MDBBootstrapModule
  ],
  declarations: [RolPage, RolManualComponent],
  exports: [RolManualComponent]
})
export class RolPageModule {}

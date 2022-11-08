import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavbarBrandComponent } from './navbar-brand/navbar-brand.component';
import { NavbarTopComponent } from './navbar-top/navbar-top.component';
import { NavbarLeftComponent } from './navbar-left/navbar-left.component';
import { NavbarBottomComponent } from './navbar-bottom/navbar-bottom.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MDBBootstrapModule,
    RouterModule
  ],
  declarations: [NavbarBrandComponent,
    NavbarTopComponent,
    NavbarLeftComponent,
    NavbarBottomComponent],
  exports: [NavbarTopComponent,
    NavbarLeftComponent,
    NavbarBottomComponent]
})
export class NavbarPageModule {}

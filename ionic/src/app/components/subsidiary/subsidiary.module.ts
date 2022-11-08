import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { SubsidiaryPageRoutingModule } from "./subsidiary-routing.module";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { MatTabsModule } from "@angular/material/tabs";
import { NavbarPageModule } from "../navbar/navbar.module";
import { SubsidiaryPage } from "./subsidiary.page";
import { SubsidiaryLogoComponent } from "./subsidiary-logo/subsidiary-logo.component";
import { SubsidiaryOverlayComponent } from "./subsidiary-overlay/subsidiary-overlay.component";
import { SubsidiaryFormComponent } from "./subsidiary-form/subsidiary-form.component";
import { SubsidiaryInsertComponent } from "./subsidiary-insert/subsidiary-insert.component";
import { SubsidiaryTableComponent } from "./subsidiary-table/subsidiary-table.component";
import { SubsidiaryConsultComponent } from "./subsidiary-consult/subsidiary-consult.component";
import { SubsidiaryUpdateComponent } from "./subsidiary-update/subsidiary-update.component";
import { SubsidiaryProfileComponent } from "./subsidiary-profile/subsidiary-profile.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubsidiaryPageRoutingModule,
    MDBBootstrapModule,
    MatTabsModule,
    NavbarPageModule,
  ],
  declarations: [
    SubsidiaryPage,
    SubsidiaryLogoComponent,
    SubsidiaryOverlayComponent,
    SubsidiaryFormComponent,
    SubsidiaryInsertComponent,
    SubsidiaryTableComponent,
    SubsidiaryConsultComponent,
    SubsidiaryUpdateComponent,
    SubsidiaryProfileComponent],
  exports: [SubsidiaryTableComponent,
    SubsidiaryProfileComponent]
})
export class SubsidiaryPageModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { SelfConsumptionPageRoutingModule } from "./self-consumption-routing.module";
import { SelfConsumptionPage } from "./self-consumption.page";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { NavbarPageModule } from "../navbar/navbar.module";
import { SelfConsumptionTableComponent } from "./self-consumption-table/self-consumption-table.component";
import { SelfConsumptionFormComponent } from "./self-consumption-form/self-consumption-form.component";
import { SelfConsumptionInsertComponent } from "./self-consumption-insert/self-consumption-insert.component";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { SelfConsumptionUpdateComponent } from "./self-consumption-update/self-consumption-update.component";
import { SelfConsumptionConsultComponent } from "./self-consumption-consult/self-consumption-consult.component";
import { MatTabsModule } from "@angular/material/tabs";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelfConsumptionPageRoutingModule,
    MDBBootstrapModule,
    NavbarPageModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTabsModule
  ],
  declarations: [
    SelfConsumptionPage,
    SelfConsumptionTableComponent,
    SelfConsumptionFormComponent,
    SelfConsumptionInsertComponent,
    SelfConsumptionUpdateComponent,
    SelfConsumptionConsultComponent
  ],
})
export class SelfConsumptionPageModule {}

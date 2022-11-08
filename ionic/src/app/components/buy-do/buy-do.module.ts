import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { BuyDoPageRoutingModule } from "./buy-do-routing.module";
import { BuyDoPage } from "./buy-do.page";
import { NavbarPageModule } from "../navbar/navbar.module";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { MatStepperModule } from "@angular/material/stepper";
import { BuyDoStepFirstComponent } from "./buy-do-step-first/buy-do-step-first.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTabsModule } from "@angular/material/tabs";
import { MatListModule } from "@angular/material/list";
import { BuyDoStepSecondComponent } from "./buy-do-step-second/buy-do-step-second.component";
import { ProductPageModule } from "../product/product.module";
import { ServicePageModule } from "../service/service.module";
import { BuyDetailPageModule } from "../buy-detail/buy-detail.module";
import { BuyPageModule } from "../buy/buy.module";
import { BuyDoStepThirdComponent } from "./buy-do-step-third/buy-do-step-third.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuyDoPageRoutingModule,
    NavbarPageModule,
    MDBBootstrapModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatListModule,
    ProductPageModule,
    ServicePageModule,
    BuyDetailPageModule,
    BuyPageModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [
    BuyDoPage,
    BuyDoStepFirstComponent,
    BuyDoStepSecondComponent,
    BuyDoStepThirdComponent
  ],
})
export class BuyDoPageModule {}

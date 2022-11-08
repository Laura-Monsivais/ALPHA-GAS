import { Component, OnInit, Input } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { MatStepper } from "@angular/material/stepper";
import { Router } from "@angular/router";
import { Buy } from "../../interfaces/buy";
import { Enterprise } from "../../interfaces/enterprise";
import { Business } from "../../interfaces/business";
import { Subsidiary } from "../../interfaces/subsidiary";
import { Rol } from "../../interfaces/rol";
import { AuthenticationService } from "../../services/authentication.service";
import { BuyService } from "../../services/buy.service";
import { EnterpriseService } from "../../services/enterprise.service";
import { BusinessService } from "../../services/business.service";
import { SubsidiaryService } from "../../services/subsidiary.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-buy-do",
  templateUrl: "./buy-do.page.html",
  styleUrls: ["./buy-do.page.scss"],
})

export class BuyDoPage implements OnInit {
  isLinear = false;
  buy: Buy = {
    id: 0,
    name: "",
    provenance: "",
    transport: "",
    embarked_at: "",        
    enterpriseId: 0,
    businessId: 0,
    expected_destination_id: 0,
    destination_id: 0,
    downloaded_at: "",
    total: 0
  };
  rol: Rol = { id: 0, key: "", name: "" };
  enterprise: Enterprise = { id: 0, name: "" };
  business: Business = { id: 0, name: "", enterprise_id: 0, attention_id: 0 };
  subsidiary: Subsidiary = {
    id: 0, 
    name: "", 
    is_central: false,
    logo: null,
    logoFile: null,
    overlay: null,
    overlayFile: null,
    street: "",
    exterior: "",
    interior: null,
    postal_code: "",
    neighborhood: "",
    city: "",
    municipality: "",
    state: "",
    country: "",
    references: null,
    enterpriseId: 0, 
    business_id: 0
  };
  enterprises: any = [];
  businesses: any = [];
  expectedDestinations: any = [];
  destinations: any = [];
  buyDetailsProducts: any = [];
  buyDetailsServices: any = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  isLoading: boolean;
  changedBuy: boolean = false;
  detailBuyQuantity: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private buyService: BuyService,
    private enterpriseService: EnterpriseService,
    private businessService: BusinessService,
    private subsidiaryService: SubsidiaryService,
  ) {
    this.firstFormGroup = this.formBuilder.group({
      name: new FormControl("", [Validators.required]),
      expected_destination_id: new FormControl("", [Validators.required, Validators.min(1)])
    });
    this.secondFormGroup = this.formBuilder.group({
      detailBuyQuantity: new FormControl("", [
        Validators.required,
        Validators.min(1),
      ]),
    });
    this.thirdFormGroup = this.formBuilder.group({
      total: new FormControl("", [Validators.required, Validators.min(0)]),
    });
  }
  
  ngOnInit() {}
  ionViewDidEnter() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_dataBuy();
    this.method_getBuy();
  }
  ionViewDidLeave() {
    this.authenticationService.localStorage_setBuy({});
    this.authenticationService.localStorage_setBuyDetailProducts([]);
    this.authenticationService.localStorage_setBuyDetailServices([]);
  }
  
  method_nextStepperSecond(stepper: MatStepper) {
    this.firstFormGroup.get("name").setValue(this.buy.name);
    this.firstFormGroup.get("expected_destination_id").setValue(this.buy.expected_destination_id);
    if (this.firstFormGroup.valid) {
      console.log("Primer paso de compra valido");
      this.authenticationService.localStorage_setBuy(this.buy);
      stepper.next();
    } else {
      Swal.fire(
        "Primer paso de compra no valido",
        "Completa la información",
        "info"
      );
      console.log("Información formulario: ", this.firstFormGroup);
    }
  }
  method_dataBuy() {
    this.buy = this.authenticationService.localStorage_getBuy();
    this.buyDetailsProducts =
      this.authenticationService.localStorage_getBuyDetailProducts();
    this.buyDetailsServices =
      this.authenticationService.localStorage_getBuyDetailServices();
    this.detailBuyQuantity =
      this.buyDetailsProducts.length + this.buyDetailsServices.length;
  }
  method_getBuy() {
    this.method_getEnterprises();
    this.method_getBusinesses();
    this.method_getSubsidiaries();
    this.method_getSubsidiaries();
  }
  method_changedBuy(event: boolean) {
    this.changedBuy = event;
    if (this.changedBuy) {
      this.method_dataBuy();
      this.method_getBuy();
    }
  }
  method_getEnterprises(): void {
    this.enterpriseService.action_insideGetEnterprises({})
    .subscribe(
      (data) => { this.enterprises = data;},
      (error) => {console.log("Error action_getEnterprises: ",error);}
    );
  }
  method_getBusinesses(): void {
    this.businessService
      .action_getBusinesses({ enterprise_id: this.buy.enterpriseId })
      .subscribe(
        (data) => {
          this.businesses = data;
        },
        (error) => {
          console.log("Error action_getBusinesses: ", error);
        }
      );
  }
  method_getSubsidiaries(): void {
    this.subsidiaryService
      .action_getSubsidiaries({ business_id: this.buy.businessId})
      .subscribe(
        (data) => {
          this.expectedDestinations = data;
          this.destinations = data;
        },
        (error) => {
          console.log("Error action_getSubsidiaries: ", error);
        }
      );
  }
  method_previousStepperFirst(stepper: MatStepper) {
    stepper.previous();
  }
  method_nextStepperThird(stepper: MatStepper) {
    this.method_dataBuy();
    this.secondFormGroup
      .get("detailBuyQuantity")
      .setValue(this.detailBuyQuantity);
    if (this.secondFormGroup.valid) {
      console.log("Segundo paso de compra valido");
      this.buy.total = 0;
      this.buyDetailsProducts.forEach((element) => {
        this.buy.total += element.amount;
      });
      this.buyDetailsServices.forEach((element) => {
        this.buy.total += element.amount;
      });
      stepper.next();
    } else {
      Swal.fire(
        "Segundo paso de compra no valido",
        "Completa la información",
        "info"
      );
      console.log("Información formulario: ", this.secondFormGroup);
    }
  }
  method_previousStepperSecond(stepper: MatStepper) {
    stepper.previous();
  }
  method_doBuy(stepper: MatStepper) {
    this.isLoading = true;
    if (this.buy.id == 0) {
      this.buyService
        .action_insertBuy(
          this.buy,
          this.buyDetailsProducts,
          this.buyDetailsServices
        )
        .subscribe(
          (data) => {
            if (data == 200) {
              stepper.reset();
              this.isLoading = false;
              Swal.fire("Compra creada", "", "success");
              this.router.navigate(["buys", true]);
            } else {
              this.isLoading = false;
              Swal.fire("Compra no creada", "Intentalo de nuevo", "warning");
              console.log("Response action_insertBuy: ", data);
            }
          },
          (error) => {
            this.isLoading = false;
            Swal.fire("Compra no creada", "Reporta a un superior", "error");
            console.log("Error action_insertBuy: ", error);
          }
        );
    } else {
      this.buyService
        .action_updateBuy(
          this.buy,
          this.buyDetailsProducts,
          this.buyDetailsServices
        )
        .subscribe(
          (data) => {
            if (data == 200) {
              stepper.reset();
              this.isLoading = false;
              Swal.fire("Compra modificada", "", "success");
              this.router.navigate(["/buys", true]);
            } else {
              this.isLoading = false;
              Swal.fire(
                "Compra no modificada",
                "Intentalo de nuevo",
                "warning"
              );
              console.log("Response action_updateBuy: ", data);
            }
          },
          (error) => {
            this.isLoading = false;
            Swal.fire("Compra no modificada", "Reporta a un superior", "error");
            console.log("Error action_updateBuy: ", error);
          }
        );
    }
  }
}

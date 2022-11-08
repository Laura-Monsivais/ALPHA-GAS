import { Component, OnInit, Input } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { MatStepper } from "@angular/material/stepper";
import { Sale } from "../../interfaces/sale";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
import { EnterpriseService } from '../../services/enterprise.service';
import { BusinessService } from '../../services/business.service';
import { SubsidiaryService } from '../../services/subsidiary.service';
import { SessionService } from '../../services/session.service';
import { SaleService } from "../../services/sale.service";
import Swal from "sweetalert2";
import { Rol } from "../../interfaces/rol";

@Component({
  selector: "app-sale-do",
  templateUrl: "./sale-do.page.html",
  styleUrls: ["./sale-do.page.scss"],
})

export class SaleDoPage implements OnInit {
  isLinear = false;
  sale: Sale = {
    id: 0, 
    enterpriseId: 0,
    businessId: 0,
    subsidiaryId: 0,
    seller_id: 0, 
    client_id: null, 
    order_id: null, 
    total: 0
  };
  enterprises: any = [];
  businesses: any = [];
  subsidiaries: any = [];
  sessions: any = [];
  changedSale:boolean = false;
  firstFormGroup: FormGroup;
  saleDetailsNotInventories: any = [];
  saleDetailsPromotions: any = [];
  saleDetailsProducts: any = [];
  saleDetailsServices: any = [];
  secondFormGroup: FormGroup;
  detailSaleQuantity: number = 0;
  thirdFormGroup: FormGroup;
  isLoading: boolean;
  rol: Rol = { id: 0, key: "", name: "" };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private businessService: BusinessService,
    private subsidiaryService: SubsidiaryService,
    private sessionService: SessionService,  
    private saleService: SaleService
  ) {
    this.firstFormGroup = this.formBuilder.group({
      seller_id: new FormControl("", [Validators.required,
        Validators.min(1)])
    });
    this.secondFormGroup = this.formBuilder.group({
      detailSaleQuantity: new FormControl("", [
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
    this.method_dataSale();
  }
  ionViewDidLeave() {
    this.authenticationService.localStorage_setSale({});
    this.authenticationService.localStorage_setSaleDetailPromotions([]);
    this.authenticationService.localStorage_setSaleDetailProducts([]);
    this.authenticationService.localStorage_setSaleDetailServices([]);
  }

  method_dataSale(){
    this.sale = this.authenticationService.localStorage_getSale();
    this.method_getEnterprises();
    this.method_getBusinesses();
    this.method_getSubsidiaries();
    this.method_getSessions();
    this.saleDetailsNotInventories = this.authenticationService.localStorage_getSaleDetailNotInventories();
    this.saleDetailsPromotions = this.authenticationService.localStorage_getSaleDetailPromotions();
    this.saleDetailsProducts = this.authenticationService.localStorage_getSaleDetailProducts();
    this.saleDetailsServices = this.authenticationService.localStorage_getSaleDetailServices();
    this.detailSaleQuantity = this.saleDetailsPromotions.length + this.saleDetailsProducts.length +  this.saleDetailsServices.length;
  }
  method_getEnterprises(): void {
    this.enterpriseService.action_insideGetEnterprises({})
    .subscribe(
      (data) => { this.enterprises = data;},
      (error) => {console.log("Error action_getEnterprises: ",error);}
    );
  }
  method_getBusinesses(): void {
    this.businessService.action_getBusinesses({enterprise_id: this.sale.enterpriseId})
    .subscribe(
      (data) => { this.businesses = data;},
      (error) => {console.log("Error action_getBusinesses: ",error);}
    );
  }
  method_getSubsidiaries(): void {
    this.subsidiaryService.action_getSubsidiaries({business_id: this.sale.businessId})
    .subscribe(
      (data) => { this.subsidiaries = data;},
      (error) => {console.log("Error action_getSubsidiaries: ",error);}
    );
  }
  method_getSessions(): void {
    this.sessionService.action_getSessions({subsidiary_id: this.sale.subsidiaryId, sellers: true})
    .subscribe(
      (data) => { this.sessions = data;},
      (error) => {console.log("Error action_getSessions: ",error);}
    );
  }
  method_changedSale(event:boolean){
    this.changedSale = event;
    if(this.changedSale){
      this.method_dataSale();
    }
  }
  method_nextStepperSecond(stepper: MatStepper) {
    this.firstFormGroup.get("seller_id").setValue(this.sale.seller_id);
    if (this.firstFormGroup.valid) {
      this.authenticationService.localStorage_setSale(this.sale);
      this.method_changedSale(true);
      console.log("Primer paso de venta valido");
      stepper.next();
    } else {
      Swal.fire(
        "Primer paso de venta no valido",
        "Completa la información",
        "info"
      );
      console.log("Información formulario: ",this.firstFormGroup);
    }
  }
  method_previousStepperFirst(stepper: MatStepper) {
    stepper.previous();
  }
  method_nextStepperThird(stepper: MatStepper) {
    this.method_dataSale();
    this.secondFormGroup.get("detailSaleQuantity").setValue(this.detailSaleQuantity);
    if (this.secondFormGroup.valid) {
      this.sale.total = 0;
      this.saleDetailsPromotions.forEach((element) => {
        this.sale.total += element.amount;
      });
      this.saleDetailsProducts.forEach((element) => {
        this.sale.total += element.amount;
      });
      this.saleDetailsServices.forEach((element) => {
        this.sale.total += element.amount;
      });
      this.authenticationService.localStorage_setSale(this.sale);
      this.method_changedSale(true);
      console.log("Segundo paso de venta valido");    
      stepper.next();
    } else {
      Swal.fire(
        "Segundo paso de venta no valido",
        "Completa la información",
        "info"
      );
      console.log("Información formulario: ",this.secondFormGroup);
    }
  }
  method_previousStepperSecond(stepper: MatStepper) {
    stepper.previous();
  }
  method_doSale(stepper: MatStepper) {
    this.isLoading = true;
    if (this.sale.id == 0) {
      this.saleService
        .action_insertSale(
          this.sale,
          this.saleDetailsPromotions,
          this.saleDetailsProducts,
          this.saleDetailsServices
        )
        .subscribe(
          (data) => {
            if (data == 200) {
              stepper.reset();
              this.isLoading = false;
              Swal.fire("Venta creada", "", "success");
              this.router.navigate(["sales", true]);
            } else {
              this.isLoading = false;
              Swal.fire("Venta no creada", "Intentalo de nuevo", "warning");
              console.log("Response action_insertSale: ", data);
            }
          },
          (error) => {
            this.isLoading = false;
            Swal.fire("Ventas no creada", "Reporta a un superior", "error");
            console.log("Error action_insertSale: ", error);
          }
        );
    } else {
      this.saleService
        .action_updateSale(
          this.sale,
          this.saleDetailsPromotions,
          this.saleDetailsProducts,
          this.saleDetailsServices
        )
        .subscribe(
          (data) => {
            if (data == 200) {
              stepper.reset();
              this.isLoading = false;
              Swal.fire("Venta modificada", "", "success");
              this.router.navigate(["/sales", true]);
            } else {
              this.isLoading = false;
              Swal.fire("Venta no modificada", "Intentalo de nuevo", "warning");
              console.log("Response action_updateSale: ", data);
            }
          },
          (error) => {
            this.isLoading = false;
            Swal.fire("Venta no modificada", "Reporta a un superior", "error");
            console.log("Error action_updateSale: ", error);
          }
        );
    }
  }
}
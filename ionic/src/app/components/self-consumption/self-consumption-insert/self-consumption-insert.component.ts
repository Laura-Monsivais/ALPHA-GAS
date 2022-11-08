import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import { Selfconsumption } from "../../../interfaces/selfconsumption";
import { Enterprise } from "../../../interfaces/enterprise";
import { Business } from "../../../interfaces/business";
import { Subsidiary } from "../../../interfaces/subsidiary";
import { Route } from "../../../interfaces/route";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";
import { SelfConsumptionService } from "../../../services/self-consumption.service";
import { EnterpriseService } from "../../../services/enterprise.service";
import { BusinessService } from "../../../services/business.service";
import { SubsidiaryService } from "../../../services/subsidiary.service";
import { RouteService } from "../../../services/route.service";
import { ModalDirective } from "angular-bootstrap-md";
import { Rol } from "../../../interfaces/rol";
import Swal from "sweetalert2";

@Component({
  selector: "app-self-consumption-insert",
  templateUrl: "./self-consumption-insert.component.html",
  styleUrls: ["./self-consumption-insert.component.scss"],
})
export class SelfConsumptionInsertComponent implements OnInit {
  @ViewChild("selfconsumptionInsert") selfconsumptionInsert: ModalDirective;
  selfconsumption: Selfconsumption = {
    id: 0,
    enterpriseId: 0,
    businessId: 0,
    subsidiaryId: 0,
    categoryId: 0,
    productId: 0,
    productUnit: null,
    inventory_id: 0,
    inventoryTheoretical: null,
    quantity: 0,
    cost: 0,
    total: 0,
    route_id: 0,
    start: "",
    end: "",
    initial_mileage: 0,
    end_mileage: 0,
    performance: 0
  };
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
  route: Route = { 
    id: 0, 
    name: "",
    route_type_id: 0,
    maximum_capacity: 0,
    minimum_capacity: 0,
    enterpriseId: 0,
    businessId: 0,
    subsidiaryId: 0,
    seller_id: 0,
    cellphone: 0
  };
  enterprises: any = [];
  businesses: any = [];
  subsidiaries: any = [];
  categories: any = [];
  products: any = [];
  routes: any = [];
  selfconsumptionForm: FormGroup;
  isLoading: boolean = false;
  @Output() emitter_insertedSelfconsumption: EventEmitter<boolean> =
    new EventEmitter();
  @Input() gotSelfconsumptionsInInsert: boolean = false;
  rol: Rol = { id: 0, key: "", name: "" };

  constructor(
    private authenticationService: AuthenticationService,
    private selfconsumptionService: SelfConsumptionService,
    private enterpriseService: EnterpriseService,
    private businessService: BusinessService,
    private subsidiaryService: SubsidiaryService,
    private routeService: RouteService,
    private formBuilder: FormBuilder,
  ) {
    this.selfconsumptionForm = this.formBuilder.group({
      inventory_id: new FormControl("", [
        Validators.required,
        Validators.min(1)
      ]),
      quantity: new FormControl("", [
        Validators.required
      ]),
      cost: new FormControl("", [
        Validators.required
      ]),
      total: new FormControl("", [
        Validators.required
      ]),
      route_id: new FormControl("", [
        Validators.required,
        Validators.min(1)
      ]),
      start: new FormControl("", [
        Validators.required
      ]),
      end: new FormControl("", [
        Validators.required
      ]),
      initial_mileage: new FormControl("", [
        Validators.required
      ]),
      end_mileage: new FormControl("", [
        Validators.required
      ]),
      performance: new FormControl("", [
        Validators.required
      ]),
    });
  }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ngOnChanges() {
    if (this.gotSelfconsumptionsInInsert) {
      this.emitter_insertedSelfconsumption.emit(false);
    }
  }
  method_getSelfconsumption() {
    this.selfconsumptionInsert.show();
    this.method_getEnterprises();
    this.selfconsumption = {
      id: 0,
      enterpriseId: 0,
      businessId: 0,
      subsidiaryId: 0,
      categoryId: 0,
      productId: 0,
      productUnit: null,
      inventory_id: 0,
      inventoryTheoretical: null,
      quantity: 0,
      cost: 0,
      total: 0,
      route_id: 0,
      start: "",
      end: "",
      initial_mileage: 0,
      end_mileage: 0,
      performance: 0
    };
    switch (this.rol.key) {
      case "Super":
      break;
      case "Director":
        this.enterprise = this.authenticationService.localStorage_getEnterprise();
        this.selfconsumption.enterpriseId = this.enterprise.id;
        this.method_getBusinesses();
      break;
      case "Manager":
      break;
      case "Call_Center":
      break;
      case "Seller":
      break;
      case "Client":
      break;
      default:
      break;
    }
  }
  method_getEnterprises(): void {
    this.enterpriseService.action_insideGetEnterprises({}).subscribe(
      (data) => {
        this.enterprises = data;
      },
      (error) => {
        console.log("Error action_getEnterprises: ", error);
      }
    );
  }
  method_getBusinesses(): void {
    this.businessService
      .action_getBusinesses({
        enterprise_id: this.selfconsumption.enterpriseId,
      })
      .subscribe(
        (data) => {
          this.businesses = data;
        },
        (error) => {
          console.log("Error action_getBusinesses: ", error);
        }
      );
  }
  method_insertSelfconsumption() {
    this.selfconsumptionForm.get('inventory_id').setValue(this.selfconsumption.inventory_id);
    this.selfconsumptionForm.get('quantity').setValue(this.selfconsumption.quantity);
    this.selfconsumptionForm.get('cost').setValue(this.selfconsumption.cost);
    this.selfconsumptionForm.get('total').setValue(this.selfconsumption.total);
    this.selfconsumptionForm.get('route_id').setValue(this.selfconsumption.route_id);
    this.selfconsumptionForm.get('start').setValue(this.selfconsumption.start);
    this.selfconsumptionForm.get('end').setValue(this.selfconsumption.end);
    this.selfconsumptionForm.get('initial_mileage').setValue(this.selfconsumption.initial_mileage);
    this.selfconsumptionForm.get('end_mileage').setValue(this.selfconsumption.end_mileage);
    this.selfconsumptionForm.get('performance').setValue(this.selfconsumption.performance);
    if (this.selfconsumptionForm.valid) {
      this.isLoading = true;
      this.selfconsumptionService.action_insertSelfconsumption(this.selfconsumption)
      .subscribe(
        (data) => { 
          if(data == 200){
            this.selfconsumptionInsert.hide();
            this.isLoading = false;
            this.emitter_insertedSelfconsumption.emit(true);
            Swal.fire("Autoconsumo creado","",'success');
          } else {
            this.isLoading = false;
            Swal.fire("Autoconsumo no creado","Intentalo de nuevo",'warning');
            console.log("Response action_insertSelfconsumption: ",data);
          }
        },
        (error) => {
          this.isLoading = false;
          Swal.fire("Autoconsumo no creado","Reporta a un superior",'error');
          console.log("Error action_insertSelfconsumption: ",error);
        }
      );
    } else {
      Swal.fire("Autoconsumo no creado","Completa la información",'info');
      console.log("Información formulario: ",this.selfconsumptionForm);
    }
  }
}

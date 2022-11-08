import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from "@angular/core";
import { Rol } from "../../../interfaces/rol";
import { ModalDirective } from "angular-bootstrap-md";
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
import { CategoryService } from "../../../services/category.service";
import { ProductService } from "../../../services/product.service";
import { InventoryService } from "../../../services/inventory.service";
import { Selfconsumption } from "src/app/interfaces/selfconsumption";
import Swal from "sweetalert2";

@Component({
  selector: "app-self-consumption-update",
  templateUrl: "./self-consumption-update.component.html",
  styleUrls: ["./self-consumption-update.component.scss"],
})
export class SelfConsumptionUpdateComponent implements OnInit {
  rol: Rol = { id: 0, key: "", name: "" };
  @Input() selfconsumptionId: number;
  @Input() showedSelfconsumptionInUpdate: boolean = false;
  @ViewChild("selfconsumptionUpdate")
  public selfconsumptionUpdate: ModalDirective;
  selfconsumption: Selfconsumption = {
    id: 0,
    enterpriseId: 0,
    businessId: 0,
    subsidiaryId: 0,
    categoryId: 0,
    productId: 0,
    productUnit: "",
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
  enterprises: any = [];
  businesses: any = [];
  subsidiaries: any = [];
  categories: any = [];
  products: any = [];
  routes: any = [];
  selfconsumptionForm: FormGroup;
  isLoading: boolean = false;
  @Output() emitter_updatedSelfconsumption: EventEmitter<boolean> =
    new EventEmitter();
  @Input() gotSelfconsumptionInUpdate: boolean = false;
  @Output() emitter_gotSelfconsumptionInUpdate: EventEmitter<boolean> =
    new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private selfconsumptionService: SelfConsumptionService,
    private enterpriseService: EnterpriseService,
    private businessService: BusinessService,
    private subsidiaryService: SubsidiaryService,
    private routeService: RouteService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private inventoryService: InventoryService,
    private formBuilder: FormBuilder
  ) {
    this.selfconsumptionForm = this.formBuilder.group({
      id: new FormControl("", [
        Validators.required,
        Validators.min(1)
      ]),
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
    this.selfconsumption.id = this.selfconsumptionId;
  }
  ngOnChanges() {
    if (this.showedSelfconsumptionInUpdate) {
      this.method_getSelfconsumption();
      this.emitter_gotSelfconsumptionInUpdate.emit(true);
    } else {
      this.emitter_gotSelfconsumptionInUpdate.emit(false);
    }
    if (this.gotSelfconsumptionInUpdate) {
      this.emitter_updatedSelfconsumption.emit(false);
    }
  }

  method_getSelfconsumption(): void {
    this.selfconsumptionUpdate.show();
    this.method_getEnterprises();
    this.selfconsumptionService
      .action_getSelfconsumptions({ id: this.selfconsumptionId })
      .subscribe(
        (data) => {
          this.selfconsumption = data;
          this.method_getBusinesses();
          this.method_getSubsidiaries();
          this.method_getCategories();
          this.method_getRoutes();
          this.method_getProducts();
        },
        (error) => {
          console.log("Error action_getSelfconsumption: ", error);
        }
      );
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
  method_getSubsidiaries(): void {
    this.subsidiaryService
      .action_getSubsidiaries({ business_id: this.selfconsumption.businessId })
      .subscribe(
        (data) => {
          this.subsidiaries = data;
        },
        (error) => {
          console.log("Error action_getSubsidiaries: ", error);
        }
      );
  }
  method_getRoutes(): void {
    this.routeService
      .action_getRoutes({ subsidiaryId: this.selfconsumption.subsidiaryId })
      .subscribe(
        (data) => {
          this.routes = data;
        },
        (error) => {
          console.log("Error action_getRoutes: ", error);
        }
      );
  }
  method_getCategories(): void {
    this.categoryService
      .action_getCategories({ business_id: this.selfconsumption.businessId })
      .subscribe(
        (data) => {
          this.categories = data;
        },
        (error) => {
          console.log("Error action_getCategories: ", error);
        }
      );
  }
  method_getProducts() {
    this.productService
      .action_getProducts({ category_id: this.selfconsumption.categoryId })
      .subscribe(
        (data) => {
          this.products = data;
        },
        (error) => {
          console.log("Error action_getProducts: ", error);
        }
      );
  }
  method_updateSelfconsumption() {
    this.selfconsumptionForm.get('id').setValue(this.selfconsumption.id);
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
      this.selfconsumptionService
        .action_updateSelfconsumption(this.selfconsumption)
        .subscribe(
          (data) => {
            if (data == 200) {
              this.selfconsumptionUpdate.hide();
              this.isLoading = false;
              this.emitter_updatedSelfconsumption.emit(true);
              Swal.fire("Autoconsumo modificado", "", "success");
            } else {
              this.isLoading = false;
              Swal.fire(
                "Autoconsumo no modificado",
                "Intentalo de nuevo",
                "warning"
              );
              console.log("Response action_insertSelfconsumption: ", data);
            }
          },
          (error) => {
            this.isLoading = false;
            Swal.fire(
              "Autoconsumo no modificado",
              "Reporta a un superior",
              "error"
            );
            console.log("Error action_updateSelfconsumption: ", error);
          }
        );
    } else {
      Swal.fire("Autoconsumo no modificado", "Completa la información", "info");
      console.log("Información formulario: ", this.selfconsumptionForm);
    }
  }
}

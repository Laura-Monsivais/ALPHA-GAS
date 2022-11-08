import { Component, OnInit, Input, PipeTransform } from "@angular/core";
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { BusinessService } from "../../../services/business.service";
import { SubsidiaryService } from "../../../services/subsidiary.service";
import { RouteService } from "../../../services/route.service";
import { CategoryService } from "../../../services/category.service";
import { ProductService } from "../../../services/product.service";
import { InventoryService } from "../../../services/inventory.service";

@Component({
  selector: "app-self-consumption-form",
  templateUrl: "./self-consumption-form.component.html",
  styleUrls: ["./self-consumption-form.component.scss"],
})
export class SelfConsumptionFormComponent implements OnInit {
  @Input() selfconsumption: any;
  @Input() enterprises: any = [];
  @Input() businesses: any = [];
  @Input() subsidiaries: any = [];
  @Input() categories: any = [];
  @Input() products: any = [];
  @Input() routes: any = [];
  inventories: any = []; 
  rol: Rol = { id: 0, key: "", name: "" };

  constructor(
    private authenticationService: AuthenticationService,
    private businessService: BusinessService,
    private subsidiaryService: SubsidiaryService,
    private routeService: RouteService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private inventoryService: InventoryService
  ) {}

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  method_getBusinesses(): void {
    this.businessService.action_getBusinesses({enterprise_id: this.selfconsumption.enterpriseId})
    .subscribe(
      (data) => { this.businesses = data;},
      (error) => {console.log("Error action_getBusinesses: ",error);}
    );
  }  
  method_chageBusiness(): void {    
    this.method_getSubsidiaries();
    this.method_getCategories();
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
  method_getProducts(): void {
    this.productService
      .action_getProducts({ category_id: this.selfconsumption.categoryId, subsidiaryId: this.selfconsumption.subsidiaryId })
      .subscribe(
        (data) => {
          this.products = data;
        },
        (error) => {
          console.log("Error action_getProducts: ", error);
        }
      );
  }
  method_chageSubsidiary(): void {    
    this.method_getInventory();
    this.method_getRoutes();
  }
  method_getInventory() {
    this.inventoryService.action_getInventories({subsidiary_id: this.selfconsumption.subsidiaryId, 
      product_id: this.selfconsumption.productId})
    .subscribe(
      (data) => {
        this.inventories = data;
        if(this.inventories.length == 1){
          this.selfconsumption.inventory_id = data[0].id;
          this.selfconsumption.inventoryTheoretical = data[0].inventory_theoretical;
          this.selfconsumption.productUnit = data[0].productUnit;
          this.selfconsumption.cost = data[0].productCost;
        } else {
          this.selfconsumption.inventoryTheoretical = null;
          this.selfconsumption.productUnit = null;
          this.selfconsumption.cost = 0;
        }
      },
      (error) => {
        console.log("Error action_getInventories: ", error);
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
  method_chageQuantity(): void {    
    this.method_calculateTotal();
    this.method_calculatePerformance();
  }
  method_calculateTotal() {
    this.selfconsumption.total =
      this.selfconsumption.quantity * this.selfconsumption.cost;
  }
  method_calculatePerformance() {
    this.selfconsumption.performance =
    (this.selfconsumption.end_mileage - this.selfconsumption.initial_mileage) / 
    this.selfconsumption.quantity;
  }
}

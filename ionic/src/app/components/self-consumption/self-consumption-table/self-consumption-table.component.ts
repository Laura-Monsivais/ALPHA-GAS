import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import { BusinessService } from "../../../services/business.service";
import { SubsidiaryService } from "../../../services/subsidiary.service";
import { CategoryService } from "../../../services/category.service";
import { ProductService } from "../../../services/product.service";
import { RouteService } from "../../../services/route.service";
import { SelfConsumptionService } from "../../../services/self-consumption.service";
import Swal from "sweetalert2";
import {
  MdbTableDirective,
  MdbTablePaginationComponent,
} from "angular-bootstrap-md";

@Component({
  selector: "app-self-consumption-table",
  templateUrl: "./self-consumption-table.component.html",
  styleUrls: ["./self-consumption-table.component.scss"],
})
export class SelfConsumptionTableComponent implements OnInit {
  rol: Rol = { id: 0, key: "", name: "" };
  gotSelfconsumptionsInInsert: boolean = false;
  selfconsumption: any = { 
    search: null, 
    limit: 20, 
    enterpriseId: null,
    businessId: null,
    subsidiaryId: null,
    categoryId: null,
    productId: null,
    quantity: null,
    cost: null,
    total: null,
    route_id: null, 
    startStart: null, 
    startEnd: null,
    endStart: null, 
    endEnd: null,
    initial_mileage: null,
    end_mileage: null,
    performance: null, 
    createdAtStart: null, 
    createdAtEnd: null
  };
  isLoading: boolean = false;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  headsSort = [
    "id",
    "routeName",
    "time",
    "end",
    "enterpriseName",
    "businessName",
    "subsidiaryName",
    "productName",
    "quantity",
    "cost",
    "total",
    "created_at",
    "updated_at",
  ];
  heads = [
    "Opciones",
    "Ruta",
    "Tiempo",
    "Empresa",
    "Negocio",
    "Sucursal",
    "Producto",
    "Cantidad",
    "Costo",
    "Total",
    "Creado",
    "Modificado",
  ];
  enterprises: any = [];
  businesses: any = [];
  subsidiaries: any = [];
  categories: any = [];
  products: any = [];
  routes: any = [];
  selfconsumptions: any = [];
  selfconsumptionId: number = 1;
  showedSelfconsumptionInUpdate: boolean = false;
  showedSelfconsumptionInConsult: boolean = false;
  gotSelfconsumptionsInUpdate: boolean = false;
  previous: any = [];
  @ViewChild(MdbTablePaginationComponent, { static: true })
  mdbTablePagination: MdbTablePaginationComponent;

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private businessService: BusinessService,
    private subsidiaryService: SubsidiaryService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private routeService: RouteService,
    private selfconsumptionService: SelfConsumptionService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_getEnterprises();
    this.method_getBusinesses();
    this.method_getSubsidiaries();
    this.method_getCategories();
    this.method_getProducts();
    this.method_getRoutes();
    this.method_getSelfconsumptions(this.selfconsumption);
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }
  method_insertedSelfconsumption(event: boolean) {
    if (event) {
      this.method_getSelfconsumptions(this.selfconsumption);
      this.gotSelfconsumptionsInInsert = true;
    } else {
      this.gotSelfconsumptionsInInsert = false;
    }
  }
  method_exportSelfconsumptions() {
    this.selfconsumptionService.action_exportSelfconsumption({}).subscribe(
      (data) => {
        var url = (window.URL || window.webkitURL).createObjectURL(data);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = "EMURCIA_autoconsumos.xlsx";
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        Swal.fire(
          "Excel de autoconsumos no descargado",
          "Reporta a un superior",
          "error"
        );
        console.log("Error action_exportSelfConsumption: ", error);
      }
    );
  }
  method_searchSelfconsumptions() {
    if (!this.selfconsumption.search) {
      this.mdbTable.setDataSource(this.previous);
      this.selfconsumptions = this.mdbTable.getDataSource();
    }
    if (this.selfconsumption.search) {
      this.selfconsumptions = this.mdbTable.searchLocalDataBy(
        this.selfconsumption.search
      );
      this.mdbTable.setDataSource(this.mdbTable.getDataSource());
    }
  }
  method_searchAdvancedSelfconsumptions() {
    this.method_getSelfconsumptions(this.selfconsumption);
  }
  method_getEnterprises(): void {
    this.enterpriseService.action_insideGetEnterprises({})
    .subscribe(
      (data) => { this.enterprises = data;},
      (error) => {console.log("Error action_getEnterprises: ",error);}
    );
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
    this.subsidiaryService.action_getSubsidiaries({business_id: this.selfconsumption.businessId})
    .subscribe(
      (data) => { this.subsidiaries = data;},
      (error) => {console.log("Error action_getSubsidiaries: ",error);}
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
  method_getSelfconsumptions(request: any) {
    this.isLoading = true;
    this.selfconsumptionService.action_getSelfconsumptions(request).subscribe(
      (data) => {
        this.isLoading = false;
        this.selfconsumptions = data;
        this.mdbTable.setDataSource(this.selfconsumptions);
        this.selfconsumptions = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      },
      (error) => {
        this.isLoading = false;
        console.log("Error action_getSelfConsumptions: ", error);
      }
    );
  }
  method_showSelfconsumptionConsult(selfconsumptionId: number) {
    this.selfconsumptionId = selfconsumptionId;
    this.showedSelfconsumptionInConsult = true;
  }
  method_gotSelfconsumptionInConsult(event: boolean) {
    if (event) {
      this.showedSelfconsumptionInConsult = false;
    }
  }
  method_showSelfconsumptionUpdate(selfconsumptionId: number) {
    this.selfconsumptionId = selfconsumptionId;
    this.showedSelfconsumptionInUpdate = true;
  }
  method_gotSelfconsumptionInUpdate(event: boolean) {
    if (event) {
      this.showedSelfconsumptionInUpdate = false;
    }
  }
  method_updatedSelfconsumption(event: boolean) {
    if (event) {
      this.method_getSelfconsumptions(this.selfconsumption);
      this.gotSelfconsumptionsInUpdate = true;
    } else {
      this.gotSelfconsumptionsInUpdate = false;
    }
  }
}

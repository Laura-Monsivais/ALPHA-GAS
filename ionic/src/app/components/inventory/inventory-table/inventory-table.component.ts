import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { InventoryService } from "../../../services/inventory.service";
import { EnterpriseService } from "../../../services/enterprise.service";
import { BusinessService } from "../../../services/business.service";
import { SubsidiaryService } from "../../../services/subsidiary.service";
import { CategoryService } from "../../../services/category.service";
import { ProductService } from "../../../services/product.service";
import {
  MdbTableDirective,
  MdbTablePaginationComponent,
} from "angular-bootstrap-md";
import Swal from "sweetalert2";

@Component({
  selector: "app-inventory-table",
  templateUrl: "./inventory-table.component.html",
  styleUrls: ["./inventory-table.component.scss"],
})
export class InventoryTableComponent implements OnInit, AfterViewInit {
  rol: Rol = { id: 0, key: "", name: "" };
  gotInventoriesInInsert: boolean = false;
  inventory: any = {
    search: null,
    limit: 20,
    name: null,
    enterpriseId: null,
    businessId: null,
    subsidiary_id: null,
    categoryId: null,
    product_id: null,
    inventory_theoretical: null,
    inventoryReal: null,
    inventory_real: null,
    inventory_difference: null,
    buys: null,
    sales: null,
    selfconsumptions: null,
    donations: null,
    earning: null,
    createdAtStart: null,
    createdAtEnd: null,
  };
  isLoading: boolean = false;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  headsSort = [
    "id",
    "subsidiaryName",
    "productName",
    "inventory_theoretical",
    "inventory_real",
    "inventary_difference",
    "buys",
    "sales",
    "selfconsumptions",
    "donations",
    "earnings",
    "created_at",
    "updated_at",
  ];
  heads = [
    "Opciones",
    "Sucursal",
    "Producto",
    "Inventario teórico",
    "Inventario real",
    "Diferencia de inventario",
    "Compras",
    "Ventas",
    "Autoconsumos",
    "Donaciones",
    "Ganancia",
    "Creado",
    "Modificado",
  ];
  inventories: any = [];
  enterprises: any = [];
  businesses: any = [];
  subsidiaries: any = [];
  categories: any = [];
  products: any = [];
  inventoryId: number = 1;
  showedInventoryInUpdate: boolean = false;
  showedInventoryInConsult: boolean = false;
  gotInventoriesInUpdate: boolean = false;
  previous: any = [];
  @ViewChild(MdbTablePaginationComponent, { static: true })
  mdbTablePagination: MdbTablePaginationComponent;

  constructor(
    private authenticationService: AuthenticationService,
    private inventoryService: InventoryService,
    private enterpriseService: EnterpriseService,
    private businessService: BusinessService,
    private subsidiaryService: SubsidiaryService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_getInventories(this.inventory);
    this.method_getEnterprises();
    this.method_getBusinesses();
    this.method_getSubsidiaries();
    this.method_getCategories();
    this.method_getProducts();
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }
  method_exportInventories() {
    this.inventoryService.action_exportInventories({}).subscribe(
      (data) => {
        var url = (window.URL || window.webkitURL).createObjectURL(data);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = "EMURCIA_inventarios.xlsx";
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        Swal.fire(
          "Excel de los inventarios no descargado",
          "Reporta a un superior",
          "error"
        );
        console.log("Error action_exportInventories: ", error);
      }
    );
  }
  method_searchInventories() {
    if (!this.inventory.search) {
      this.mdbTable.setDataSource(this.previous);
      this.inventories = this.mdbTable.getDataSource();
    }
    if (this.inventory.search) {
      this.inventories = this.mdbTable.searchLocalDataBy(this.inventory.search);
      this.mdbTable.setDataSource(this.mdbTable.getDataSource());
    }
  }
  method_searchAdvancedInventories() {
    this.method_getInventories(this.inventory);
  }
  method_getInventories(request: any) {
    this.isLoading = true;
    this.inventoryService.action_getInventories(request).subscribe(
      (data) => {
        this.isLoading = false;
        this.inventories = data;
        this.mdbTable.setDataSource(this.inventories);
        this.inventories = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      },
      (error) => {
        this.isLoading = false;
        console.log("Error action_getInventories: ", error);
      }
    );
  }
  method_showInventoryConsult(inventoryId: number) {
    this.inventoryId = inventoryId;
    this.showedInventoryInConsult = true;
  }
  method_gotInventoryInConsult(event: boolean) {
    if (event) {
      this.showedInventoryInConsult = false;
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
      .action_getBusinesses({ enterprise_id: this.inventory.enterpriseId })
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
    this.subsidiaryService.action_getSubsidiaries({}).subscribe(
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
      .action_getCategories({ business_id: this.inventory.businessId })
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
      .action_getProducts({ category_id: this.inventory.categoryId })
      .subscribe(
        (data) => {
          this.products = data;
        },
        (error) => {
          console.log("Error action_getProducts: ", error);
        }
      );
  }
  method_changeBusiness(): void {
    this.method_getSubsidiaries();
    this.method_getCategories();
  }
  method_addInventoryReal(inventoryId: number) {
    Swal.fire({
      icon: "warning",
      html: `<label>Inventario real:</label><br>
      <input type="number" id="inventory_real" class="swal2-input" value="0">
      <p>¿Estas seguro de modificar a este inventario?</p>`,
      confirmButtonColor: "#FFBB33",
      confirmButtonText: "Sí, estoy seguro",
      showCancelButton: true,
      cancelButtonText: "No, cancelar",
      focusConfirm: false,
      preConfirm: () => {
        var inventory_real = (<HTMLInputElement>document.getElementById("inventory_real")).value;
        if (!inventory_real) {
          Swal.showValidationMessage(`Campo requerido`);
        }
        return { inventory_real: inventory_real};
      },
    }).then(
      (result) => {
        if (result.isConfirmed) {
          let inventory_real = Number(result.value.inventory_real);
          this.inventoryService
            .action_updateInventory({
              id: inventoryId,
              inventory_real: inventory_real,
            })
            .subscribe((data) => {
              if (data == 200) {
                Swal.fire("Inventario modificado", "", "success");
                this.method_getInventories(this.inventory);
              } else {
                this.isLoading = false;
                Swal.fire(
                  "Inventario no modificado",
                  "Intentalo de nuevo",
                  "warning"
                );
                console.log("Response action_updateInventory: ", data);
              }
            });
        }
      },
      (error) => {
        this.isLoading = false;
        Swal.fire("Inventario no modificado", "Reporta a un superior", "error");
        console.log("Error action_updateInventory: ", error);
      }
    );
  }
}

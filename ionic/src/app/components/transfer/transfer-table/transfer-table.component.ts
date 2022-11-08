import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  Input,
} from "@angular/core";
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from "../../../services/enterprise.service";
import { BusinessService } from "../../../services/business.service";
import { SubsidiaryService } from "../../../services/subsidiary.service";
import { CategoryService } from "../../../services/category.service";
import { ProductService } from "../../../services/product.service";
import { TransferService } from "../../../services/transfer.service";
import {
  MdbTableDirective,
  MdbTablePaginationComponent,
} from "angular-bootstrap-md";
import { Subsidiary } from "src/app/interfaces/subsidiary";
import Swal from "sweetalert2";

@Component({
  selector: "app-transfer-table",
  templateUrl: "./transfer-table.component.html",
  styleUrls: ["./transfer-table.component.scss"],
})
export class TransferTableComponent implements OnInit {
  rol: Rol = { id: 0, key: "", name: "" };
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
  gotTransfersInInsert: boolean = false;
  transfer: any = {
    search: null,
    limit: 20,
    name: null,
    enterpriseId: null,
    businessId: null,
    originId: null,
    categoryId: null,
    productId: null,
    quantity: null,
    destination_id: null,
    createdAtStart: null,
    createdAtEnd: null,
  };
  isLoading: boolean = false;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  headsSort = [
    "id",
    "name",
    "enterpriseName",
    "businessName",
    "originName",
    "productName",
    "quantity",
    "destinationName",
    "status",
    "created_at",
    "updated_at",
  ];
  heads = [
    "Opciones",
    "Nombre",
    "Empresa",
    "Negocio",
    "Origen",
    "Producto",
    "Cantidad",
    "Destino",
    "Estatus",
    "Creado",
    "Modificado",
  ];
  enterprises: any = [];
  businesses: any = [];
  origins: any = [];
  categories: any = [];
  products: any = [];
  destinations: any = [];
  transfers: any = [];
  transferId: number = 1;
  showedTransferInConsult: boolean = false;
  showedTransferInUpdate: boolean = false;
  gotTransfersInUpdate: boolean = false;
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
    private transferService: TransferService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.subsidiary = this.authenticationService.localStorage_getSubsidiary();
    this.method_getEnterprises();
    this.method_getBusinesses();
    this.method_getSubsidiaries();
    this.method_getCategories();
    this.method_getProducts();
    this.method_getTransfers(this.transfer);
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  method_insertedTransfer(event: boolean) {
    if (event) {
      this.method_getTransfers(this.transfer);
      this.gotTransfersInInsert = true;
    } else {
      this.gotTransfersInInsert = false;
    }
  }
  method_exportTransfers() {
    this.transferService.action_exportTransfers({}).subscribe(
      (data) => {
        var url = (window.URL || window.webkitURL).createObjectURL(data);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = "EMURCIA_negocios.xlsx";
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        Swal.fire(
          "Excel de los negocios no descargado",
          "Reporta a un superior",
          "error"
        );
        console.log("Error action_exportTransfers: ", error);
      }
    );
  }
  method_searchTransfers() {
    if (!this.transfer.search) {
      this.mdbTable.setDataSource(this.previous);
      this.transfers = this.mdbTable.getDataSource();
    }
    if (this.transfer.search) {
      this.transfers = this.mdbTable.searchLocalDataBy(this.transfer.search);
      this.mdbTable.setDataSource(this.mdbTable.getDataSource());
    }
  }
  method_searchAdvancedTransfers() {
    this.method_getTransfers(this.transfer);
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
      .action_getBusinesses({ enterprise_id: this.transfer.enterpriseId })
      .subscribe(
        (data) => {
          this.businesses = data;
        },
        (error) => {
          console.log("Error action_getBusinesses: ", error);
        }
      );
  }
  method_chageBusiness(): void {
    this.method_getSubsidiaries();
    this.method_getCategories();
  }
  method_getSubsidiaries(): void {
    this.subsidiaryService
      .action_getSubsidiaries({ business_id: this.transfer.businessId })
      .subscribe(
        (data) => {
          this.origins = data;
          this.destinations = data;
        },
        (error) => {
          console.log("Error action_getSubsidiaries: ", error);
        }
      );
  }
  method_getCategories(): void {
    this.categoryService
      .action_getCategories({ business_id: this.transfer.businessId })
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
      .action_getProducts({ category_id: this.transfer.categoryId })
      .subscribe(
        (data) => {
          this.products = data;
        },
        (error) => {
          console.log("Error action_getProducts: ", error);
        }
      );
  }
  method_getTransfers(request: any) {
    this.isLoading = true;
    this.transferService.action_getTransfers(request).subscribe(
      (data) => {
        this.isLoading = false;
        this.transfers = data;
        this.mdbTable.setDataSource(this.transfers);
        this.transfers = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      },
      (error) => {
        this.isLoading = false;
        console.log("Error action_getTransfers: ", error);
      }
    );
  }
  method_showTransferConsult(transferId: number) {
    this.transferId = transferId;
    this.showedTransferInConsult = true;
  }
  method_gotTransferInConsult(event: boolean) {
    if (event) {
      this.showedTransferInConsult = false;
    }
  }
  method_showTransferUpdate(transferId: number) {
    this.transferId = transferId;
    this.showedTransferInUpdate = true;
  }
  method_gotTransferInUpdate(event: boolean) {
    if (event) {
      this.showedTransferInUpdate = false;
    }
  }
  method_updatedTransfer(event: boolean) {
    if (event) {
      this.method_getTransfers(this.transfer);
      this.gotTransfersInUpdate = true;
    } else {
      this.gotTransfersInUpdate = false;
    }
  }

  method_AcceptTransfer(transferId: number) {
    Swal.fire({
      title: "¿Estas seguro de aceptar a este traspaso?",
      icon: "warning",
      confirmButtonColor: "#FFBB33",
      confirmButtonText: "Sí, estoy seguro",
      showCancelButton: true,
      cancelButtonText: 'No, cancelar',
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.transferService
            .action_acceptTransfer({ id: transferId })
            .subscribe((data) => {
              Swal.fire("Aceptado", "", "success");
              this.method_getTransfers(this.transfer);
            });
        } else if( result.dismiss){
          Swal.fire("No aceptado", "", "error");
        }
      },
      (error) => {
        this.isLoading = false;
        Swal.fire("Traspaso no aceptado", "Reporta a un superior", "error");
        console.log("Error action_acceptTransfer: ", error);
      }
    );
  }
}

import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from "@angular/core";
import { Rol } from "../../../interfaces/rol";
import { Enterprise } from "../../../interfaces/enterprise";
import { Business } from "../../../interfaces/business";
import { Subsidiary } from "../../../interfaces/subsidiary";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import { BusinessService } from "../../../services/business.service";
import { SubsidiaryService } from "../../../services/subsidiary.service";
import { SessionService } from '../../../services/session.service';
import { SaleService } from "../../../services/sale.service";
import Swal from "sweetalert2";
import {
  MdbTableDirective,
  MdbTablePaginationComponent,
} from "angular-bootstrap-md";
import { Session } from "../../../interfaces/session";

@Component({
  selector: "app-sale-table",
  templateUrl: "./sale-table.component.html",
  styleUrls: ["./sale-table.component.scss"],
})
export class SaleTableComponent implements OnInit, AfterViewInit {
  enterprise: Enterprise = {id: 0, name: ""};
  business: Business = {id: 0, name: "", enterprise_id: 0, attention_id: 0};
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
  session: Session = {    
    id: 0, 
    user_id: 0, 
    userCellphone: 0,
    enterpriseId: 0, 
    businessId: 0, 
    subsidiary_id: 0, 
    rol_id: 0
  };
  rol: Rol = { id: 0, key: "", name: "" };
  detectIfInsertGotSales: boolean = false;
  sale: any = { 
    search: null, 
    limit: 20,
    enterpriseId: null, 
    businessId: null, 
    subsidiaryId: null, 
    seller_id: null,
    total: null,
    createdAtStart: null, 
    createdAtEnd: null
  };
  isLoading: boolean = false;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  headsSort = [
    "id",
    "sellerNameComplete",
    "clientNameComplete",
    "total",
    "created_at",
    "updated_at",
  ];
  heads = ["Opciones", "Vendedor", "Cliente", "Total", "Creado", "Modificado"];
  promotions: any = [];
  products: any = [];
  services: any = [];
  enterprises: any = [];
  businesses: any = [];
  subsidiaries: any = [];
  sessions: any = [];
  sales: any = [];
  saleId: number = 1;
  showedModalSaleConsult: boolean = false;
  showedModalSaleUpdate: boolean = false;
  gotSalesInUpdate: boolean = false;
  previous: any = [];
  @Input() getSales: Boolean;
  @ViewChild(MdbTablePaginationComponent, { static: true })
  mdbTablePagination: MdbTablePaginationComponent;
  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private businessService: BusinessService,
    private subsidiaryService: SubsidiaryService,
    private sessionService: SessionService,
    private saleService: SaleService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_getEnterprises();
    this.method_getBusinesses();
    this.method_getSubsidiaries();
    this.method_getSessions();
    this.method_getSales(this.sale);
  }
  ngOnChanges() {
    if (this.getSales) {
      this.method_getSales(this.sale);
    }
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  method_exportSales() {
    this.saleService.action_exportSales({}).subscribe(
      (data) => {
        var url = (window.URL || window.webkitURL).createObjectURL(data);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = "EMURCIA_ventas.xlsx";
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        Swal.fire(
          "Excel de las ventas no descargado",
          "Reporta a un superior",
          "error"
        );
        console.log("Error action_exportSales: ", error);
      }
    );
  }
  method_searchSales() {
    if (!this.sale.search) {
      this.mdbTable.setDataSource(this.previous);
      this.sales = this.mdbTable.getDataSource();
    }
    if (this.sale.search) {
      this.sales = this.mdbTable.searchLocalDataBy(this.sale.search);
      this.mdbTable.setDataSource(this.mdbTable.getDataSource());
    }
  }
  method_searchAdvancedSales() {
    this.method_getSales(this.sale);
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
  method_getSales(request: any) {
    this.isLoading = true;
    this.saleService.action_getSales(request).subscribe(
      (data) => {
        this.isLoading = false;
        this.sales = data;
        this.mdbTable.setDataSource(this.sales);
        this.sales = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      },
      (error) => {
        this.isLoading = false;
        console.log("Error action_getSales: ", error);
      }
    );
  }
  method_showModalSaleConsult(saleId: number) {
    this.saleId = saleId;
    this.showedModalSaleConsult = true;
  }
  method_detectIfGotSaleInConsult(event: boolean) {
    if (event) {
      this.showedModalSaleConsult = false;
    }
  }
}

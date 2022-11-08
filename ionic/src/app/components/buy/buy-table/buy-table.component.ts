import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
  Input,
} from "@angular/core";
import { Rol } from "../../../interfaces/rol";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../../services/authentication.service";
import { BuyService } from "../../../services/buy.service";
import { EnterpriseService } from "../../../services/enterprise.service";
import { BusinessService } from "../../../services/business.service";
import { SubsidiaryService } from "../../../services/subsidiary.service";
import { BuyDetailService } from "../../../services/buy-detail.service";
import {
  MdbTableDirective,
  MdbTablePaginationComponent,
} from "angular-bootstrap-md";
import Swal from "sweetalert2";
import { Enterprise } from "src/app/interfaces/enterprise";
import { Business } from "src/app/interfaces/business";
import { Subsidiary } from "src/app/interfaces/subsidiary";
@Component({
  selector: "app-buy-table",
  templateUrl: "./buy-table.component.html",
  styleUrls: ["./buy-table.component.scss"],
})
export class BuyTableComponent implements OnInit, AfterViewInit {
  rol: Rol = { id: 0, key: "", name: "" };
  buy: any = { search: null, limit: 20, name: null };
  isLoading: boolean = false;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  headsSort = [
    "id",
    "name",
    "enterpriseName",
    "businessName",
    "expectedDestinationName",
    "destinationName",
    "total",
    "created_at",
    "updated_at",
  ];
  heads = [
    "Opciones",
    "Factura",
    "Empresa",
    "Negocio",
    "Destino esperado",
    "Destino",
    "Total",
    "Creado",
    "Modificado",
  ];
  buys: any = [];
  buyId: number = 1;
  detectIfInsertGotBuys: boolean = false;
  showedModalBuyUpdate: boolean = false;
  showedModalBuyConsult: boolean = false;
  gotBuysInUpdate: boolean = false;
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
  previous: any = [];
  enterprises: any = [];
  businesses: any = [];
  subsidiaries: any = [];
  @Input() getBuys: Boolean;
  @ViewChild(MdbTablePaginationComponent, { static: true })
  mdbTablePagination: MdbTablePaginationComponent;

  constructor(
    private authenticationService: AuthenticationService,
    private buyService: BuyService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private buyDetailService: BuyDetailService,
    private enterpriseService: EnterpriseService,
    private businessService: BusinessService,
    private subsidiaryService: SubsidiaryService
  ) {}

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_getBuys(this.buy);
  }
  ngOnChanges() {
    if (this.getBuys) {
      this.method_getBuys(this.buy);
    }
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }
  method_detectIfInsertedBuys(event: boolean) {
    if (event) {
      this.method_getBuys(this.buy);
      this.detectIfInsertGotBuys = true;
    } else {
      this.detectIfInsertGotBuys = false;
    }
  }
  method_exportBuys() {
    this.buyService.action_exportBuys({}).subscribe(
      (data) => {
        var url = (window.URL || window.webkitURL).createObjectURL(data);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = "EMURCIA_compras.xlsx";
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        Swal.fire(
          "Excel de las compras no descargado",
          "Reporta a un superior",
          "error"
        );
        console.log("Error action_exportBuys: ", error);
      }
    );
  }
  method_searchBuys() {
    if (!this.buy.search) {
      this.mdbTable.setDataSource(this.previous);
      this.buys = this.mdbTable.getDataSource();
    }
    if (this.buy.search) {
      this.buys = this.mdbTable.searchLocalDataBy(this.buy.search);
      this.mdbTable.setDataSource(this.mdbTable.getDataSource());
    }
  }
  method_searchAdvancedBuys() {
    this.method_getBuys(this.buy);
  }
  method_getBuys(request: any) {
    this.isLoading = true;
    this.buyService.action_getBuys(request).subscribe(
      (data) => {
        this.isLoading = false;
        this.buys = data;
        this.mdbTable.setDataSource(this.buys);
        this.buys = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      },
      (error) => {
        this.isLoading = false;
        console.log("Error action_getPromotions: ", error);
      }
    );
  }
  method_showModalBuyConsult(buyId: number) {
    this.buyId = buyId;
    this.showedModalBuyConsult = true;
  }
  method_detectIfGotBuyInConsult(event: boolean) {
    if (event) {
      this.showedModalBuyConsult = false;
    }
  }
  method_goToBuyDo(buyId: number) {
    Swal.showLoading();
    if (buyId == 0) {
      var buy = {
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
      switch(this.rol.key){
        case 'Super':
        break;
        case 'Director':
          this.enterprise = this.authenticationService.localStorage_getEnterprise();
          buy.enterpriseId = this.enterprise.id;
        break;
        case 'Manager':
        break;
        case 'Call_Center':
        break;
        case 'Seller':
        break;
        case 'Client':
        break;
        default:
        break;
      }
      this.authenticationService.localStorage_setBuy(buy);
      this.router.navigate(["/buy-do", buyId])
      .then(() => {
        window.location.reload();
      });
    } else {
      var angularThis = this;
      this.buyService.action_getBuys({ id: buyId }).subscribe(
        (data) => {
          this.authenticationService.localStorage_setBuy(data);
          Promise.all([
            angularThis.method_buyDetailsProducts(buyId),
            angularThis.method_buyDetailsServices(buyId),
          ]).then(
            (results) => {
              angularThis.router.navigate(["/buy-do", buyId])
              .then(() => {
                window.location.reload();
              });
            },
            function (reason) {
              Swal.fire(
                "Compra no se puede modificar",
                "Reporta a un superior",
                "error"
              );
              console.log("Falla method_buyDetails: ", reason);
            }
          );
        },
        (error) => {
          console.log("Error action_getBuy: ", error);
        }
      );
    }
  }
  method_buyDetailsProducts(buyId: number) {
    var angularThis = this;
    return new Promise(function (resolve, reject) {
      angularThis.buyDetailService
        .action_getBuyDetails({
          buyId: buyId,
          products: true,
        })
        .subscribe(
          (data) => {
            angularThis.authenticationService.localStorage_setBuyDetailProducts(
              data
            );
            resolve(data);
          },
          (error) => {
            console.log("Error action_getBuyDetails: ", error);
            reject(error);
          }
        );
    });
  }
  method_buyDetailsServices(buyId: number) {
    var angularThis = this;
    return new Promise(function (resolve, reject) {
      angularThis.buyDetailService
        .action_getBuyDetails({
          buyId: buyId,
          services: true,
        })
        .subscribe(
          (data) => {
            angularThis.authenticationService.localStorage_setBuyDetailServices(
              data
            );
            resolve(data);
          },
          (error) => {
            console.log("Error action_getBuyDetails: ", error);
            reject(error);
          }
        );
    });
  }
}
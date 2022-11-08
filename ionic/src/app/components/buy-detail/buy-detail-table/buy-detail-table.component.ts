import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  Input,
} from "@angular/core";
import {
  MdbTablePaginationComponent,
  MdbTableDirective,
} from "angular-bootstrap-md";
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { BuyDetailService } from "../../../services/buy-detail.service";

@Component({
  selector: "app-buy-detail-table",
  templateUrl: "./buy-detail-table.component.html",
  styleUrls: ["./buy-detail-table.component.scss"],
})
export class BuyDetailTableComponent implements OnInit {
  @Input() buyId: number;
  rol: Rol = { id: 0, key: "", name: "" };
  buydetail: any = {
    search: null,
    limit: 20,
    name: null,
    quantity: null,
    density: null,
    conversion: null,
    amount: null,
  };
  @ViewChild(MdbTablePaginationComponent, { static: true })
  mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  headsSort = [
    "id",
    "name",
    "cost",
    "quantity",
    "density",
    "conversion",
    "amount",
    "created_at",
    "updated_at",
  ];
  heads = [
    "Opciones",
    "Nombre",
    "Costo",
    "Cantidad",
    "Densidad",
    "Conversion",
    "Monto",
    "Creado",
    "Modificado",
  ];
  buyDetails: any = [];
  previous: any = [];
  search: string = "";
  isLoading: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private buyDetailService: BuyDetailService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_getBuyDetails(this.buydetail);
  }
  ngOnChanges() {
    if (this.buyId != 0) {
      this.method_getBuyDetails(this.buydetail);
    }
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }
  method_searchBuyDetails() {
    if (!this.buydetail.search) {
      this.mdbTable.setDataSource(this.previous);
      this.buyDetails = this.mdbTable.getDataSource();
    }
    if (this.buydetail.search) {
      this.buyDetails = this.mdbTable.searchLocalDataBy(this.buydetail.search);
      this.mdbTable.setDataSource(this.mdbTable.getDataSource());
    }
  }
  method_searchAdvancedBuyDetails() {
    this.method_getBuyDetails(this.buydetail);
  }
  method_getBuyDetails(request: any) {
    this.isLoading = true;
    this.buyDetailService.action_getBuyDetails(request).subscribe(
      (data) => {
        this.isLoading = false;
        this.buyDetails = data;
        this.mdbTable.setDataSource(this.buyDetails);
        this.buyDetails = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      },
      (error) => {
        this.isLoading = false;
        console.log("Error action_getBuyDetails: ", error);
      }
    );
  }
}

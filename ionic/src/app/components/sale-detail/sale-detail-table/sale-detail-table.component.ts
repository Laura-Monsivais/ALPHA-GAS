import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { SaleDetailService } from '../../../services/sale-detail.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-sale-detail-table',
  templateUrl: './sale-detail-table.component.html',
  styleUrls: ['./sale-detail-table.component.scss'],
})
export class SaleDetailTableComponent implements OnInit , AfterViewInit {
  @Input() saleId: number;
  rol: Rol = {id: 0, key: "", name: ""};
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  headsSort = ['id', 'name', 'price', 'quantity', 'amount', 'created_at', 'updated_at'];
  heads = ['Opciones', 'Nombre', 'Precio', 'Cantidad', 'Monto', 'Creado', 'Modificado'];
  saleDetails: any = [];
  previous: any = [];
  search: string = '';
  isLoading: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private saleDetailService: SaleDetailService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_getSaleDetails();
  }    
  ngOnChanges() {
    if(this.saleId != 0){
      this.method_getSaleDetails();
    }
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  method_searchSaleDetails() {
    if (!this.search) {
      this.method_getSaleDetails();
    }
    if (this.search) {
        this.saleDetails = this.mdbTable.searchLocalDataBy(this.search);
        this.mdbTable.setDataSource(this.mdbTable.getDataSource());
    }
  }
  method_getSaleDetails(): void {
    this.isLoading = true;
    this.saleDetailService.action_getSaleDetails({sale_id: this.saleId})
    .subscribe(
      (data) => { 
        this.isLoading = false;
        this.saleDetails = data;
        this.mdbTable.setDataSource(this.saleDetails);
        this.saleDetails = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      },
      (error) => {
        this.isLoading = false;
        console.log("Error action_getSaleDetails: ",error);
      }
    );
  }
}

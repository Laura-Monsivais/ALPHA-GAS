import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { OrderDetailService } from '../../../services/order-detail.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-order-detail-table',
  templateUrl: './order-detail-table.component.html',
  styleUrls: ['./order-detail-table.component.scss'],
})
export class OrderDetailTableComponent implements OnInit, AfterViewInit {
  @Input() orderId: number;
  rol: Rol = {id: 0, key: "", name: ""};
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  headsSort = ['id', 'name', 'price', 'quantity', 'amount', 'created_at', 'updated_at'];
  heads = ['Opciones', 'Nombre', 'Precio', 'Cantidad', 'Monto', 'Creado', 'Modificado'];
  orderDetails: any = [];
  previous: any = [];
  search: string = '';
  isLoading: boolean = false;
  infoOrderShow: boolean = false

  constructor(
    private authenticationService: AuthenticationService,
    private orderDetailService: OrderDetailService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_getOrderDetails();
  }    
  ngOnChanges() {
    if(this.orderId != 0){
      this.method_getOrderDetails();
    }
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  method_searchOrderDetails() {
    if (!this.search) {
      this.method_getOrderDetails();
    }
    if (this.search) {
        this.orderDetails = this.mdbTable.searchLocalDataBy(this.search);
        this.mdbTable.setDataSource(this.mdbTable.getDataSource());
    }
  }
  method_getOrderDetails(): void {
    this.isLoading = true;
    this.orderDetailService.action_getOrderDetails({orderId: this.orderId})
    .subscribe(
      (data) => { 
        this.isLoading = false;
        this.orderDetails = data;
        this.mdbTable.setDataSource(this.orderDetails);
        this.orderDetails = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      },
      (error) => {
        this.isLoading = false;
        console.log("Error action_getOrderDetails: ",error);
      }
    );
  }
}

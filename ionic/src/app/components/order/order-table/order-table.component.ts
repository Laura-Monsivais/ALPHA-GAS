import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import { BusinessService } from "../../../services/business.service";
import { SubsidiaryService } from "../../../services/subsidiary.service";
import { SaleService } from "../../../services/sale.service";
import { OrderService } from '../../../services/order.service';
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
})

export class OrderTableComponent implements OnInit, AfterViewInit {
  rol: Rol = {id: 0, key: "", name: ""};
  order: any = {
    search: null, 
    limit: 20, 
    enterpriseId: null, 
    businessId: null, 
    subsidiaryId: null, 
    client: null, 
    observation: null, 
    address: null, 
    deliverAtStart: null, 
    deliverAtEnd: null,  
    total: null, 
    status: null, 
    code: null, 
    createdAtStart: null, 
    createdAtEnd: null
  };
  isLoading: boolean = false;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  headsSort = ['id', 'code', 'status', 'clientNameComplete', 'addressName', 'deliver_at', 'total', 'created_at', 'updated_at'];
  heads = ['Opciones', 'Código', 'Estatus', 'Cliente', 'Dirección', 'Entrega', 'Total', 'Creado', 'Modificado'];
  enterprises: any = [];
  businesses: any = [];
  subsidiaries: any = [];
  orders: any = [];
  orderId: number = 1;  
  showedModalOrderConsult: boolean = false;
  previous: any = [];
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  saleId: number = 1;

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private businessService: BusinessService,
    private subsidiaryService: SubsidiaryService,
    private orderService: OrderService,
    private saleService: SaleService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_getEnterprises();
    this.method_getBusinesses();
    this.method_getSubsidiaries();
    this.method_getOrders(this.order);
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  method_exportOrders() {
    this.orderService.action_exportOrders({})
    .subscribe(
      (data) => { 
        var url = (window.URL || window.webkitURL).createObjectURL(data);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = "EMURCIA_pedidos.xlsx";
        a.click();
        window.URL.revokeObjectURL(url);          
      },
      (error) => {
        Swal.fire("Excel de los pedidos no descargado","Reporta a un superior",'error');
        console.log("Error action_exportOrders: ",error);
      }
    );
  }
  method_searchOrders() {
    if (!this.order.search) {
      this.mdbTable.setDataSource(this.previous);
      this.orders = this.mdbTable.getDataSource()
    }
    if (this.order.search) {
      this.orders = this.mdbTable.searchLocalDataBy(this.order.search);
      this.mdbTable.setDataSource(this.mdbTable.getDataSource());
    }
  }
  method_searchAdvancedOrders() {
    this.method_getOrders(this.order);
  }
  method_getEnterprises(): void {
    this.enterpriseService.action_insideGetEnterprises({})
    .subscribe(
      (data) => { this.enterprises = data;},
      (error) => {console.log("Error action_getEnterprises: ",error);}
    );
  }  
  method_getBusinesses(): void {
    this.businessService.action_getBusinesses({enterprise_id: this.order.enterprise_id})
    .subscribe(
      (data) => { this.businesses = data;},
      (error) => {console.log("Error action_getBusinesses: ",error);}
    );
  }  
  method_getSubsidiaries(): void {
    this.subsidiaryService.action_getSubsidiaries({business_id: this.order.business_id})
    .subscribe(
      (data) => { this.subsidiaries = data;},
      (error) => {console.log("Error action_getSubsidiaries: ",error);}
    );
  }  
  method_getOrders(request: any) {
    this.isLoading = true;
    this.orderService.action_getOrders(request)
    .subscribe(
      (data) => { 
        this.isLoading = false;
        this.orders = data;
        this.mdbTable.setDataSource(this.orders);
        this.orders = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      },
      (error) => {
        this.isLoading = false;
        console.log("Error action_getOrders: ",error);
      }
    );
  }
  method_showModalOrderConsult(orderId:number){
    this.orderId = orderId;
    this.showedModalOrderConsult = true;    
  }
  method_detectIfGotOrderInConsult(event:boolean){
    if(event){
      this.showedModalOrderConsult = false;
    }
  }
  method_goToCart(orderId:number) {    
    this.router.navigate(["/cart",orderId]);
  }
}
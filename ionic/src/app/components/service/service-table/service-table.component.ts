import { Component, OnInit, AfterViewInit, OnChanges, ViewChild, Input, ChangeDetectorRef, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import { ServiceService } from '../../../services/service.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-service-table',
  templateUrl: './service-table.component.html',
  styleUrls: ['./service-table.component.scss'],
})
export class ServiceTableComponent implements OnInit, AfterViewInit {
  rol: Rol = {id: 0, key: "", name: ""};
  gotServicesInInsert: boolean = false;
  service: any = {search: null, limit: 20, name: null, description: null, cost: null, price: null, enterprise_id: null, createdAtStart: null, createdAtEnd: null};  
  enterprises: any = [];
  isLoading: boolean = false;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  headsSort = ['id', 'name', 'price', 'enterpriseName', 'created_at', 'updated_at'];
  heads = ['Opciones', 'Nombre', 'Precio', 'Empresa', 'Creado', 'Modificado'];  
  services: any = [];
  serviceId: number = 1;
  showedServiceInUpdate: boolean = false;
  showedServiceInConsult: boolean = false;
  gotServicesInUpdate: boolean = false;
  previous: any = [];
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private serviceService: ServiceService,
    private cdRef: ChangeDetectorRef
  ) { }
  
  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_getEnterprises();
    this.method_getServices(this.service);
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  method_insertedService(event:boolean) {
    if(event){
      this.method_getServices(this.service);
      this.gotServicesInInsert = true;
    } else {
      this.gotServicesInInsert = false;
    }
  }  
  method_exportServices() {
    this.serviceService.action_exportServices({})
    .subscribe(
      (data) => { 
        var url = (window.URL || window.webkitURL).createObjectURL(data);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = "EMURCIA_servivios.xlsx";
        a.click();
        window.URL.revokeObjectURL(url);          
      },
      (error) => {
        Swal.fire("Excel de los servicios no descargado","Reporta a un superior",'error');
        console.log("Error action_exportServices: ",error);
      }
    );
  }
  method_searchServices() {
    if (!this.service.search) {
      this.mdbTable.setDataSource(this.previous);
      this.services = this.mdbTable.getDataSource();
    }
    if (this.service.search) {
        this.services = this.mdbTable.searchLocalDataBy(this.service.search);
        this.mdbTable.setDataSource(this.mdbTable.getDataSource());
    }
  }
  method_searchAdvancedServices() {
    this.method_getServices(this.service);
  }
  method_getEnterprises(): void {
    this.enterpriseService.action_insideGetEnterprises({})
    .subscribe(
      (data) => { this.enterprises = data;},
      (error) => {console.log("Error action_getEnterprises: ",error);}
    );
  }  
  method_getServices(request: any) {
    this.isLoading = true;
    this.serviceService.action_getServices(request)
    .subscribe(
      (data) => { 
        this.isLoading = false;
        this.services = data;
        this.mdbTable.setDataSource(this.services);
        this.services = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      },
      (error) => {
        this.isLoading = false;
        console.log("Error action_getServices: ",error);
      }
    );
  }
  method_showServiceConsult(serviceId:number) {
    this.serviceId = serviceId;
    this.showedServiceInConsult = true;    
  }
  method_gotServiceInConsult(event:boolean) {    
    if(event){
      this.showedServiceInConsult = false;
    }
  } 
  method_showServiceUpdate(serviceId:number) {
    this.serviceId = serviceId;
    this.showedServiceInUpdate = true;
  }
  method_gotServiceInUpdate(event:boolean) {
    if(event){
      this.showedServiceInUpdate = false;
    }
  }
  method_updatedService(event:boolean) {    
    if(event){
      this.method_getServices(this.service);
      this.gotServicesInUpdate = true;
    } else {
      this.gotServicesInUpdate = false;
    }
  }
}

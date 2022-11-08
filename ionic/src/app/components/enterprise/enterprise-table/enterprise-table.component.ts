import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { Enterprise } from "../../../interfaces/enterprise";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import Swal from "sweetalert2";
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';

@Component({
  selector: 'app-enterprise-table',
  templateUrl: './enterprise-table.component.html',
  styleUrls: ['./enterprise-table.component.scss'],
})

export class EnterpriseTableComponent implements OnInit, AfterViewInit {
  rol: Rol = {id: 0, key: "", name: ""};
  gotEnterprisesInInsert: boolean = false;
  enterprise: any = {search: null, limit: 20, name: null, createdAtStart: null, createdAtEnd: null};
  isLoading: boolean = false;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  headsSort = ['id', 'logo', 'name', 'created_at', 'updated_at'];
  heads = ['Opciones', 'Logo', 'Nombre', 'Creado', 'Modificado'];
  enterprises: any = [];
  enterpriseId: number = 1;
  showedEnterpriseInUpdate: boolean = false;
  showedEnterpriseInConsult: boolean = false;
  gotEnterprisesInUpdate: boolean = false;
  previous: any = [];
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private cdRef: ChangeDetectorRef
  ) { }
  
  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_getEnterprises(this.enterprise);
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }
  
  method_insertedEnterprise(event:boolean) {    
    if(event){
      this.method_getEnterprises(this.enterprise);
      this.gotEnterprisesInInsert = true;
    } else {
      this.gotEnterprisesInInsert = false;
    }
  }
  method_exportEnterprises() {
    this.enterpriseService.action_exportEnterprises({})
    .subscribe(
      (data) => { 
        var url = (window.URL || window.webkitURL).createObjectURL(data);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = "EMURCIA_empresas.xlsx";
        a.click();
        window.URL.revokeObjectURL(url);          
      },
      (error) => {
        Swal.fire("Excel de las empresas no descargado","Reporta a un superior",'error');
        console.log("Error action_exportEnterprises: ",error);
      }
    );
  }
  method_searchEnterprises() {
    if (!this.enterprise.search) {
      this.mdbTable.setDataSource(this.previous);
      this.enterprises = this.mdbTable.getDataSource();
    }
    if (this.enterprise.search) {
        this.enterprises = this.mdbTable.searchLocalDataBy(this.enterprise.search);
        this.mdbTable.setDataSource(this.mdbTable.getDataSource());
    }
  }
  method_searchAdvancedEnterprises() {
    this.method_getEnterprises(this.enterprise);
  }
  method_getEnterprises(request: any) {
    this.isLoading = true;
    this.enterpriseService.action_insideGetEnterprises(request)
    .subscribe(
      (data) => { 
        this.isLoading = false;
        this.enterprises = data;
        this.mdbTable.setDataSource(this.enterprises);
        this.enterprises = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      },
      (error) => {
        this.isLoading = false;
        console.log("Error action_getEnterprises: ",error);
      }
    );
  }
  method_showEnterpriseConsult(enterpriseId:number) {
    this.enterpriseId = enterpriseId;
    this.showedEnterpriseInConsult = true;    
  }
  method_gotEnterpriseInConsult(event:boolean) {    
    if(event){
      this.showedEnterpriseInConsult = false;
    }
  }
  method_showEnterpriseUpdate(enterpriseId:number) {
    this.enterpriseId = enterpriseId;
    this.showedEnterpriseInUpdate = true;
  }
  method_gotEnterpriseInUpdate(event:boolean) {
    if(event){
      this.showedEnterpriseInUpdate = false;
    }
  }
  method_updatedEnterprise(event:boolean){
    if(event){
      this.method_getEnterprises(this.enterprise);
      this.gotEnterprisesInUpdate = true;
    } else {
      this.gotEnterprisesInUpdate = false;
    }    
  }
}

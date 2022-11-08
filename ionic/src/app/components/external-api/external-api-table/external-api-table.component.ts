import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { ExternalApi } from "../../../interfaces/external-api";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import { ExternalApiService } from '../../../services/external-api.service';
import Swal from "sweetalert2";
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';

@Component({
  selector: 'app-external-api-table',
  templateUrl: './external-api-table.component.html',
  styleUrls: ['./external-api-table.component.scss'],
})

export class ExternalApiTableComponent implements OnInit, AfterViewInit {
  rol: Rol = {id: 0, key: "", name: ""};
  gotExternalApisInInsert:boolean = false;
  externalApi: any = {search: null, limit: 20, url: null, method: null, token: null, enterprise_id: null, createdAtStart: null, createdAtEnd: null};
  isLoading: boolean = false;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  headsSort = ['id', 'url', 'method', 'enterpriseName', 'created_at', 'updated_at'];
  heads = ['Opciones', 'URL', 'Método', 'Empresa', 'Creado', 'Modificado'];
  enterprises: any = [];
  externalApis: any = [];
  externalApiId: number = 1;
  showedlExternalApiInConsult: boolean = false;
  showedExternalApiInUpdate: boolean = false;
  gotExternalApisInUpdate: boolean = false;
  previous: any = [];
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private externalApiService: ExternalApiService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_getEnterprises();
    this.method_getExternalApis(this.externalApi);
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  method_insertedExternalApi(event:boolean){
    if(event){
      this.method_getExternalApis(this.externalApi);
      this.gotExternalApisInInsert = true;
    } else{ 
      this.gotExternalApisInInsert = false;
    }
  }
  method_exportExternalApis() {
    this.externalApiService.action_exportExternalApis({})
    .subscribe(
      (data) => { 
        var url = (window.URL || window.webkitURL).createObjectURL(data);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = "EMURCIA_APIs.xlsx";
        a.click();
        window.URL.revokeObjectURL(url);          
      },
      (error) => {
        Swal.fire("Excel de las API´s no descargado","Reporta a un superior",'error');
        console.log("Error action_exportExternalApis: ",error);
      }
    );
  }
  method_searchExternalApis() {
    if (!this.externalApi.search) {
      this.mdbTable.setDataSource(this.previous);
      this.externalApis = this.mdbTable.getDataSource();
    }
    if (this.externalApi.search) {
        this.externalApis = this.mdbTable.searchLocalDataBy(this.externalApi.search);
        this.mdbTable.setDataSource(this.mdbTable.getDataSource());
    }
  }
  method_getEnterprises(): void {
    this.enterpriseService.action_insideGetEnterprises({})
    .subscribe(
      (data) => { this.enterprises = data;},
      (error) => {console.log("Error action_getEnterprises: ",error);}
    );
  }  
  method_searchAdvancedExternalApis() {
    this.method_getExternalApis(this.externalApi);
  }
  method_getExternalApis(request: any) {
    this.isLoading = true;
    this.externalApiService.action_getExternalApis(request)
    .subscribe(
      (data) => { 
        this.isLoading = false;
        this.externalApis = data;
        this.mdbTable.setDataSource(this.externalApis);
        this.externalApis = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      },
      (error) => {
        this.isLoading = false;
        console.log("Error action_getExternalApis: ",error);
      }
    );
  }
  method_showlExternalApiConsult(externalApiId:number) {
    this.externalApiId = externalApiId;
    this.showedlExternalApiInConsult = true;    
  }   
  method_gotExternalApiInConsult(event:boolean) {    
    if(event){
      this.showedlExternalApiInConsult = false;
    }
  }
  method_showlExternalApiUpdate(externalApiId:number) {
    this.externalApiId = externalApiId;
    this.showedExternalApiInUpdate = true;
  }
  method_gotExternalApiInUpdate(event:boolean) {
    if(event){
      this.showedExternalApiInUpdate = false;
    }
  }  
  method_updatedExternalApi(event:boolean) {    
    if(event){
      this.method_getExternalApis(this.externalApi);
      this.gotExternalApisInUpdate = true;
    } else {
      this.gotExternalApisInUpdate = false;
    }
  }
}

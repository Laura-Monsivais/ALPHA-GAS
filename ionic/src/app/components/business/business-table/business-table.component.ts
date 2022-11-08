import { Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import { AttentionService } from '../../../services/attention.service';
import { BusinessService } from '../../../services/business.service';
import Swal from "sweetalert2";
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';

@Component({
  selector: 'app-business-table',
  templateUrl: './business-table.component.html',
  styleUrls: ['./business-table.component.scss'],
})
export class BusinessTableComponent implements OnInit {
  @Input() enterpriseId: number;
  rol: Rol = {id: 0, key: "", name: ""};
  gotBusinessesInInsert:boolean = false;
  business: any = {search: null, limit: 20, name: null, enterprise_id: null, attention_id: null, createdAtStart: null, createdAtEnd: null};
  enterprises: any = [];
  attentions: any = [];
  isLoading: boolean = false;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  headsSort = ['id', 'name', 'enterpriseName', 'attentionName',  'created_at', 'updated_at'];
  heads = ['Opciones', 'Nombre', 'Empresa', 'Atención', 'Creado', 'Modificado'];
  businesses: any = [];
  businessId: number = 1;
  showedBusinessInConsult: boolean = false;
  showedBusinessInUpdate: boolean = false;
  gotBusinessesInUpdate: boolean = false;
  previous: any = [];
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private attentionService: AttentionService,
    private businessService: BusinessService,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_getEnterprises();
    this.method_getAttentions();
    this.method_getBusinesses(this.business);
  }
  ngOnChanges() {
    if(this.enterpriseId != 0){
      this.business.enterpriseId = this.enterpriseId;
      this.method_getBusinesses(this.business);
    }
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  method_insertedBusiness(event:boolean){
    if(event){
      this.method_getBusinesses(this.business);
      this.gotBusinessesInInsert = true;
    } else{ 
      this.gotBusinessesInInsert = false;
    }
  }
  method_exportBusinesses() {
    this.businessService.action_exportBusinesses({})
    .subscribe(
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
        Swal.fire("Excel de los negocios no descargado","Reporta a un superior",'error');
        console.log("Error action_exportBusinesses: ",error);
      }
    );
  }
  method_searchBusinesses() {
    if (!this.business.search) {
      this.mdbTable.setDataSource(this.previous);
      this.businesses = this.mdbTable.getDataSource();
    }
    if (this.business.search) {
        this.businesses = this.mdbTable.searchLocalDataBy(this.business.search);
        this.mdbTable.setDataSource(this.mdbTable.getDataSource());
    }
  }
  method_searchAdvancedBusinesses() {
    this.method_getBusinesses(this.business);
  }
  method_getEnterprises(): void {
    this.enterpriseService.action_insideGetEnterprises({})
    .subscribe(
      (data) => { this.enterprises = data;},
      (error) => {console.log("Error action_getEnterprises: ",error);}
    );
  }  
  method_getAttentions(): void {
    this.attentionService.action_getAttentions({})
    .subscribe(
      (data) => { this.attentions = data;},
      (error) => {console.log("Error action_getAttentions: ",error);}
    );
  }
  method_getBusinesses(request: any) {
    this.isLoading = true;
    this.businessService.action_getBusinesses(request)
    .subscribe(
      (data) => { 
        this.isLoading = false;
        this.businesses = data;
        this.mdbTable.setDataSource(this.businesses);
        this.businesses = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      },
      (error) => {
        this.isLoading = false;
        console.log("Error action_getBusinesses: ",error);
      }
    );
  }
  method_showBusinessConsult(businessId:number) {
    this.businessId = businessId;
    this.showedBusinessInConsult = true;    
  }
  method_gotBusinessInConsult(event:boolean) {    
    if(event){
      this.showedBusinessInConsult = false;
    }
  }
  method_showBusinessUpdate(businessId:number) {
    this.businessId = businessId;
    this.showedBusinessInUpdate = true;
  }
  method_gotBusinessInUpdate(event:boolean) {
    if(event){
      this.showedBusinessInUpdate = false;
    }
  }  
  method_updatedBusiness(event:boolean) {    
    if(event){
      this.method_getBusinesses(this.business);
      this.gotBusinessesInUpdate = true;
    } else {
      this.gotBusinessesInUpdate = false;
    }
  }

}

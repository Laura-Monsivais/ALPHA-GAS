import { Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import { BusinessService } from "../../../services/business.service";
import { SubsidiaryService } from '../../../services/subsidiary.service';
import Swal from "sweetalert2";
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';

@Component({
  selector: 'app-subsidiary-table',
  templateUrl: './subsidiary-table.component.html',
  styleUrls: ['./subsidiary-table.component.scss'],
})
export class SubsidiaryTableComponent implements OnInit {
  @Input() enterpriseId: number;
  rol: Rol = {id: 0, key: "", name: ""};
  gotSubsidiariesInInsert:boolean = false;
  subsidiary: any = {
    search: null, 
    limit: 20,    
    name: "",
    is_central: null,
    street: "",
    exterior: "",
    interior: "",
    postal_code: "",
    neighborhood: "",
    city: "",
    municipality: "",
    state: "",
    country: "",
    references: "",
    enterpriseId: null, 
    business_id: null,
    createdAtStart: null, 
    createdAtEnd: null
  };
  enterprises: any = [];
  businesses: any = [];
  isLoading: boolean = false;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  headsSort = ['id', 'logo', 'name', 'isCentral', 'enterpriseName', 'businessName', 'created_at', 'updated_at'];
  heads = ['Opciones', 'Logo', 'Nombre', '¿Es central?', 'Empresa', 'Negocio', 'Creado', 'Modificado'];
  subsidiaries: any = [];
  subsidiaryId: number = 1;
  showedSubsidiaryInConsult: boolean = false;
  showedSubsidiaryInUpdate: boolean = false;
  gotSubsidiariesInUpdate: boolean = false;
  previous: any = [];
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private businessService: BusinessService,
    private subsidiaryService: SubsidiaryService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_getEnterprises();
    this.method_getBusinesses();
    this.method_getSubsidiaries(this.subsidiary);
  }
  ngOnChanges() {
    if(this.enterpriseId != 0){
      this.subsidiary.enterpriseId = this.enterpriseId;
      this.method_getSubsidiaries(this.subsidiary);
    }
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  method_insertedSubsidiary(event:boolean){
    if(event){
      this.method_getSubsidiaries(this.subsidiary);
      this.gotSubsidiariesInInsert = true;
    } else{ 
      this.gotSubsidiariesInInsert = false;
    }
  }
  method_exportSubsidiaries() {
    this.subsidiaryService.action_exportSubsidiaries({})
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
        console.log("Error action_exportSubsidiaries: ",error);
      }
    );
  }
  method_searchSubsidiaries() {
    if (!this.subsidiary.search) {
      this.mdbTable.setDataSource(this.previous);
      this.subsidiaries = this.mdbTable.getDataSource();
    }
    if (this.subsidiary.search) {
        this.subsidiaries = this.mdbTable.searchLocalDataBy(this.subsidiary.search);
        this.mdbTable.setDataSource(this.mdbTable.getDataSource());
    }
  }
  method_searchAdvancedSubsidiaries() {
    this.method_getSubsidiaries(this.subsidiary);
  }
  method_getEnterprises(): void {
    this.enterpriseService.action_insideGetEnterprises({})
    .subscribe(
      (data) => { this.enterprises = data;},
      (error) => {console.log("Error action_getEnterprises: ",error);}
    );
  }  
  method_getBusinesses(): void {
    this.businessService.action_getBusinesses({enterprise_id: this.subsidiary.enterpriseId})
    .subscribe(
      (data) => { this.businesses = data;},
      (error) => {console.log("Error action_getBusinesses: ",error);}
    );
  }  
  method_getSubsidiaries(request: any) {
    this.isLoading = true;
    this.subsidiaryService.action_getSubsidiaries(request)
    .subscribe(
      (data) => { 
        this.isLoading = false;
        this.subsidiaries = data;
        this.mdbTable.setDataSource(this.subsidiaries);
        this.subsidiaries = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      },
      (error) => {
        this.isLoading = false;
        console.log("Error action_getSubsidiaries: ",error);
      }
    );
  }
  method_showSubsidiaryConsult(subsidiaryId:number) {
    this.subsidiaryId = subsidiaryId;
    this.showedSubsidiaryInConsult = true;    
  }
  method_gotSubsidiaryInConsult(event:boolean) {    
    if(event){
      this.showedSubsidiaryInConsult = false;
    }
  }
  method_showSubsidiaryUpdate(subsidiaryId:number) {
    this.subsidiaryId = subsidiaryId;
    this.showedSubsidiaryInUpdate = true;
  }
  method_gotSubsidiaryInUpdate(event:boolean) {
    if(event){
      this.showedSubsidiaryInUpdate = false;
    }
  }  
  method_updatedSubsidiary(event:boolean) {    
    if(event){
      this.method_getSubsidiaries(this.subsidiary);
      this.gotSubsidiariesInUpdate = true;
    } else {
      this.gotSubsidiariesInUpdate = false;
    }
  }

}

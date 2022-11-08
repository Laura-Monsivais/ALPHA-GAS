import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { Promotion } from "../../../interfaces/promotion";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import { BusinessService } from "../../../services/business.service";
import { SubsidiaryService } from "../../../services/subsidiary.service";
import { PromotionService } from '../../../services/promotion.service';
import Swal from "sweetalert2";
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';

@Component({
  selector: 'app-promotion-table',
  templateUrl: './promotion-table.component.html',
  styleUrls: ['./promotion-table.component.scss'],
})

export class PromotionTableComponent implements OnInit, AfterViewInit {
  rol: Rol = {id: 0, key: "", name: ""};
  gotPromotionsInInsert: boolean = false;
  promotion: any = {
    search: null, 
    limit: 20, 
    name: null, 
    expiresAtStart: null, 
    expiresAtEnd: null,  
    cost: null, 
    price: null, 
    enterprise_id: null, 
    business_id: null, 
    subsidiary_id: null, 
    createdAtStart: null, 
    createdAtEnd: null
  };
  isLoading: boolean = false;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  headsSort = ['id', 'name', 'price', 'expires_at', 'enterpriseName', 'businessName', 'subsidiaryName', 'created_at', 'updated_at'];
  heads = ['Opciones', 'Nombre', 'Precio', 'Expira', 'Empresa', 'Negocio', 'Sucursal', 'Creado', 'Modificado'];
  enterprises: any = [];
  businesses: any = [];
  subsidiaries: any = [];
  promotions: any = [];
  promotionId: number = 1;
  showedPromotionInUpdate: boolean = false;
  showedPromotionInConsult: boolean = false;
  gotPromotionsInUpdate: boolean = false;
  previous: any = [];
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private businessService: BusinessService,
    private subsidiaryService: SubsidiaryService,
    private promotionService: PromotionService,
    private cdRef: ChangeDetectorRef
  ) { }
  
  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_getEnterprises();
    this.method_getBusinesses();
    this.method_getSubsidiaries();
    this.method_getPromotions(this.promotion);
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }
  
  method_insertedPromotion(event:boolean) {    
    if(event){
      this.method_getPromotions(this.promotion);
      this.gotPromotionsInInsert = true;
    } else {
      this.gotPromotionsInInsert = false;
    }
  }
  method_exportPromotions() {
    this.promotionService.action_exportPromotions({})
    .subscribe(
      (data) => { 
        var url = (window.URL || window.webkitURL).createObjectURL(data);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = "EMURCIA_promociones.xlsx";
        a.click();
        window.URL.revokeObjectURL(url);          
      },
      (error) => {
        Swal.fire("Excel de las promociones no descargado","Reporta a un superior",'error');
        console.log("Error action_exportPromotions: ",error);
      }
    );
  }
  method_searchPromotions() {
    if (!this.promotion.search) {
      this.mdbTable.setDataSource(this.previous);
      this.promotions = this.mdbTable.getDataSource();
    }
    if (this.promotion.search) {
        this.promotions = this.mdbTable.searchLocalDataBy(this.promotion.search);
        this.mdbTable.setDataSource(this.mdbTable.getDataSource());
    }
  }
  method_searchAdvancedPromotions() {
    this.method_getPromotions(this.promotion);
  }
  method_getEnterprises(): void {
    this.enterpriseService.action_insideGetEnterprises({})
    .subscribe(
      (data) => { this.enterprises = data;},
      (error) => {console.log("Error action_getEnterprises: ",error);}
    );
  }  
  method_getBusinesses(): void {
    this.businessService.action_getBusinesses({enterprise_id: this.promotion.enterprise_id})
    .subscribe(
      (data) => { this.businesses = data;},
      (error) => {console.log("Error action_getBusinesses: ",error);}
    );
  }  
  method_getSubsidiaries(): void {
    this.subsidiaryService.action_getSubsidiaries({business_id: this.promotion.business_id})
    .subscribe(
      (data) => { this.subsidiaries = data;},
      (error) => {console.log("Error action_getSubsidiaries: ",error);}
    );
  }  
  method_getPromotions(request: any) {
    this.isLoading = true;
    this.promotionService.action_getPromotions(request)
    .subscribe(
      (data) => { 
        this.isLoading = false;
        this.promotions = data;
        this.mdbTable.setDataSource(this.promotions);
        this.promotions = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      },
      (error) => {
        this.isLoading = false;
        console.log("Error action_getPromotions: ",error);
      }
    );
  }
  method_showPromotionConsult(promotionId:number) {
    this.promotionId = promotionId;
    this.showedPromotionInConsult = true;    
  }
  method_gotPromotionInConsult(event:boolean) {    
    if(event){
      this.showedPromotionInConsult = false;
    }
  }
  method_showPromotionUpdate(promotionId:number) {
    this.promotionId = promotionId;
    this.showedPromotionInUpdate = true;
  }
  method_gotPromotionInUpdate(event:boolean) {
    if(event){
      this.showedPromotionInUpdate = false;
    }
  }
  method_updatedPromotion(event:boolean){
    if(event){
      this.method_getPromotions(this.promotion);
      this.gotPromotionsInUpdate = true;
    } else {
      this.gotPromotionsInUpdate = false;
    }    
  }
  method_diffDays(date:string) {
    let currentDate = new Date();
    let dateSent = new Date(date);
    return Math.floor(
      ( 
        Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) - 
        Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
      ) / (1000 * 60 * 60 * 24)
    );
  }
}

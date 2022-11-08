import { Component, OnInit, AfterViewInit, OnChanges, ViewChild, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import { BusinessService } from "../../../services/business.service";
import { CategoryService } from '../../../services/category.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss'],
})

export class CategoryTableComponent implements OnInit, AfterViewInit {
  rol: Rol = {id: 0, key: "", name: ""};
  gotCategoriesInInsert: boolean = false;
  category: any = {search: null, limit: 20, name: null, enterpriseId: null, business_id: null, createdAtStart: null, createdAtEnd: null};
  isLoading: boolean = false;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  headsSort = ['id','name','enterpriseName', 'businessName', 'created_at', 'updated_at'];
  heads = ['Opciones','Nombre','Empresa', 'Negocio', 'Creado', 'Modificado'];
  enterprises: any = [];
  businesses: any = [];
  categories: any = [];
  categoryId: number = 1;
  showedCategoryInUpdate: boolean = false;
  showedCategoryInConsult: boolean = false;
  gotCategoriesInUpdate: boolean = false
  previous: any = [];
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private businessService: BusinessService,
    private categoryService: CategoryService,
    private cdRef: ChangeDetectorRef
  ) { }
  
  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_getEnterprises();
    this.method_getBusinesses();
    this.method_getCategories(this.category);
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  method_insertedCategory(event:boolean) {
    if(event){
      this.method_getCategories(this.category);
      this.gotCategoriesInInsert = true;
    } else {
      this.gotCategoriesInInsert = false;
    }
  } 
  method_exportCategories() {
    this.categoryService.action_exportCategories({})
    .subscribe(
      (data) => { 
        var url = (window.URL || window.webkitURL).createObjectURL(data);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = "EMURCIA_categorias.xlsx";
        a.click();
        window.URL.revokeObjectURL(url);          
      },
      (error) => {
        Swal.fire("Excel de las categorías no descargado","Reporta a un superior",'error');
        console.log("Error action_exportCategories: ",error);
      }
    );
  }
  method_searchCategories() {
    if (!this.category.search) {
      this.mdbTable.setDataSource(this.previous);
      this.categories = this.mdbTable.getDataSource();
    }
    if (this.category.search) {
        this.categories = this.mdbTable.searchLocalDataBy(this.category.search);
        this.mdbTable.setDataSource(this.mdbTable.getDataSource());
    }
  }
  method_searchAdvancedCategories() {
    this.method_getCategories(this.category);
  }
  method_getEnterprises(): void {
    this.enterpriseService.action_insideGetEnterprises({})
    .subscribe(
      (data) => { this.enterprises = data;},
      (error) => {console.log("Error action_getEnterprises: ",error);}
    );
  }  
  method_getBusinesses(): void {
    this.businessService.action_getBusinesses({enterprise_id: this.category.enterpriseId})
    .subscribe(
      (data) => { this.businesses = data;},
      (error) => {console.log("Error action_getBusinesses: ",error);}
    );
  }  
  method_getCategories(request: any){
    this.isLoading = true;
    this.categoryService.action_getCategories(request)
    .subscribe(
      (data) => { 
        this.isLoading = false;
        this.categories = data;
        this.mdbTable.setDataSource(this.categories);
        this.categories = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      },
      (error) => {
        this.isLoading = false;
        console.log("Error action_getCategories: ",error);
      }
    );
  }
  method_showCategoryConsult(categoryId:number) {
    this.categoryId = categoryId;
    this.showedCategoryInConsult = true;    
  }
  method_gotCategoryInConsult(event:boolean) {    
    if(event){
      this.showedCategoryInConsult = false;
    }
  } 
  method_showCategoryUpdate(categoryId:number) {
    this.categoryId = categoryId;
    this.showedCategoryInUpdate = true;
  }
  method_gotCategorynInUpdate(event:boolean) {
    if(event){
      this.showedCategoryInUpdate = false;
    }
  }
  method_updatedPromotion(event:boolean) {    
    if(event){
      this.method_getCategories(this.category);
      this.gotCategoriesInUpdate = true;
    } else {
      this.gotCategoriesInUpdate = false;
    }
  }
}

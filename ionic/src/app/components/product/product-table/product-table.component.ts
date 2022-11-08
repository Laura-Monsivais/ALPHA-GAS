import { Component, OnInit, AfterViewInit, OnChanges, ViewChild, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import { BusinessService } from "../../../services/business.service";
import { CategoryService } from "../../../services/category.service";
import { ProductService } from '../../../services/product.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})

export class ProductTableComponent implements OnInit, AfterViewInit {
  rol: Rol = {id: 0, key: "", name: ""};
  gotProductsInInsert: boolean = false;
  product: any = {
    search: null, 
    limit: 20, 
    name: null, 
    description: null, 
    content: null, 
    unit: null, 
    cost: null, 
    price: null, 
    enterpriseId: null, 
    business_id: null, 
    category_id: null, 
    createdAtStart: null, 
    createdAtEnd: null
  };
  isLoading: boolean = false;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  headsSort = ['id', 'image', 'name', 'unit', 'price', 'enterpriseName', 'businessName', 'categoryName', 'created_at', 'updated_at'];
  heads = ['Opciones', 'Imagen', 'Nombre', 'Unidad', 'Precio', 'Empresa', 'Negocio','Categoría', 'Creado', 'Modificado'];  
  enterprises: any = [];
  businesses: any = [];
  categories: any = [];
  products: any = [];
  productId: number = 1;
  showedProductInUpdate: boolean = false;
  showedProductInConsult: boolean = false;
  gotProductsInUpdate: boolean = false
  previous: any = [];
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private businessService: BusinessService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private cdRef: ChangeDetectorRef
  ) { }
  
  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_getEnterprises();
    this.method_getBusinesses();
    this.method_getCategories();
    this.method_getProducts(this.product);
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  method_insertedProduct(event:boolean) {
    if(event){
      this.method_getProducts(this.product);
      this.gotProductsInInsert = true;
    } else {
      this.gotProductsInInsert = false;
    }
  } 
  method_exportProducts() {
    this.productService.action_exportProducts({})
    .subscribe(
      (data) => { 
        var url = (window.URL || window.webkitURL).createObjectURL(data);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = "EMURCIA_productos.xlsx";
        a.click();
        window.URL.revokeObjectURL(url);          
      },
      (error) => {
        Swal.fire("Excel de los productos no descargado","Reporta a un superior",'error');
        console.log("Error action_exportProducts: ",error);
      }
    );
  }
  method_searchProducts() {
    if (!this.product.search) {
      this.mdbTable.setDataSource(this.previous);
      this.products = this.mdbTable.getDataSource();
    }
    if (this.product.search) {
        this.products = this.mdbTable.searchLocalDataBy(this.product.search);
        this.mdbTable.setDataSource(this.mdbTable.getDataSource());
    }
  }
  method_searchAdvancedProducts() {
    this.method_getProducts(this.product);
  }
  method_getEnterprises(): void {
    this.enterpriseService.action_insideGetEnterprises({})
    .subscribe(
      (data) => { this.enterprises = data;},
      (error) => {console.log("Error action_getEnterprises: ",error);}
    );
  }  
  method_getBusinesses(): void {
    this.businessService.action_getBusinesses({enterprise_id: this.product.enterpriseId})
    .subscribe(
      (data) => { this.businesses = data;},
      (error) => {console.log("Error action_getBusinesses: ",error);}
    );
  }  
  method_getCategories(): void {
    this.categoryService.action_getCategories({business_id: this.product.business_id})
    .subscribe(
      (data) => { this.categories = data;},
      (error) => {console.log("Error action_getCategories: ",error);}
    );
  }  
  method_getProducts(request: any){
    this.isLoading = true;
    this.productService.action_getProducts(request)
    .subscribe(
      (data) => { 
        this.isLoading = false;
        this.products = data;
        this.mdbTable.setDataSource(this.products);
        this.products = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      },
      (error) => {
        this.isLoading = false;
        console.log("Error action_getProducts: ",error);
      }
    );
  }
  method_showProductConsult(productId:number) {
    this.productId = productId;
    this.showedProductInConsult = true;    
  }
  method_gotProductInConsult(event:boolean) {    
    if(event){
      this.showedProductInConsult = false;
    }
  } 
  method_showProductUpdate(productId:number) {
    this.productId = productId;
    this.showedProductInUpdate = true;
  }
  method_gotProductInUpdate(event:boolean) {
    if(event){
      this.showedProductInUpdate = false;
    }
  }
  method_updatedProduct(event:boolean) {    
    if(event){
      this.method_getProducts(this.product);
      this.gotProductsInUpdate = true;
    } else {
      this.gotProductsInUpdate = false;
    }
  }
}

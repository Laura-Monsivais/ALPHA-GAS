import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import { BusinessService } from "../../../services/business.service";
import { SubsidiaryService } from "../../../services/subsidiary.service";
import { CategoryService } from "../../../services/category.service";
import { ProductService } from "../../../services/product.service";
import { DonationService } from '../../../services/donation.service';
import Swal from "sweetalert2";
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';

@Component({
  selector: 'app-donation-table',
  templateUrl: './donation-table.component.html',
  styleUrls: ['./donation-table.component.scss'],
})

export class DonationTableComponent implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  gotDonationsInInsert:boolean = false;
  donation: any = { 
    search: null, 
    limit: 20, 
    name: null, 
    realizedAtStart: null, 
    realizedAtEnd: null,
    enterpriseId: null,
    businessId: null,
    subsidiaryId: null,
    categoryId: null,
    productId: null,
    quantity: null,
    cost: null,
    total: null,
    createdAtStart: null, 
    createdAtEnd: null
  };
  isLoading: boolean = false;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  headsSort = ['id', 'name', 'realized_at', 'enterpriseName', 'businessName', 'subsidiaryName', 'productName', 'cost', 'quantity', 'total', 'created_at', 'updated_at'];
  heads = ['Opciones', 'Nombre', 'Realizada', 'Empresa', 'Negocio', 'Sucursal', 'Producto', 'Costo', 'Cantidad', 'Total', 'Creado', 'Modificado'];
  enterprises: any = [];
  businesses: any = [];
  subsidiaries: any = [];
  categories: any = [];
  products: any = [];
  donations: any = [];
  donationId: number = 1;
  showedDonationInConsult: boolean = false;
  showedDonationInUpdate: boolean = false;
  gotDonationsInUpdate: boolean = false;
  previous: any = [];
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private businessService: BusinessService,
    private subsidiaryService: SubsidiaryService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private donationService: DonationService,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_getEnterprises();
    this.method_getBusinesses();
    this.method_getSubsidiaries();
    this.method_getCategories();
    this.method_getProducts();
    this.method_getDonations(this.donation);
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  method_insertedDonation(event:boolean){
    if(event){
      this.method_getDonations(this.donation);
      this.gotDonationsInInsert = true;
    } else{ 
      this.gotDonationsInInsert = false;
    }
  }
  method_exportDonations() {
    this.donationService.action_exportDonations({})
    .subscribe(
      (data) => { 
        var url = (window.URL || window.webkitURL).createObjectURL(data);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = "EMURCIA_donaciones.xlsx";
        a.click();
        window.URL.revokeObjectURL(url);          
      },
      (error) => {
        Swal.fire("Excel de las donaciones no descargado","Reporta a un superior",'error');
        console.log("Error action_exportDonations: ",error);
      }
    );
  }
  method_searchDonations() {
    if (!this.donation.search) {
      this.mdbTable.setDataSource(this.previous);
      this.donations = this.mdbTable.getDataSource();
    }
    if (this.donation.search) {
        this.donations = this.mdbTable.searchLocalDataBy(this.donation.search);
        this.mdbTable.setDataSource(this.mdbTable.getDataSource());
    }
  }
  method_searchAdvancedDonations() {
    this.method_getDonations(this.donation);
  }
  method_getEnterprises(): void {
    this.enterpriseService.action_insideGetEnterprises({})
    .subscribe(
      (data) => { this.enterprises = data;},
      (error) => {console.log("Error action_getEnterprises: ",error);}
    );
  }  
  method_getBusinesses(): void {
    this.businessService.action_getBusinesses({enterprise_id: this.donation.enterpriseId})
    .subscribe(
      (data) => { this.businesses = data;},
      (error) => {console.log("Error action_getBusinesses: ",error);}
    );
  }  
  method_chageBusiness(): void {    
    this.method_getSubsidiaries();
    this.method_getCategories();
  }
  method_getSubsidiaries(): void {
    this.subsidiaryService.action_getSubsidiaries({business_id: this.donation.businessId})
    .subscribe(
      (data) => { this.subsidiaries = data;},
      (error) => {console.log("Error action_getSubsidiaries: ",error);}
    );
  }  
  method_getCategories(): void {
    this.categoryService
      .action_getCategories({ business_id: this.donation.businessId })
      .subscribe(
        (data) => {
          this.categories = data;
        },
        (error) => {
          console.log("Error action_getCategories: ", error);
        }
      );
  }
  method_getProducts(): void {
    this.productService
      .action_getProducts({ category_id: this.donation.categoryId })
      .subscribe(
        (data) => {
          this.products = data;
        },
        (error) => {
          console.log("Error action_getProducts: ", error);
        }
      );
  }
  method_getDonations(request: any) {
    this.isLoading = true;
    this.donationService.action_getDonations(request)
    .subscribe(
      (data) => { 
        this.isLoading = false;
        this.donations = data;
        this.mdbTable.setDataSource(this.donations);
        this.donations = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      },
      (error) => {
        this.isLoading = false;
        console.log("Error action_getDonations: ",error);
      }
    );
  }
  method_showDonationConsult(donationId:number) {
    this.donationId = donationId;
    this.showedDonationInConsult = true;    
  }
  method_gotDonationInConsult(event:boolean) {    
    if(event){
      this.showedDonationInConsult = false;
    }
  }
  method_showDonationUpdate(donationId:number) {
    this.donationId = donationId;
    this.showedDonationInUpdate = true;
  }
  method_gotDonationInUpdate(event:boolean) {
    if(event){
      this.showedDonationInUpdate = false;
    }
  }  
  method_updatedDonation(event:boolean) {    
    if(event){
      this.method_getDonations(this.donation);
      this.gotDonationsInUpdate = true;
    } else {
      this.gotDonationsInUpdate = false;
    }
  }
}

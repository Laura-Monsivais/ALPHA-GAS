import { Component, OnInit, Input } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { BusinessService } from '../../../services/business.service';
import { SubsidiaryService } from '../../../services/subsidiary.service';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { InventoryService } from "../../../services/inventory.service";

@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.scss'],
})
export class DonationFormComponent implements OnInit {
  unit: string = "";
  @Input() donation: any;
  @Input() enterprises: any = [];
  @Input() businesses: any = [];
  @Input() subsidiaries: any = [];
  @Input() categories: any = [];
  @Input() products: any = [];
  inventories: any = []; 
  rol: Rol = {id: 0, key: "", name: ""};
  
  constructor(
    private authenticationService: AuthenticationService,
    private businessService: BusinessService,
    private subsidiaryService: SubsidiaryService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private inventoryService: InventoryService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
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
    this.categoryService.action_getCategories({business_id: this.donation.businessId})
    .subscribe(
      (data) => { this.categories = data;},
      (error) => {console.log("Error action_getCategories: ",error);}
    );
  }
  method_getProducts(): void{
    this.productService.action_getProducts({category_id: this.donation.categoryId, subsidiaryId: this.donation.subsidiaryId})
    .subscribe(
      (data) => { this.products = data; },
      (error) => {console.log("Error action_getProducts: ",error);}
    );
  }  
  method_getInventory() {
    this.inventoryService.action_getInventories({subsidiary_id: this.donation.subsidiaryId, 
      product_id: this.donation.productId})
    .subscribe(
      (data) => {
        this.inventories = data;
        if(this.inventories.length == 1){
          this.donation.inventory_id = data[0].id;
          this.donation.inventoryTheoretical = data[0].inventory_theoretical;
          this.donation.productUnit = data[0].productUnit;
          this.donation.cost = data[0].productCost;
        } else {
          this.donation.inventoryTheoretical = null;
          this.donation.productUnit = null;
          this.donation.cost = 0;
        }
      },
      (error) => {
        console.log("Error action_getInventories: ", error);
      }
    );
  }
  method_calculateTotal() {
    this.donation.total = this.donation.quantity * this.donation.cost;
  }
}

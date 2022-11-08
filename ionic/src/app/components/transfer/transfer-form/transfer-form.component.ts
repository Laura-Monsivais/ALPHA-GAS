import { Component, OnInit, Input } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { BusinessService } from '../../../services/business.service';
import { SubsidiaryService } from '../../../services/subsidiary.service';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { InventoryService } from "../../../services/inventory.service";

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss'],
})

export class TransferFormComponent implements OnInit {
  @Input() transfer: any;
  @Input() enterprises: any = [];
  @Input() businesses: any = [];
  @Input() origins: any = [];
  @Input() categories: any = [];
  @Input() products: any = [];
  @Input() destinations: any = [];
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
    this.businessService.action_getBusinesses({enterprise_id: this.transfer.enterpriseId})
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
    this.subsidiaryService.action_getSubsidiaries({business_id: this.transfer.businessId})
    .subscribe(
      (data) => { 
        this.origins = data;
        this.destinations = data;
      },
      (error) => {console.log("Error action_getSubsidiaries: ",error);}
    );
  }
  method_getCategories(): void {
    this.categoryService.action_getCategories({business_id: this.transfer.businessId})
    .subscribe(
      (data) => { this.categories = data;},
      (error) => {console.log("Error action_getCategories: ",error);}
    );
  }
  method_getProducts(): void{
    this.productService.action_getProducts({category_id: this.transfer.categoryId, subsidiaryId: this.transfer.originId})
    .subscribe(  
      (data) => { 
        this.products = data;
      },
      (error) => {console.log("Error action_getProducts: ",error);}
    );
  }
  method_getInventory() {
    this.inventoryService.action_getInventories({subsidiary_id: this.transfer.originId, 
      product_id: this.transfer.productId})
    .subscribe(
      (data) => {   
        this.inventories = data;
        if(this.inventories.length == 1){
          this.transfer.inventory_id = data[0].id;
          this.transfer.inventoryTheoretical = data[0].inventory_theoretical;
          this.transfer.productUnit = data[0].productUnit;
        } else {
          this.transfer.inventoryTheoretical = null;
          this.transfer.productUnit = null;
        }     
      },
      (error) => {
        console.log("Error action_getInventories: ", error);
      }
    );
  }
}

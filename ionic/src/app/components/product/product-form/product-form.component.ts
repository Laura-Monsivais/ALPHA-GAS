import { Component, OnInit, Input } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { CategoryService } from '../../../services/category.service';
import { BusinessService } from '../../../services/business.service';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})

export class ProductFormComponent implements OnInit {
  @Input() product: any;
  @Input() enterprises: any = [];
  @Input() businesses: any = [];
  @Input() categories: any = [];
  rol: Rol = {id: 0, key: "", name: ""};
  units: any = ['Pieza(s)', 'Litro(s)', 'Kilo(s)'];

  constructor(
    private authenticationService: AuthenticationService,
    private businessService: BusinessService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }

  method_getProductImageFile(event: any){
    this.product.imageFile = event.target.files[0];
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
}

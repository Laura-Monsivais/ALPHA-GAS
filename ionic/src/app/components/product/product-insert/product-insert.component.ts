import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { Product } from "../../../interfaces/product";
import { Enterprise } from "../../../interfaces/enterprise";
import { Business } from "../../../interfaces/business";
import { Category } from "../../../interfaces/category";
import { Rol } from "../../../interfaces/rol";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import { BusinessService } from '../../../services/business.service';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import Swal from "sweetalert2";
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-product-insert',
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.scss'],
})

export class ProductInsertComponent implements OnInit {
  @ViewChild('productInsert') public productInsert:ModalDirective;
  product: Product = {
    id: 0, 
    name: "",  
    image: "", 
    imageFile: null, 
    description: null, 
    content: null, 
    unit: "", 
    cost: 0, 
    price: 0,
    enterpriseId: 0, 
    business_id: 0, 
    category_id: 0, 
    inventoryId: 0, 
    inventoryTheoretical: 0
  };
  enterprise: Enterprise = {id: 0, name: ""};
  business: Business = {id: 0, name: "", enterprise_id: 0, attention_id: 0};
  category: Category = {id: 0, name: "", enterpriseId: 0, business_id: 0};
  enterprises: any = [];
  businesses: any = [];
  categories: any = [];
  rol: Rol = {id: 0, key: "", name: ""};
  productForm: FormGroup;
  isLoading: boolean = false;
  @Output() emitter_insertedProduct: EventEmitter<boolean> = new EventEmitter();
  @Input() gotProductsInInsert:boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private businessService: BusinessService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group({
      name: new FormControl("", [
        Validators.required
      ]),
      unit: new FormControl("", [
        Validators.required
      ]),
      cost: new FormControl("", [
        Validators.required
      ]),
      price: new FormControl("", [
        Validators.required
      ]),
      business_id: new FormControl("", [
        Validators.required,
        Validators.min(1)
      ]),
    });
  }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ngOnChanges() {
    if(this.gotProductsInInsert){
      this.emitter_insertedProduct.emit(false);
    }
  }
  
  method_getProduct(){
    this.productInsert.show();
    this.method_getEnterprises();
    this.product = {
      id: 0, 
      name: "",  
      image: "", 
      imageFile: null, 
      description: null, 
      content: null, 
      unit: "", 
      cost: 0, 
      price: 0,
      enterpriseId: 0, 
      business_id: 0, 
      category_id: 0, 
      inventoryId: 0, 
      inventoryTheoretical: 0
    };
    switch(this.rol.key){
      case 'Super':
      break;
      case 'Director': 
        this.enterprise = this.authenticationService.localStorage_getEnterprise();
        this.product.enterpriseId = this.enterprise.id;
        this.method_getBusinesses();
      break;
      case 'Manager':
      break;
      case 'Call_Center':
      break;
      case 'Seller':
      break;
      case 'Client':
      break;
      default:
      break;
    }
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
  method_insertProduct() {
    this.productForm.get('name').setValue(this.product.name);
    this.productForm.get('unit').setValue(this.product.unit);
    this.productForm.get('cost').setValue(this.product.cost);
    this.productForm.get('price').setValue(this.product.price);
    this.productForm.get('business_id').setValue(this.product.business_id);
    if (this.productForm.valid) {
      this.isLoading = true;
      this.productService.action_insertProduct(this.product)
      .subscribe(
        (data) => { 
          if(data.status == 200){
            this.productInsert.hide();
            this.isLoading = false;
            this.emitter_insertedProduct.emit(true);
            Swal.fire("Producto creado","",'success');
          } else {
            this.isLoading = false;
            Swal.fire("Producto no creado","Intentalo de nuevo",'warning');
            console.log("Response action_insertProduct: ",data);
          }
        },
        (error) => {
          this.isLoading = false;
          Swal.fire("Producto no creado","Reporta a un superior",'error');
          console.log("Error action_insertProduct: ",error);
        }
      );
    } else {
      Swal.fire("Producto no creado","Completa la información",'info');
      console.log("Información formulario: ",this.productForm);
    }
  }
}

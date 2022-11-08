import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Product } from "../../../interfaces/product";
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
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss'],
})

export class ProductUpdateComponent implements OnInit {
  @ViewChild('productUpdate') public productUpdate:ModalDirective;
  @Input() productId: number;
  @Input() showedProductInUpdate: boolean = false;
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
  enterprises: any = [];
  businesses: any = [];
  categories: any = [];
  subsidiaries: any = [];
  rol: Rol = {id: 0, key: "", name: ""};
  productForm: FormGroup;
  isLoading: boolean = false;
  @Output() emitter_updatedProduct: EventEmitter<boolean> = new EventEmitter();
  @Input() gotProductsInUpdate: boolean = false;
  @Output() emitter_gotProductInUpdate: EventEmitter<boolean> = new EventEmitter();

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
    this.product.id = this.productId;
  }
  ngOnChanges() {
    if(this.showedProductInUpdate){
      this.method_getProduct();
      this.emitter_gotProductInUpdate.emit(true);
    } else {
      this.emitter_gotProductInUpdate.emit(false);
    }
    if (this.gotProductsInUpdate) {
      this.emitter_updatedProduct.emit(false);
    }
  }
  method_getProduct() {    
    this.productUpdate.show();
    this.method_getEnterprises();
    this.productService.action_getProducts({id: this.productId})
    .subscribe(
      (data) => { 
        this.product = data;
        this.method_getBusinesses();
        this.method_getCategories();
      },
      (error) => {console.log("Error action_getProduct: ",error);}
    );
  }
  method_getEnterprises(){
    this.enterpriseService.action_insideGetEnterprises({})
    .subscribe(
      (data) => { this.enterprises = data;},
      (error) => {console.log("Error action_getEnterprises: ",error);}
    );
  }
  method_getBusinesses(){
    this.businessService.action_getBusinesses({enterprise_id: this.product.enterpriseId})
    .subscribe(
      (data) => { this.businesses = data;},
      (error) => {console.log("Error action_getBusinesses: ",error);}
    );
  }
  method_getCategories(){
    this.categoryService.action_getCategories({business_id: this.product.business_id})
    .subscribe(
      (data) => { this.categories = data;},
      (error) => {console.log("Error action_getCategories: ",error);}
    );
  }
  method_updateProduct() {
    this.productForm.get('name').setValue(this.product.name);
    this.productForm.get('unit').setValue(this.product.unit);
    this.productForm.get('cost').setValue(this.product.cost);
    this.productForm.get('price').setValue(this.product.price);
    this.productForm.get('business_id').setValue(this.product.business_id);
    if (this.productForm.valid) {
      this.isLoading = true;
      this.productService.action_updateProduct(this.product)
      .subscribe(
        (data) => { 
          if(data.status == 200){
            this.productUpdate.hide();
            this.isLoading = false;
            this.emitter_updatedProduct.emit(true);
            Swal.fire("Producto modificado","",'success');
          } else {
            this.isLoading = false;
            Swal.fire("Producto no modificado","Intentalo de nuevo",'warning');
            console.log("Response action_updateProduct: ",data);
          }
        },
        (error) => {
          this.isLoading = false;
          Swal.fire("Producto no modificado","Reporta a un superior",'error');
          console.log("Error action_updateProduct: ",error);
        }
      );
    } else {
      Swal.fire("Producto no modificado","Completa la información",'info');
      console.log("Información formulario: ",this.productForm);
    }
  }
}

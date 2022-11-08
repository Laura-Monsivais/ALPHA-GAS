import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { Attention } from "../../../interfaces/attention";
import { AuthenticationService } from "../../../services/authentication.service";
import { ProductService } from '../../../services/product.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})

export class ProductListComponent implements OnInit {
  @Input() addBy: string = "quantity";
  @Input() buy: any;
  @Input() sale: any;
  @Input() saleDetailsProducts: any;
  @Input() buyDetailsProducts: any;
  rol: Rol = {id: 0, key: "", name: ""};
  attention: Attention = {id: 0, key: "", name: ""};
  products: any = [];
  product: any = {limit: 10, search: null, business_id: null, subsidiaryId: null};
  isLoadingGetProducts: boolean = false;
  @Output() emiitter_addedProduct: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.attention = this.authenticationService.localStorage_getAttention();
    this.method_getProducts(this.product);
  }
  ngOnChanges() {
    if(this.sale) {
      if(this.sale.businessId != 0 || this.sale.subsidiaryId != 0) {
        this.product.business_id = this.sale.businessId;
        this.product.subsidiaryId = this.sale.subsidiaryId;
        this.method_getProducts(this.product);
      }
    }
    if(this.buy) {
      if(this.buy.businessId != 0 || this.buy.expected_destination_id != 0) {
        this.product.business_id = this.buy.businessId;
        this.product.subsidiaryId = this.buy.expected_destination_id;
        this.method_getProducts(this.product);
      }
    }
  }
  method_searchAdvancedProducts() {
    this.method_getProducts(this.product);
  }

  method_getProducts(request: any) {
    this.isLoadingGetProducts = true;
    this.productService.action_getProducts(request)
    .subscribe(
      (data) => { 
        this.isLoadingGetProducts = false;
        this.products = data;
      },
      (error) => {
        this.isLoadingGetProducts = false;
        console.log("Error action_getProducts: ",error);
      }
    );
  }
  method_changeProduct(index: number, product: any){
    var changeProduct = product;
    if(this.addBy === 'quantity'){
      changeProduct.amountCost = changeProduct.quantity * changeProduct.cost;
      changeProduct.amountPrice = changeProduct.quantity * changeProduct.price;
    } else {
      if(this.buy){
        changeProduct.quantity = changeProduct.amountCost / changeProduct.cost; 
      } else {
        changeProduct.quantity = changeProduct.amountPrice / changeProduct.price; 
      }     
    }
    changeProduct.conversion = changeProduct.quantity / changeProduct.density;
    this.products[index] = changeProduct;
  }
  method_addProductDetail(product: any){
    if(this.saleDetailsProducts){
      this.method_addProductSaleDetail(product);
    }
    if(this.buyDetailsProducts){
      this.method_addProductBuyDetail(product);
    }
  }
  method_addProductSaleDetail(product:any) {
    var addProduct = {
      product_id: product.id, 
      image: product.image, 
      name: product.name, 
      description: product.description, 
      content: product.content, 
      unit: product.unit, 
      inventoryId: product.inventoryId,
      inventoryTheoretical: product.inventoryTheoretical,
      quantity: product.quantity, 
      price: product.price, 
      amount: product.amountPrice
    };
    if(addProduct.quantity > addProduct.inventoryTheoretical) {
      Swal.fire("Producto no agregado","La cantidad debe ser menor o igual al inventario teórico",'error');
    } else if(addProduct.amount <= 0) {
      Swal.fire("Producto no agregado","El monto debe ser mayor a cero",'error');
    } else {
      this.saleDetailsProducts.push(addProduct);
      this.authenticationService.localStorage_setSaleDetailProducts(this.saleDetailsProducts);
      this.emiitter_addedProduct.emit(true);   
    }
  }
  method_addProductBuyDetail(product:any) {
    var addProduct = {
      product_id: product.id, 
      image: product.image, 
      name: product.name, 
      description: product.description, 
      content: product.content, 
      unit: product.unit, 
      inventoryId: product.inventoryId,
      inventoryTheoretical: product.inventoryTheoretical,
      quantity: product.quantity, 
      density: product.density, 
      conversion: product.conversion, 
      cost: product.cost, 
      amount: product.amountCost, 
      businessName: product.businessName
    };
    if(addProduct.density > 1 || addProduct.density < 0) {
      Swal.fire("Producto no agregado","La densidad debe ser menor a uno y mayor a cero",'error');
    } else if(addProduct.amount <= 0) {
      Swal.fire("Producto no agregado","El monto debe ser mayor a cero",'error');
    } else {
      this.buyDetailsProducts.push(addProduct);
      this.authenticationService.localStorage_setBuyDetailProducts(this.buyDetailsProducts);
      this.emiitter_addedProduct.emit(true); 
    }  
  }
}

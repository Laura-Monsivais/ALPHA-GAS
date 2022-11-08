import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { Attention } from "../../../interfaces/attention";
import { AuthenticationService } from "../../../services/authentication.service";
import { ProductService } from '../../../services/product.service';
import { Subsidiary } from 'src/app/interfaces/subsidiary';
import Swal from "sweetalert2";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})

export class ProductCardComponent implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  attention: Attention = {id: 0, key: "", name: ""};
  subsidiary: Subsidiary = {
    id: 0, 
    name: "", 
    is_central: false,
    logo: null,
    logoFile: null,
    overlay: null,
    overlayFile: null,
    street: "",
    exterior: "",
    interior: null,
    postal_code: "",
    neighborhood: "",
    city: "",
    municipality: "",
    state: "",
    country: "",
    references: null,
    enterpriseId: 0, 
    business_id: 0
  };
  products: any = [];
  product: any = {limit: 10, search: null, subsidiaryId: 0};
  isLoadingGetProducts: boolean = false;
  @Input() isGotArticles:boolean;
  @Output() emitter_isAddedArticle: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.attention = this.authenticationService.localStorage_getAttention();
    this.subsidiary = this.authenticationService.localStorage_getSubsidiary();
    this.product.subsidiaryId = this.subsidiary.id;
    this.method_getProducts(this.product);
  }
  ngOnChanges() {
    if(this.isGotArticles){
      this.emitter_isAddedArticle.emit(false);
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
    changeProduct.amountPrice = changeProduct.quantity * changeProduct.price;
    this.products[index] = changeProduct;
  }
  method_addProductCart(product:any) {
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
    if(addProduct.amount <= 0) {
      Swal.fire("Producto no agregado","El monto debe ser mayor a cero",'error');
    } else {
      let productsAdded = this.authenticationService.localStorage_getOrderDetailProducts();  
      productsAdded.push(addProduct);
      this.authenticationService.localStorage_setOrderDetailProducts(productsAdded);
      this.emitter_isAddedArticle.emit(true);
    }
  }
}

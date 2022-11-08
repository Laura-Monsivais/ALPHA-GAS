import { Component, OnInit, Input,  } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-order-detail-list',
  templateUrl: './order-detail-list.component.html',
  styleUrls: ['./order-detail-list.component.scss'],
})

export class OrderDetailListComponent implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() promotions: any = [];
  @Input() products: any = [];
  cartQuantity: number = 0;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }

  method_removePromotionCart(promotionIndex:number) {
    let promotionsAdded = this.authenticationService.localStorage_getOrderDetailPromotions();  
    const index = promotionsAdded.indexOf(promotionIndex);
    promotionsAdded.splice(index, 1);
    this.authenticationService.localStorage_setOrderDetailPromotions(promotionsAdded);
    this.promotions = this.authenticationService.localStorage_getOrderDetailPromotions();
    this.cartQuantity = this.products.length + this.promotions.length; 
    if(this.cartQuantity == 0){
      this.router.navigate(["/dashboard"]);
    }       
  }
  method_removeProductCart(productIndex:number) {
    let productsAdded = this.authenticationService.localStorage_getOrderDetailProducts(); 
    const index = productsAdded.indexOf(productIndex);    
    productsAdded.splice(index, 1);
    this.authenticationService.localStorage_setOrderDetailProducts(productsAdded);
    this.products = this.authenticationService.localStorage_getOrderDetailProducts();
    this.cartQuantity = this.products.length + this.promotions.length; 
    if(this.cartQuantity == 0){
      this.router.navigate(["/dashboard"]);
    }     
  }
  method_changeProductCart(index:number, product: any) {
    var changeProduct = product;
    changeProduct.amount = changeProduct.quantity * changeProduct.price;
    let productsAdded = this.authenticationService.localStorage_getOrderDetailProducts(); 
    productsAdded[index].quantity = changeProduct;    
    this.authenticationService.localStorage_setOrderDetailProducts(productsAdded);
    this.products = this.authenticationService.localStorage_getOrderDetailProducts(); 
  }
}

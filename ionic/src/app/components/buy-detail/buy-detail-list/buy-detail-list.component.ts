import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: 'app-buy-detail-list',
  templateUrl: './buy-detail-list.component.html',
  styleUrls: ['./buy-detail-list.component.scss'],
})
export class BuyDetailListComponent implements OnInit {
  @Input() addBy: string = "quantity";
  @Input() buyDetailsProducts: any = [];
  @Input() buyDetailsServices: any = [];
  @Output() emitter_removededArticle: EventEmitter<boolean> = new EventEmitter();
  @Output() emitter_changedArticle: EventEmitter<boolean> = new EventEmitter();

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {}
  method_removeProductBuyDetail(productIndex:number) {
    const index = this.buyDetailsProducts.indexOf(productIndex);    
    this.buyDetailsProducts.splice(index, 1);
    this.authenticationService.localStorage_setBuyDetailProducts(this.buyDetailsProducts);
    this.emitter_removededArticle.emit(true);
  }
  method_removeServiceBuyDetail(serviceIndex:number) {
    const index = this.buyDetailsServices.indexOf(serviceIndex);
    this.buyDetailsServices.splice(index, 1);
    this.authenticationService.localStorage_setBuyDetailServices(this.buyDetailsServices);
    this.emitter_removededArticle.emit(true);
  }
  method_changeProduct(index: number, product: any){
    var changeProduct = product;
    if(this.addBy === 'quantity'){
      changeProduct.amount = changeProduct.quantity * changeProduct.cost;
    } else {
      changeProduct.quantity = changeProduct.amount / changeProduct.cost;  
    }
    changeProduct.conversion = changeProduct.quantity / changeProduct.density;
    this.buyDetailsProducts[index] = changeProduct;
    this.authenticationService.localStorage_setBuyDetailProducts(this.buyDetailsProducts);
    this.emitter_removededArticle.emit(true);
  }  
  method_changeService(index: number, service: any){
    var changeService = service;
    if(this.addBy === 'quantity'){
      changeService.amount = changeService.quantity * changeService.cost;
    } else {
      changeService.quantity = changeService.amount / changeService.cost; 
    }
    this.buyDetailsServices[index] = changeService;
    this.authenticationService.localStorage_setBuyDetailServices(this.buyDetailsServices);
    this.emitter_removededArticle.emit(true);
  }
}
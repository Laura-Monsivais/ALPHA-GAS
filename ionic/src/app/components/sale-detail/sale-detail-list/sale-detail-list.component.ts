import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: 'app-sale-detail-list',
  templateUrl: './sale-detail-list.component.html',
  styleUrls: ['./sale-detail-list.component.scss'],

})
export class SaleDetailListComponent implements OnInit  {
  @Input() addBy: string = "quantity";
  @Input() saleDetailsNotInventories: any = [];
  @Input() saleDetailsPromotions: any = [];
  @Input() saleDetailsProducts: any = [];
  @Input() saleDetailsServices: any = [];
  @Output() emitter_removededArticle: EventEmitter<boolean> = new EventEmitter();
  @Output() emitter_changedArticle: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }
  method_removePromotionSaleDetail(promotionIndex:number) {
    const index = this.saleDetailsPromotions.indexOf(promotionIndex);
    this.saleDetailsPromotions.splice(index, 1);
    this.authenticationService.localStorage_setSaleDetailPromotions(this.saleDetailsPromotions);
    this.emitter_removededArticle.emit(true);
  }
  method_removeProductSaleDetail(productIndex:number) {
    const index = this.saleDetailsProducts.indexOf(productIndex);    
    this.saleDetailsProducts.splice(index, 1);
    this.authenticationService.localStorage_setSaleDetailProducts(this.saleDetailsProducts);
    this.emitter_removededArticle.emit(true);
  }
  method_removeServiceSaleDetail(serviceIndex:number) {
    const index = this.saleDetailsServices.indexOf(serviceIndex);
    this.saleDetailsServices.splice(index, 1);
    this.authenticationService.localStorage_setSaleDetailServices(this.saleDetailsServices);
    this.emitter_removededArticle.emit(true);
  }
  method_changeProduct(index:number, product: any) {
    var changeProduct = product;
    if(this.addBy === 'quantity'){
      changeProduct.amount = changeProduct.quantity * changeProduct.price;
    } else {
      changeProduct.quantity = changeProduct.amount / changeProduct.price; 
    }
    this.saleDetailsProducts[index] = changeProduct;   
    this.authenticationService.localStorage_setSaleDetailProducts(this.saleDetailsProducts);
    this.emitter_changedArticle.emit(true);
  }
  method_changeService(index:number,  service: any){
    var changeService = service;
    if(this.addBy === 'quantity'){
      changeService.amount = changeService.quantity * changeService.price;
    } else {
      changeService.quantity = changeService.amount / changeService.price; 
    }
    this.saleDetailsServices[index] = changeService;   
    this.authenticationService.localStorage_setSaleDetailServices(this.saleDetailsServices);
    this.emitter_changedArticle.emit(true);
  }
}

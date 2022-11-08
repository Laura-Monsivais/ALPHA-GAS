import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { Attention } from "../../../interfaces/attention";
import { AuthenticationService } from "../../../services/authentication.service";
import { PromotionService } from '../../../services/promotion.service';

@Component({
  selector: 'app-promotion-card',
  templateUrl: './promotion-card.component.html',
  styleUrls: ['./promotion-card.component.scss'],
})

export class PromotionCardComponent implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  attention: Attention = {id: 0, key: "", name: ""};
  promotions: any = [];
  promotion: any = {limit: 10, search: null};
  isLoadingGetPromotions: boolean = false;
  isLoadingAddCart: boolean = false;
  @Input() isGotArticles:boolean;
  @Output() emitter_isAddedArticle: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private promotionService: PromotionService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.attention = this.authenticationService.localStorage_getAttention();
    this.method_getPromotions(this.promotion);
  }
  ngOnChanges() {
    if(this.isGotArticles){
      this.emitter_isAddedArticle.emit(false);
    }
  }

  method_searchAdvancedPromotions() {
    this.method_getPromotions(this.promotion);
  }
  method_getPromotions(request: any) {
    this.isLoadingGetPromotions = true;
    this.promotionService.action_getPromotions(request)
    .subscribe(
      (data) => { 
        this.isLoadingGetPromotions = false;
        this.promotions = data;
      },
      (error) => {
        this.isLoadingGetPromotions = false;
        console.log("Error action_getPromotions: ",error);
      }
    );
  }
  method_addPromotionCart(promotion:any) {
    let promotionsAdded = this.authenticationService.localStorage_getOrderDetailPromotions();
    promotionsAdded.push({promotion_id: promotion.id, 
      name: promotion.name, 
      expires_at: promotion.expires_at, 
      quantity: 1, 
      price: promotion.price,
      cost: promotion.cost,  
      amount: 1 * promotion.price});
    this.authenticationService.localStorage_setOrderDetailPromotions(promotionsAdded);
    this.emitter_isAddedArticle.emit(true);
  }
}

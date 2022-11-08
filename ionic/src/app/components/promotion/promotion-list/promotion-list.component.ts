import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from "@angular/core";
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { PromotionService } from "../../../services/promotion.service";

@Component({
  selector: "app-promotion-list",
  templateUrl: "./promotion-list.component.html",
  styleUrls: ["./promotion-list.component.scss"],
})
export class PromotionListComponent implements OnInit, OnChanges {
  @Input() addBy: string = "quantity";
  @Input() sale: any;
  @Input() saleDetailsPromotions: any;
  rol: Rol = { id: 0, key: "", name: "" };
  promotions: any = [];
  promotion: any = {limit: 10, search: null};
  isLoadingGetPromotions: boolean = false;
  @Output() emitter_addedPromotion: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private promotionService: PromotionService
  ) {}

  ngOnInit() {
    this.promotion.enterprise_id = this.sale.enterpriseId;
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_getPromotions(this.promotion);
  }
  ngOnChanges() {
    if(this.sale.enterpriseId != 0) {
      this.promotion.enterprise_id = this.sale.enterpriseId;
      this.method_getPromotions(this.promotion);
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
          console.log("Error action_getPromotion: ", error);
        }
      );
  }
  method_addPromotionSaleDetail(promotion:any) {
    this.saleDetailsPromotions.push({promotion_id: promotion.id,  
      name: promotion.name, 
      expires_at: promotion.expires_at, 
      quantity: 1, 
      price: promotion.price,
      cost: promotion.cost,
      amount: promotion.price});
    this.authenticationService.localStorage_setSaleDetailPromotions(this.saleDetailsPromotions);
    this.emitter_addedPromotion.emit(true);   
  }
}

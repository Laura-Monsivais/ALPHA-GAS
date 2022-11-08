import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";
import { OrderDetailService } from "../../services/order-detail.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Order } from "../../interfaces/order";

@Component({
  selector: 'app-order-detail-do',
  templateUrl: './order-detail-do.page.html',
  styleUrls: ['./order-detail-do.page.scss'],
})
export class OrderDetailDoPage implements OnInit {
  order: Order = {
    id: 0, 
    enterpriseId: 0,
    businessId: 0,
    subsidiaryId: 0,
    client_id: 0,
    observation: "", 
    address_id: 0, 
    deliver_at: "", 
    deliverAtDate: "", 
    deliverAtTime: "",
    total: 0, 
    status: "", 
    code: ""
  };  
  promotions: any = [];
  products: any = [];
  cartQuantity: number = 0;

  constructor(
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private orderDetailService: OrderDetailService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.order.id = this.activatedRoute.snapshot.params.orderId;
    if(this.order.id == 0){
      this.promotions = this.authenticationService.localStorage_getOrderDetailPromotions();
      this.products = this.authenticationService.localStorage_getOrderDetailProducts();
      this.cartQuantity = this.products.length + this.promotions.length; 
      if(this.cartQuantity == 0){
        this.router.navigate(["/dashboard"]);
      } 
    } else {
      this.orderDetailService.action_getOrderDetails({orderId: this.order.id, promotions: true})
      .subscribe(
        (data) => { 
          this.authenticationService.localStorage_setOrderDetailPromotions(data);
          this.promotions = this.authenticationService.localStorage_getOrderDetailPromotions();
        },
        (error) => {console.log("Error action_getOrderDetails: ",error);}
      ); 
      this.orderDetailService.action_getOrderDetails({orderId: this.order.id, products: true})
      .subscribe(
        (data) => { 
          this.authenticationService.localStorage_setOrderDetailProducts(data);
          this.products = this.authenticationService.localStorage_getOrderDetailProducts();
        },
        (error) => {console.log("Error action_getOrderDetails: ",error);}
      );      
    }
  }
  
  ionViewDidLeave() {
  }

  method_goToDelivery(){
    this.router.navigate(["/delivery",this.order.id]);
  }
}

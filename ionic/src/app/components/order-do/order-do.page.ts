import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Order } from "../../interfaces/order";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { OrderService } from '../../services/order.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-order-do',
  templateUrl: './order-do.page.html',
  styleUrls: ['./order-do.page.scss'],
})
export class OrderDoPage implements OnInit {
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
  orderForm: FormGroup;
  isLoading: boolean = false;
  cartQuantity: number = 0;

  constructor(
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.orderForm = this.formBuilder.group({
      address_id: new FormControl("", [
        Validators.required,
        Validators.min(1)
      ]),
      deliverAtDate: new FormControl("", [
        Validators.required
      ]),
      deliverAtTime: new FormControl("", [
        Validators.required
      ]),
    });
  }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.order.id = this.activatedRoute.snapshot.params.orderId;
    this.promotions = this.authenticationService.localStorage_getOrderDetailPromotions();
    this.promotions.forEach(element => {
      this.order.total += element.amount        
    });
    this.products = this.authenticationService.localStorage_getOrderDetailProducts();
    this.products.forEach(element => {
      this.order.total += element.amount        
    });
    if(this.order.id == 0){
      let date = new Date();
      let monthNumber = date.getMonth()+1;
      let month = (monthNumber<10)?'0'+monthNumber: monthNumber;
      let dayNumber = date.getDate();
      let day = (dayNumber<10)?'0'+dayNumber: dayNumber;
      this.order.deliverAtDate = date.getFullYear() + "-"  + month + "-" + day;
      this.cartQuantity = this.products.length + this.promotions.length; 
      if(this.cartQuantity == 0){
        this.router.navigate(["/dashboard"]);
      } 
    } else {
      this.orderService.action_getOrders({id: this.order.id})
      .subscribe(
        (data) => { 
          this.order.observation = data.observation;
          this.order.address_id = data.address_id;
          this.order.deliverAtDate = data.deliverAtDate;
          this.order.deliverAtTime = data.deliverAtTime;
          this.order.total = this.order.total;
        },
        (error) => {console.log("Error action_getOrder: ",error);}
      );      
    }
  }
  ionViewDidLeave() {
  }

  method_doOrder() {
    this.orderForm.get('address_id').setValue(this.order.address_id);
    this.orderForm.get('deliverAtDate').setValue(this.order.deliverAtDate);
    this.orderForm.get('deliverAtTime').setValue(this.order.deliverAtTime);
    if (this.orderForm.valid) {
      this.isLoading = true;
      if(this.order.id == 0){
        this.orderService.action_insertOrder(this.order, this.promotions, this.products)
        .subscribe(
          (data) => { 
            if(data == 200){ 
              this.isLoading = false;
              this.authenticationService.localStorage_removeOrderDetailProducts();
              this.authenticationService.localStorage_removeOrderDetailPromotions();
              this.authenticationService.localStorage_setOrderDetailProducts([]);
              this.authenticationService.localStorage_setOrderDetailPromotions([]);
              Swal.fire("Pedido creado","",'success');
              this.router.navigate(["/orders"]);
            } else {
              this.isLoading = false;
              Swal.fire("Pedido no creado","Intentalo de nuevo",'warning');
              console.log("Response action_insertOrder: ",data);
            }
          },
          (error) => {
            this.isLoading = false;
            Swal.fire("Pedido no creado","Reporta a un superior",'error');
            console.log("Error action_insertOrder: ",error);
          }
        );
      } else {          
        this.orderService.action_updateOrder(this.order, this.promotions, this.products)
        .subscribe(
          (data) => { 
            if(data == 200){
              this.isLoading = false;
              this.authenticationService.localStorage_removeOrderDetailProducts();
              this.authenticationService.localStorage_removeOrderDetailPromotions();
              this.authenticationService.localStorage_setOrderDetailProducts([]);
              this.authenticationService.localStorage_setOrderDetailPromotions([]);
              Swal.fire("Pedido modificado","",'success');
              this.router.navigate(["/dashboard"]);
            } else {
              this.isLoading = false;
              Swal.fire("Pedido no modificado","Intentalo de nuevo",'warning');
              console.log("Response action_insertOrder: ",data);
            }
          },
          (error) => {
            this.isLoading = false;
            Swal.fire("Pedido no modificado","Reporta a un superior",'error');
            console.log("Error action_insertOrder: ",error);
          }
        );
      }
    } else {
      Swal.fire("Pedido incompleto","Completa la información",'info');
      console.log("Información formulario: ",this.orderForm);
    }
  }
}

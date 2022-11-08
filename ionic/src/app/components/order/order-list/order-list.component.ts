import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { OrderService } from '../../../services/order.service';
import { OrderDetailService } from "../../../services/order-detail.service";
import Swal from "sweetalert2";
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  @Input() sale: any;
  @Input() saleDetailsNotInventories: any;
  @Input() saleDetailsPromotions: any;
  @Input() saleDetailsProducts: any;
  rol: Rol = {id: 0, key: "", name: ""};
  orders: any = [];
  order: any = {limit: 10, search: null};
  search: string = '';
  isLoadingGetOrders: boolean = false;
  @Output() emitter_addedOrder: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService
  ) { }


  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.order.clientId = this.sale.client_id;
    this.order.status = "Pendiente";
    this.method_getOrders(this.order);
  }
  
  method_searchAdvancedOrders() {
    this.method_getOrders(this.order);
  }
  method_getOrders(request: any){
    this.isLoadingGetOrders = true;
    this.orderService.action_getOrders(request)
    .subscribe(
      (data) => { 
        this.isLoadingGetOrders = false;
        this.orders = data;
      },
      (error) => {
        this.isLoadingGetOrders = false;
        console.log("Error action_getOrders: ",error);
      }
    );
  }
  method_addOrder(order:any){
    this.sale.order_id = order.id;
    this.authenticationService.localStorage_setSale(this.sale);
    var angularThis = this;
    Promise.all([
      angularThis.method_orderDetailsPromotions(order.id), 
      angularThis.method_orderDetailsProductsInventories(order.id), 
      angularThis.method_orderDetailsProductsNotInventories(order.id)
    ])
    .then(results => {
      angularThis.emitter_addedOrder.emit(true);
    },
    function(reason){
      Swal.fire("Pedido no se puede agregar a la venta","Reporta a un superior",'error');
      console.log("Falla method_addOrder: ",reason);
    });
  }
  method_orderDetailsPromotions(orderId: number) {
    var angularThis = this;
      return new Promise(function(resolve, reject){
        angularThis.orderDetailService
          .action_getOrderDetails({
            orderId: orderId,
            promotions: true,
          })
          .subscribe(
            (data) => {
              angularThis.authenticationService.localStorage_setSaleDetailPromotions(data);
              resolve(data);
            },
            (error) => {
              console.log("Error action_getSaleDetails: ", error);
              reject(error);
            }
          );
      });
  }
  method_orderDetailsProductsInventories(orderId: number) {
    var angularThis = this;
    return new Promise(function(resolve, reject){
      angularThis.orderDetailService
        .action_getOrderDetails({
          orderId: orderId,
          products: true,
          inventories: 'yes'
        })
        .subscribe(
          (data) => {
            angularThis.authenticationService.localStorage_setSaleDetailProducts(data);
            resolve(data);
          },
          (error) => {
            console.log("Error action_getSaleDetails: ", error);
            reject(error);
          }
        );
    });
  }
  method_orderDetailsProductsNotInventories(orderId: number) {
    var angularThis = this;
    return new Promise(function(resolve, reject){
      angularThis.orderDetailService
        .action_getOrderDetails({
          orderId: orderId,
          products: true,
          inventories: 'no'
        })
        .subscribe(
          (data) => {
            angularThis.authenticationService.localStorage_setSaleDetailNotInventories(data);
            resolve(data);
          },
          (error) => {
            console.log("Error action_getSaleDetails: ", error);
            reject(error);
          }
        );
    });
  }
  method_removeOrderSale(){
    this.sale.order_id = 0;
    this.authenticationService.localStorage_setSale(this.sale);
    this.emitter_addedOrder.emit(false);
  }
}

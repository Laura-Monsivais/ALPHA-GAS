import { Component, OnInit, Input } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { Enterprise } from "../../../interfaces/enterprise";
import { Business } from "../../../interfaces/business";
import { Subsidiary } from "../../../interfaces/subsidiary";
import { Session } from "../../../interfaces/session";
import { AuthenticationService } from "../../../services/authentication.service";
import { SaleService } from "../../../services/sale.service";
import { SaleDetailService } from "../../../services/sale-detail.service";
import { OrderDetailService } from "../../../services/order-detail.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { Order } from 'src/app/interfaces/order';

@Component({
  selector: 'app-sale-do-link',
  templateUrl: './sale-do-link.component.html',
  styleUrls: ['./sale-do-link.component.scss'],
})

export class SaleDoLinkComponent implements OnInit {
  @Input() saleId: number;
  @Input() order: Order = {
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
  rol: Rol = { id: 0, key: "", name: "" };
  enterprise: Enterprise = {id: 0, name: ""};
  business: Business = {id: 0, name: "", enterprise_id: 0, attention_id: 0};
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
  session: Session = {
    id: 0, 
    user_id: 0, 
    userCellphone: 0,
    enterpriseId: 0, 
    businessId: 0, 
    subsidiary_id: 0, 
    rol_id: 0
  };

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private saleService: SaleService,
    private saleDetailService: SaleDetailService,
    private orderDetailService: OrderDetailService,
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }  

  method_goToSaleDo() {
    Swal.showLoading();
    var angularThis = this;
    if (this.saleId == 0) {
      var sale = {
        id: this.saleId,
        enterpriseId: (this.order.enterpriseId) ? this.order.enterpriseId : 0, 
        businessId: (this.order.businessId) ? this.order.businessId : 0, 
        subsidiaryId: (this.order.subsidiaryId) ? this.order.subsidiaryId : 0,
        seller_id: 0,
        client_id: (this.order.client_id) ? this.order.client_id : 0,
        order_id: (this.order.id) ? this.order.id : 0,
        total: (this.order.total) ? this.order.total : 0
      };
      switch(this.rol.key){
        case 'Super':
        break;
        case 'Director':
          this.enterprise = this.authenticationService.localStorage_getEnterprise();
          sale.enterpriseId = this.enterprise.id;
        break;
        case 'Manager':
        break;
        case 'Call_Center':
        break;
        case 'Seller':
          this.enterprise = this.authenticationService.localStorage_getEnterprise();
          sale.enterpriseId = this.enterprise.id;
          this.business = this.authenticationService.localStorage_getBusiness();
          sale.businessId = this.business.id;
          this.subsidiary = this.authenticationService.localStorage_getSubsidiary();
          sale.subsidiaryId = this.subsidiary.id;
          this.session = this.authenticationService.localStorage_getSession();
          sale.seller_id = this.session.id;
        break;
        case 'Client':
        break;
        default:
        break;
      }
      this.authenticationService.localStorage_setSale(sale);
      if(this.order){
        Promise.all([
          angularThis.method_orderDetailsPromotions(angularThis.order.id), 
          angularThis.method_orderDetailsProductsInventories(angularThis.order.id), 
          angularThis.method_orderDetailsProductsNotInventories(angularThis.order.id)
        ])
        .then(results => {
          angularThis.router.navigate(["/sale-do", sale.id])
          .then(() => {
            window.location.reload();
          });
        },
        function(reason){
          Swal.fire("Pedido no se puede crear venta","Reporta a un superior",'error');
          console.log("Falla method_goToSaleDo: ",reason);
        });
      } else {
        this.router.navigate(["/sale-do", sale.id])
        .then(() => {
          window.location.reload();
        });
      }
    } else {
      this.saleService.action_getSales({ id: this.saleId })
      .subscribe(
        (data) => {
          this.authenticationService.localStorage_setSale(data);
          Promise.all([
            angularThis.method_saleDetailsPromotions(data.id),
            angularThis.method_saleDetailsProducts(data.id),
            angularThis.method_saleDetailsServices(data.id),
          ]).then(
            (results) => {
              angularThis.router.navigate(["/sale-do", data.id])
              .then(() => {
                window.location.reload();
              });
            },
            function (reason) {
              Swal.fire(
                "Venta no se puede modificar",
                "Reporta a un superior",
                "error"
              );
              console.log("Falla method_saleDetails: ", reason);
            }
          );
        },
        (error) => {
          console.log("Error action_getSale: ", error);
        }
      );
    }
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
  method_saleDetailsPromotions(saleId: number) {
    var angularThis = this;
    return new Promise(function (resolve, reject) {
      angularThis.saleDetailService
        .action_getSaleDetails({
          sale_id: saleId,
          promotions: true,
        })
        .subscribe(
          (data) => {
            angularThis.authenticationService.localStorage_setSaleDetailPromotions(
              data
            );
            resolve(data);
          },
          (error) => {
            console.log("Error action_getSaleDetails: ", error);
            reject(error);
          }
        );
    });
  }
  method_saleDetailsProducts(saleId: number) {
    var angularThis = this;
    return new Promise(function (resolve, reject) {
      angularThis.saleDetailService
        .action_getSaleDetails({
          sale_id: saleId,
          products: true,
        })
        .subscribe(
          (data) => {
            angularThis.authenticationService.localStorage_setSaleDetailProducts(
              data
            );
            resolve(data);
          },
          (error) => {
            console.log("Error action_getSaleDetails: ", error);
            reject(error);
          }
        );
    });
  }
  method_saleDetailsServices(saleId: number) {
    var angularThis = this;
    return new Promise(function (resolve, reject) {
      angularThis.saleDetailService
        .action_getSaleDetails({
          sale_id: saleId,
          services: true,
        })
        .subscribe(
          (data) => {
            angularThis.authenticationService.localStorage_setSaleDetailServices(
              data
            );
            resolve(data);
          },
          (error) => {
            console.log("Error action_getSaleDetails: ", error);
            reject(error);
          }
        );
    });
  }
}

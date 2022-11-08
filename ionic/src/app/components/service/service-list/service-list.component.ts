import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
} from "@angular/core";
import { Rol } from "../../../interfaces/rol";
import { Attention } from "../../../interfaces/attention";
import { AuthenticationService } from "../../../services/authentication.service";
import { ServiceService } from "../../../services/service.service";
@Component({
  selector: "app-service-list",
  templateUrl: "./service-list.component.html",
  styleUrls: ["./service-list.component.scss"],
})
export class ServiceListComponent implements OnInit, OnChanges {
  @Input() addBy: string = "quantity";
  @Input() buy: any;
  @Input() sale: any;
  @Input() saleDetailsServices: any;
  @Input() buyDetailsServices: any;
  @Input() isBuy: boolean;
  rol: Rol = { id: 0, key: "", name: "" };
  attention: Attention = { id: 0, key: "", name: "" };
  services: any = [];
  service: any = { limit: 10, search: null, name: null };
  search: string = "";
  isLoadingGetServices: boolean = false;
  @Output() emiitter_addedService: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private serviceService: ServiceService
  ) {}

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.attention = this.authenticationService.localStorage_getAttention();
    this.method_searchAdvancedServices();
  }
  ngOnChanges() {
    if(this.sale) {
      if(this.sale.enterpriseId != 0) {
        this.service.enterprise_id = this.sale.enterpriseId;
        this.method_getServices(this.service);
      }
    }
    if(this.buy) {
      if(this.buy.enterpriseId != 0) {
        this.service.enterprise_id = this.buy.enterpriseId;
        this.method_getServices(this.service);
      }
    }
  }

  method_searchAdvancedServices() {
    this.method_getServices(this.service);
  }
  method_getServices(request: any) {
    this.isLoadingGetServices = true;
    this.serviceService.action_getServices(request).subscribe(
      (data) => {
        this.isLoadingGetServices = false;
        this.services = data;
      },
      (error) => {
        this.isLoadingGetServices = false;
        console.log("Error action_getServices: ", error);
      }
    );
  }
  method_changeService(index: number, service: any){
    var changeService = service;
    if(this.addBy === 'quantity'){
      changeService.amountCost = changeService.quantity * changeService.cost;
      changeService.amountPrice = changeService.quantity * changeService.price;
    } else {
      if(this.buy){
        changeService.quantity = changeService.amountCost / changeService.cost; 
      } else {
        changeService.quantity = changeService.amountPrice / changeService.price; 
      }     
    }
    this.services[index] = changeService;
  }
  method_addServiceDetail(service: any){
    if(this.saleDetailsServices){
      this.method_addServiceSaleDetail(service);
    }
    if(this.buyDetailsServices){
      this.method_addServiceBuyDetail(service);
    }
  }
  method_addServiceSaleDetail(service:any) {
    this.saleDetailsServices.push({service_id: service.id,  
      name: service.name, 
      quantity: 1, 
      price: service.price,
      amount: service.price});
    this.authenticationService.localStorage_setSaleDetailServices(this.saleDetailsServices);
    this.emiitter_addedService.emit(true);  
  }
  method_addServiceBuyDetail(service:any) {
    var addService = {service_id: service.id,  
      name: service.name, 
      quantity: service.quantity, 
      cost: service.cost, 
      amount: service.amountCost
    };
    this.buyDetailsServices.push(addService);
    this.authenticationService.localStorage_setBuyDetailServices(this.buyDetailsServices);
    this.emiitter_addedService.emit(true);  
  }
}

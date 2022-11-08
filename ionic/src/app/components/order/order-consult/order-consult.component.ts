import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { ModalDirective } from 'angular-bootstrap-md';
import { AuthenticationService } from "../../../services/authentication.service";
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-consult',
  templateUrl: './order-consult.component.html',
  styleUrls: ['./order-consult.component.scss'],
})

export class OrderConsultComponent implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() orderId: number;
  @Input() showedModalOrderConsult: boolean = false;
  @ViewChild('orderConsult') public orderConsult: ModalDirective;  
  order: any = {id: 0, 
    code: "", 
    status: "", 
    created_at: "", 
    updated_at: "", 
    subsidiaryName: "",
    clientNameComplete: "", 
    clientCellphone: "",
    observation: "",  
    addressName: "", 
    addressConcat: "", 
    deliverAtDate: "", 
    deliverAtTime: "", 
    total: 0};  
  @Output() emitter_gotOrderInConsult: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ngOnChanges() {
    if(this.showedModalOrderConsult){
      this.method_getOrder();
      this.emitter_gotOrderInConsult.emit(true);
    } else {
      this.emitter_gotOrderInConsult.emit(false);
    }
  }

  method_getOrder() { 
    this.orderConsult.show();  
    this.orderService.action_getOrders({id: this.orderId})
    .subscribe(
      (data) => { this.order = data; },
      (error) => {console.log("Error action_getOrder: ",error);}
    ); 
  }
}

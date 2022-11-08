import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { ModalDirective } from 'angular-bootstrap-md';
import { AuthenticationService } from "../../../services/authentication.service";
import { BuyService } from '../../../services/buy.service';

@Component({
  selector: 'app-buy-consult',
  templateUrl: './buy-consult.component.html',
  styleUrls: ['./buy-consult.component.scss'],
})
export class BuyConsultComponent implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() buyId: number;
  @Input() showedModalBuyConsult: boolean = false;
  @ViewChild('buyConsult') public buyConsult: ModalDirective;  
  buy: any = { id: 0 };
  @Output() emitter_gotBuyInConsult: EventEmitter<boolean> = new EventEmitter();  

  constructor(
    private authenticationService: AuthenticationService,
    private buyService: BuyService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ngOnChanges() {
    if(this.showedModalBuyConsult){
      this.method_getBuy();
      this.emitter_gotBuyInConsult.emit(true);
    } else {
      this.emitter_gotBuyInConsult.emit(false);
    }
  }
  
  method_getBuy() {    
    this.buyConsult.show();
    this.buyService.action_getBuys({id: this.buyId})
    .subscribe(
      (data) => { this.buy = data; },
      (error) => {console.log("Error action_getBuy: ",error);}
    );
  }
}

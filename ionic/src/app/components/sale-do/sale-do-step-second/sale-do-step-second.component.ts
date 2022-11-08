import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Attention } from '../../../interfaces/attention';
import { AuthenticationService } from "../../../services/authentication.service";
@Component({
  selector: 'app-sale-do-step-second',
  templateUrl: './sale-do-step-second.component.html',
  styleUrls: ['./sale-do-step-second.component.scss'],
})
export class SaleDoStepSecondComponent implements OnInit {
  addBy: string = "quantity";
  @Input() sale: any;
  @Input() saleDetailsNotInventories: any;
  @Input() saleDetailsPromotions: any;
  @Input() saleDetailsProducts: any;
  @Input() saleDetailsServices: any;
  attention: Attention = {id: 0, key: "", name: ""};
  @Output() emitter_changedSale: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authenticationService : AuthenticationService
  ) { }

  ngOnInit() {
    this.attention = this.authenticationService.localStorage_getAttention();
  }
  
  method_addedArticle(event:boolean){
    if(event){   
      this.emitter_changedSale.emit(true);
    }
  }
  method_removededArticle(event:boolean){
    if(event){      
      this.emitter_changedSale.emit(true);
    }
  }
  method_changedArticle(event:boolean){
    if(event){      
      this.emitter_changedSale.emit(true);
    }
  }
}

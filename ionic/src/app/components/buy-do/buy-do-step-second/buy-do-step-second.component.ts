import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: 'app-buy-do-step-second',
  templateUrl: './buy-do-step-second.component.html',
  styleUrls: ['./buy-do-step-second.component.scss'],
})

export class BuyDoStepSecondComponent implements OnInit {
  addBy: string = "quantity";
  @Input() buy: any;
  @Input() buyDetailsProducts: any;
  @Input() buyDetailsServices: any;
  @Output() emitter_changedBuy: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authenticationService : AuthenticationService
  ) { }
  ngOnInit() {
  } 

  method_addedArticle(event:boolean){
    if(event){   
      this.emitter_changedBuy.emit(true);
    }
  }
  method_removededArticle(event:boolean){
    if(event){      
      this.emitter_changedBuy.emit(true);
    }
  }
  method_changedArticle(event:boolean){
    if(event){      
      this.emitter_changedBuy.emit(true);
    }
  }
}

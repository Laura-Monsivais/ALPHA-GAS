import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { ModalDirective } from 'angular-bootstrap-md';
import { AuthenticationService } from "../../../services/authentication.service";
import { PromotionService } from '../../../services/promotion.service';

@Component({
  selector: 'app-promotion-consult',
  templateUrl: './promotion-consult.component.html',
  styleUrls: ['./promotion-consult.component.scss'],
})

export class PromotionConsultComponent implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() promotionId: number;
  @Input() showedPromotionInConsult: boolean = false;
  @ViewChild('promotionConsult') public promotionConsult: ModalDirective;  
  promotion: any = {id: 0, 
    name: ""
  };
  @Output() emitter_gotPromotionInConsult: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private promotionService: PromotionService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ngOnChanges() {
    if(this.showedPromotionInConsult){
      this.method_getPromotion();
      this.emitter_gotPromotionInConsult.emit(true);
    } else {
      this.emitter_gotPromotionInConsult.emit(false);
    }
  }
  
  method_getPromotion() {    
    this.promotionConsult.show();
    this.promotionService.action_getPromotions({id: this.promotionId})
    .subscribe(
      (data) => { this.promotion = data; },
      (error) => {console.log("Error action_getPromotion: ",error);}
    );
  }
  method_diffDays(date:string) {
    let currentDate = new Date();
    let dateSent = new Date(date);
    return Math.floor(
      ( 
        Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) - 
        Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
      ) / (1000 * 60 * 60 * 24)
    );
  }
}

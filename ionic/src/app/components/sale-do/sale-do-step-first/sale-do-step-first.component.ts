import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Attention } from "../../../interfaces/attention"
import { AuthenticationService } from "../../../services/authentication.service";
import { BusinessService } from '../../../services/business.service';
import { SubsidiaryService } from '../../../services/subsidiary.service';
import { SessionService } from '../../../services/session.service';
import { Rol } from "../../../interfaces/rol";

@Component({
  selector: "app-sale-do-step-first",
  templateUrl: "./sale-do-step-first.component.html",
  styleUrls: ["./sale-do-step-first.component.scss"],
})
export class SaleDoStepFirstComponent implements OnInit {
  @Input() sale: any;
  @Input() enterprises: any = [];
  @Input() businesses: any = [];
  @Input() subsidiaries: any = [];
  @Input() sessions: any = [];
  @Input() saleDetailsNotInventories: any;
  @Input() saleDetailsPromotions: any;
  @Input() saleDetailsProducts: any;
  attention: Attention = {id: 0, key: "", name: ""};
  @Output() emitter_changedSale: EventEmitter<boolean> = new EventEmitter();
  rol: Rol = {id: 0, key: "", name: ""};

  constructor(
    private authenticationService: AuthenticationService,
    private businessService: BusinessService,
    private subsidiaryService: SubsidiaryService,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.attention = this.authenticationService.localStorage_getAttention();
  }

  method_getBusinesses(): void {
    this.businessService.action_getBusinesses({enterprise_id: this.sale.enterpriseId})
    .subscribe(
      (data) => { this.businesses = data;},
      (error) => {console.log("Error action_getBusinesses: ",error);}
    );
  }
  method_getSubsidiaries(): void {
    this.subsidiaryService.action_getSubsidiaries({business_id: this.sale.businessId})
    .subscribe(
      (data) => { this.subsidiaries = data;},
      (error) => {console.log("Error action_getSubsidiaries: ",error);}
    );
  }
  method_getSessions(): void {
    this.sessionService.action_getSessions({subsidiary_id: this.sale.subsidiaryId, sellers: true})
    .subscribe(
      (data) => { this.sessions = data;},
      (error) => {console.log("Error action_getSessions: ",error);}
    );
  }
  method_addedClient(event:boolean){
    this.emitter_changedSale.emit(true);
  }
  method_addedOrder(event:boolean){
    this.emitter_changedSale.emit(true);
  }
}


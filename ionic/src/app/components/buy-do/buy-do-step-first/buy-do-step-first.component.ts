import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { BusinessService } from "../../../services/business.service";
import { SubsidiaryService } from "../../../services/subsidiary.service";

@Component({
  selector: "app-buy-do-step-first",
  templateUrl: "./buy-do-step-first.component.html",
  styleUrls: ["./buy-do-step-first.component.scss"],
})
export class BuyDoStepFirstComponent implements OnInit {
  @Input() buy: any;
  @Input() enterprises: any = [];
  @Input() businesses: any = [];
  @Input() expectedDestinations: any = [];
  @Input() destinations: any = [];
  @Input() buyDetailsProducts: any;
  @Input() buyDetailsServices: any;
  @Output() emitter_changedBuy: EventEmitter<boolean> = new EventEmitter();
  rol: Rol = { id: 0, key: "", name: "" };

  constructor(
    private authenticationService: AuthenticationService,
    private businessService: BusinessService,
    private subsidiaryService: SubsidiaryService
  ) {}

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  
  method_getBusinesses(): void {
    this.businessService
    .action_getBusinesses({ enterprise_id: this.buy.enterpriseId })
    .subscribe(
      (data) => {
        this.businesses = data;
      },
      (error) => {
        console.log("Error action_getBusinesses: ", error);
      }
    );
  }
  method_getSubsidiaries(): void {
    this.subsidiaryService
    .action_getSubsidiaries({ business_id: this.buy.businessId })
    .subscribe(
      (data) => {
        this.expectedDestinations = data;
        this.destinations = data;
      },
      (error) => {
        console.log("Error action_getSubsidiaries: ", error);
      }
    );
  }
}

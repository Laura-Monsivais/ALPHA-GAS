import { Component, OnInit, Input } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { BusinessService } from '../../../services/business.service';
import { SubsidiaryService } from '../../../services/subsidiary.service';
@Component({
  selector: 'app-promotion-form',
  templateUrl: './promotion-form.component.html',
  styleUrls: ['./promotion-form.component.scss'],
})

export class PromotionFormComponent implements OnInit {
  @Input() promotion: any;
  @Input() enterprises: any = [];
  @Input() businesses: any = [];
  @Input() subsidiaries: any = [];
  rol: Rol = {id: 0, key: "", name: ""};
  
  constructor(
    private authenticationService: AuthenticationService,
    private businessService: BusinessService,
    private subsidiaryService: SubsidiaryService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  method_getBusinesses(): void {
    this.businessService.action_getBusinesses({enterprise_id: this.promotion.enterprise_id})
    .subscribe(
      (data) => { this.businesses = data;},
      (error) => {console.log("Error action_getBusinesses: ",error);}
    );
  }
  method_getSubsidiaries(): void {
    this.subsidiaryService.action_getSubsidiaries({business_id: this.promotion.business_id})
    .subscribe(
      (data) => { this.subsidiaries = data;},
      (error) => {console.log("Error action_getSubsidiaries: ",error);}
    );
  }
}

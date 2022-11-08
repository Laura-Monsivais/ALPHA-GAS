import { Component, OnInit, Input } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { BusinessService } from '../../../services/business.service';
import { SubsidiaryService } from '../../../services/subsidiary.service';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-route-form',
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.scss'],
})

export class RouteFormComponent implements OnInit {
  @Input() route: any;
  @Input() routeTypes: any = [];
  @Input() enterprises: any = [];
  @Input() businesses: any = [];
  @Input() subsidiaries: any = [];
  @Input() sessions: any = [];
  rol: Rol = {id: 0, key: "", name: ""};

  constructor(
    private authenticationService: AuthenticationService,
    private businessService: BusinessService,  
    private subsidiaryService: SubsidiaryService, 
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  
  method_calculateMinimumCapacity() {
    this.route.minimum_capacity = (10 * this.route.maximum_capacity) / 100;
  }
  method_getBusinesses(): void {
    this.businessService.action_getBusinesses({enterprise_id: this.route.enterpriseId})
    .subscribe(
      (data) => { this.businesses = data;},
      (error) => {console.log("Error action_getBusinesses: ",error);}
    );
  }
  method_getSubsidiaries(): void {
    this.subsidiaryService.action_getSubsidiaries({business_id: this.route.businessId})
    .subscribe(
      (data) => { this.subsidiaries = data;},
      (error) => {console.log("Error action_getSubsidiaries: ",error);}
    );
  }
  method_getSessions(): void {
    this.sessionService.action_getSessions({subsidiary_id: this.route.subsidiaryId, sellers: true})
    .subscribe(
      (data) => { this.sessions = data;},
      (error) => {console.log("Error action_getSessions: ",error);}
    );
  }
  method_getSession(): void {
    this.sessionService.action_getSessions({id: this.route.seller_id})
    .subscribe(
      (data) => { this.route.cellphone = data.userCellphone;},
      (error) => {console.log("Error action_getSession: ",error);}
    );
  }
}

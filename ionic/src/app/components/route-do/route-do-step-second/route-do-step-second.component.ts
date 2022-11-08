import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from "../../../services/authentication.service";
import { RoutePlace } from "../../../interfaces/route-place";
import { Subsidiary } from 'src/app/interfaces/subsidiary';

@Component({
  selector: 'app-route-do-step-second',
  templateUrl: './route-do-step-second.component.html',
  styleUrls: ['./route-do-step-second.component.scss'],
})

export class RouteDoStepSecondComponent implements OnInit {
  routePlace: RoutePlace = {
    id: 0, 
    postal_code: "", 
    neighborhood: "", 
    city: "", 
    municipality: "", 
    state: "", 
    country: "",
    route_id: 0
  };  
  @Input() routePlaces: any;
  @Output() emitter_changedRoute: EventEmitter<boolean> = new EventEmitter();
  subsidiary: Subsidiary = {
    id: 0, 
    name: "", 
    is_central: false,
    logo: null,
    logoFile: null,
    overlay: null,
    overlayFile: null,
    street: "",
    exterior: "",
    interior: null,
    postal_code: "",
    neighborhood: "",
    city: "",
    municipality: "",
    state: "",
    country: "",
    references: null,
    enterpriseId: 0, 
    business_id: 0
  };

  constructor(
    private authenticationService : AuthenticationService
  ) { }

  ngOnInit() {
    this.subsidiary = this.authenticationService.localStorage_getSubsidiary();
    this.routePlace = {
      id: 0, 
      postal_code: this.subsidiary.postal_code, 
      neighborhood: this.subsidiary.neighborhood, 
      city: this.subsidiary.city, 
      municipality: this.subsidiary.municipality, 
      state: this.subsidiary.state, 
      country: this.subsidiary.country,
      route_id: 0
    };
  }

  method_addedRoutePlace(event:boolean){
    if(event){   
      this.emitter_changedRoute.emit(true);
    }
  }
  method_removededRoutePlace(event:boolean){
    if(event){      
      this.emitter_changedRoute.emit(true);
    }
  }
}

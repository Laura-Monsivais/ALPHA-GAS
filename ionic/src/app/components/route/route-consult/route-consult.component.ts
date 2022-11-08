import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { ModalDirective } from 'angular-bootstrap-md';
import { AuthenticationService } from "../../../services/authentication.service";
import { RouteService } from '../../../services/route.service';

@Component({
  selector: 'app-route-consult',
  templateUrl: './route-consult.component.html',
  styleUrls: ['./route-consult.component.scss'],
})

export class RouteConsultComponent implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() routeId: number;
  @Input() showedRouteInConsult: boolean = false;
  @ViewChild('routeConsult') public routeConsult: ModalDirective;  
  route: any = {id: 0, 
    name: "", 
    routeTypeName: "", 
    cellphone: "", 
    maximum_capacity: "",
    minimum_capacity: "", 
    enterpriseName: "", 
    sellerNameComplete: "", 
    created_at: "", 
    updated_at: ""
  };
  @Output() emitter_gotRouteInConsult: EventEmitter<boolean> = new EventEmitter();  

  constructor(
    private authenticationService: AuthenticationService,
    private routeService: RouteService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ngOnChanges() {
    if(this.showedRouteInConsult){
      this.method_getRoute();
      this.emitter_gotRouteInConsult.emit(true);
    } else {
      this.emitter_gotRouteInConsult.emit(false);
    }
  }
  
  method_getRoute() {    
    this.routeConsult.show();
    this.routeService.action_getRoutes({id: this.routeId})
    .subscribe(
      (data) => { this.route = data; },
      (error) => {console.log("Error action_getRoute: ",error);}
    );
  }
}

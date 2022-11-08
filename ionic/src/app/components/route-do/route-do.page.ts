import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { MatStepper } from "@angular/material/stepper";
import { Route } from "../../interfaces/route";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
import { RouteService } from "../../services/route.service";
import { RouteTypeService } from '../../services/routeType.service';
import { EnterpriseService } from '../../services/enterprise.service';
import { BusinessService } from '../../services/business.service';
import { SubsidiaryService } from '../../services/subsidiary.service';
import { SessionService } from '../../services/session.service';
import { RoutePlaceService } from "../../services/route-place.service";
import Swal from "sweetalert2";
import { Rol } from "../../interfaces/rol";

@Component({
  selector: 'app-route-do',
  templateUrl: './route-do.page.html',
  styleUrls: ['./route-do.page.scss'],
})

export class RouteDoPage implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  isLinear = false;
  route: Route = {id: 0, name: "", route_type_id: 0, cellphone: 0, maximum_capacity: 0, minimum_capacity: 0, enterpriseId: 0,  businessId: 0, subsidiaryId: 0, seller_id: 0};
  changedRoute:boolean = false;
  routeTypes: any =[];
  enterprises: any = [];
  businesses: any = [];
  subsidiaries: any = [];
  sessions: any = [];
  firstFormGroup: FormGroup;
  routePlaces: any = [];
  secondFormGroup: FormGroup;
  detailRouteQuantity: number = 0;
  thirdFormGroup: FormGroup;
  isLoading: boolean;

  constructor(
    private routeTypeService: RouteTypeService,
    private enterpriseService: EnterpriseService, 
    private businessService: BusinessService,  
    private subsidiaryService: SubsidiaryService, 
    private sessionService: SessionService,  
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private routeService: RouteService,
    private routePlaceService: RoutePlaceService
  ) {
    this.firstFormGroup = this.formBuilder.group({
      name: new FormControl("", [
        Validators.required
      ]),
      route_type_id: new FormControl("", [
        Validators.required,
        Validators.min(1)
      ]),
      cellphone: new FormControl("", [
        Validators.required
      ]),
      maximum_capacity: new FormControl("", [
        Validators.required
      ]),
      minimum_capacity: new FormControl("", [
        Validators.required
      ]),
      seller_id: new FormControl("", [
        Validators.required
      ]),
    });
    this.secondFormGroup = this.formBuilder.group({
      detailRouteQuantity: new FormControl("", [
        Validators.required,
        Validators.min(1),
      ]),
    });
  }

  ngOnInit() {}
  ionViewDidEnter() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_dataRoute();
    this.method_getRouteTypes();
    this.method_getEnterprises();
    if(this.route.id == 0){
      switch(this.rol.key){
        case 'Super':
        break;
        case 'Director':
          this.method_getBusinesses();
        break;
        case 'Manager':
        break;
        case 'Call_Center':
        break;
        case 'Seller':
        break;
        case 'Client':
        break;
        default:
        break;
      }
    } else {
      this.method_getBusinesses();
      this.method_getSubsidiaries();
      this.method_getSessions();
    }
  }
  ionViewDidLeave() {
    this.authenticationService.localStorage_setRoute({});
    this.authenticationService.localStorage_setRoutePlaces([]);
  }

  method_dataRoute(){
    this.route = this.authenticationService.localStorage_getRoute();
    this.routePlaces = this.authenticationService.localStorage_getRoutePlaces();
    this.detailRouteQuantity = this.routePlaces.length;
  }
  method_changedRoute(event:boolean){
    this.changedRoute = event;
    if(this.changedRoute){
      this.method_dataRoute();
    }
  }
  method_getRouteTypes(): void {
    this.routeTypeService.action_getRouteTypes({})
    .subscribe(
      (data) => { this.routeTypes = data;},
      (error) => {console.log("Error action_getRouteTypes: ",error);}
    );
  }
  method_getEnterprises(): void {
    this.enterpriseService.action_insideGetEnterprises({})
    .subscribe(
      (data) => { this.enterprises = data;},
      (error) => {console.log("Error action_getEnterprises: ",error);}
    );
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
  method_nextStepperSecond(stepper: MatStepper) {
    this.firstFormGroup.get('name').setValue(this.route.name);
    this.firstFormGroup.get('route_type_id').setValue(this.route.route_type_id);
    this.firstFormGroup.get('cellphone').setValue(this.route.cellphone);
    this.firstFormGroup.get('maximum_capacity').setValue(this.route.maximum_capacity);
    this.firstFormGroup.get('minimum_capacity').setValue(this.route.minimum_capacity);
    this.firstFormGroup.get('seller_id').setValue(this.route.seller_id);
    if (this.firstFormGroup.valid) {
      this.authenticationService.localStorage_setRoute(this.route);
      console.log("Primer paso de ruta valido");
      stepper.next();
    } else {
      Swal.fire(
        "Primer paso de ruta no valido",
        "Completa la información",
        "info"
      );
      console.log("Información formulario: ",this.firstFormGroup);
    }
  }
  method_previousStepperFirst(stepper: MatStepper) {
    stepper.previous();
  }
  method_doRoute(stepper: MatStepper) {
    this.method_dataRoute();
    this.secondFormGroup.get("detailRouteQuantity").setValue(this.detailRouteQuantity);
    if (this.secondFormGroup.valid) {
      this.isLoading = true;
      if (this.route.id == 0) {
        this.routeService
          .action_insertRoute(
            this.route,
            this.routePlaces
          )
          .subscribe(
            (data) => {
              if (data == 200) {
                stepper.reset();
                this.isLoading = false;
                Swal.fire("Ruta creada", "", "success");
                this.router.navigate(["routes", true]);
              } else {
                this.isLoading = false;
                Swal.fire("Ruta no creada", "Intentalo de nuevo", "warning");
                console.log("Response action_insertRoute: ", data);
              }
            },
            (error) => {
              this.isLoading = false;
              Swal.fire("Ruta no creada", "Reporta a un superior", "error");
              console.log("Error action_insertRoute: ", error);
            }
          );
      } else {
        this.routeService
          .action_updateRoute(
            this.route,
            this.routePlaces
          )
          .subscribe(
            (data) => {
              if (data == 200) {
                stepper.reset();
                this.isLoading = false;
                Swal.fire("Ruta modificada", "", "success");
                this.router.navigate(["/routes", true]);
              } else {
                this.isLoading = false;
                Swal.fire("Ruta no modificada", "Intentalo de nuevo", "warning");
                console.log("Response action_updateRoute: ", data);
              }
            },
            (error) => {
              this.isLoading = false;
              Swal.fire("Ruta no modificada", "Reporta a un superior", "error");
              console.log("Error action_updateRoute: ", error);
            }
          );
      }
    } else {
      Swal.fire(
        "Segundo paso de ruta no valido",
        "Completa la información",
        "info"
      );
      console.log("Información formulario: ",this.secondFormGroup);
    }
  }

}

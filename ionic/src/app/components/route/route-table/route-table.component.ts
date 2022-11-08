import { Component, OnInit, AfterViewInit, OnChanges, ViewChild, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { RouteTypeService } from '../../../services/routeType.service';
import { EnterpriseService } from '../../../services/enterprise.service';
import { BusinessService } from "../../../services/business.service";
import { SubsidiaryService } from "../../../services/subsidiary.service";
import { SessionService } from '../../../services/session.service';
import { RouteService } from '../../../services/route.service';
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { Enterprise } from "../../../interfaces/enterprise";
import { RoutePlaceService } from 'src/app/services/route-place.service';

@Component({
  selector: 'app-route-table',
  templateUrl: './route-table.component.html',
  styleUrls: ['./route-table.component.scss'],
})

export class RouteTableComponent implements OnInit, AfterViewInit {
  rol: Rol = {id: 0, key: "", name: ""};
  enterprise: Enterprise = {id: 0, name: ""};
  route: any = {
    search: null, 
    limit: 20, 
    name: null, 
    route_type_id: null,
    maximum_capacity: null,
    minimum_capacity: null,
    enterpriseId: null,
    businessId: null,
    subsidiaryId: null,
    seller_id: null,
    cellphone: null, 
    createdAtStart: null, 
    createdAtEnd: null
  };
  isLoading: boolean = false;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  headsSort = ['id','name','routeTypeName', 'sellerNameComplete', 'enterpriseName', 'businessName', 'subsidiaryName', 'created_at', 'updated_at'];
  heads = ['Opciones','Nombre','Tipo de ruta', 'Vendedor', 'Empresa', 'Negocio', 'Sucursal', 'Creado', 'Modificado'];
  enterprises: any = [];
  businesses: any = [];
  subsidiaries: any = [];
  sessions: any = [];
  routes: any = [];
  routeTypes: any = [];
  routeId: number = 1;
  showedRouteInUpdate: boolean = false;
  showedRouteInConsult: boolean = false;
  gotRoutesInUpdate: boolean = false
  previous: any = [];
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @Input() getRoutes: Boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private routeTypeService: RouteTypeService,
    private enterpriseService: EnterpriseService,
    private businessService: BusinessService,
    private subsidiaryService: SubsidiaryService, 
    private sessionService: SessionService,
    private routeService: RouteService,
    private routePlaceService: RoutePlaceService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) { }
  
  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_getRouteTypes();
    this.method_getEnterprises();
    this.method_getBusinesses();
    this.method_getSubsidiaries();
    this.method_getSessions();
    this.method_getRoutes(this.route);
  }
  ngOnChanges() {
    if(this.getRoutes){
      this.method_getRoutes(this.route);
    }
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  method_goToRouteDo(routeId: number) { 
    Swal.showLoading();
    if(routeId == 0) {
      var route = {id: 0, name: "", route_type_id: 0, cellphone: 0, maximum_capacity: 0, minimum_capacity: 0, enterpriseId: 0, businessId: 0, subsidiaryId: 0, seller_id: 0};
      this.enterprise = this.authenticationService.localStorage_getEnterprise();
      switch(this.rol.key){
        case 'Super':
        break;
        case 'Director':
          route.enterpriseId = this.enterprise.id;
        break;
        case 'Call_Center':
        break;
        case 'Manager':
        break;
        case 'Seller':
        break;
        case 'Client':
        break;
        default:
        break;
      }
      this.authenticationService.localStorage_setRoute(route);
      this.router.navigate(["/route-do", routeId])
      .then(() => {
        window.location.reload();
      });
    } else {
      var angularThis = this;
      this.routeService.action_getRoutes({ id: routeId })
      .subscribe(
        (data) => {
          this.authenticationService.localStorage_setRoute(data);
          Promise.all([
            angularThis.method_routePlaces(routeId)
          ])
          .then(results => {
            angularThis.router.navigate(["/route-do", routeId])
            .then(() => {
              window.location.reload();
            });
          },
          function(reason){
            Swal.fire("Ruta no se puede modificar","Reporta a un superior",'error');
            console.log("Falla method_routePlaces: ",reason);
          });
        },
        (error) => {
          console.log("Error action_getRoute: ", error);
        }
      );
    }
  }
  method_routePlaces(routeId: number) {
    var angularThis = this;
    return new Promise(function(resolve, reject){
      angularThis.routePlaceService
        .action_getRoutePlaces({
          route_id: routeId
        })
        .subscribe(
          (data) => {
            angularThis.authenticationService.localStorage_setRoutePlaces(data);
            resolve(data);
          },
          (error) => {
            console.log("Error action_getRoutePlaces: ", error);
            reject(error);
          }
        );
    });
  }
  method_exportRoutes() {
    this.routeService.action_exportRoutes({})
    .subscribe(
      (data) => { 
        var url = (window.URL || window.webkitURL).createObjectURL(data);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = "EMURCIA_rutas.xlsx";
        a.click();
        window.URL.revokeObjectURL(url);          
      },
      (error) => {
        Swal.fire("Excel de las rutas no descargado","Reporta a un superior",'error');
        console.log("Error action_exportRoutes: ",error);
      }
    );
  }
  method_searchRoutes() {
    if (!this.route.search) {
      this.mdbTable.setDataSource(this.previous);
      this.routes = this.mdbTable.getDataSource();
    }
    if (this.route.search) {
        this.routes = this.mdbTable.searchLocalDataBy(this.route.search);
        this.mdbTable.setDataSource(this.mdbTable.getDataSource());
    }
  }
  method_searchAdvancedRoutes() {
    this.method_getRoutes(this.route);
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
    this.businessService.action_getBusinesses({enterprise_id: this.route.enterprise_id})
    .subscribe(
      (data) => { this.businesses = data;},
      (error) => {console.log("Error action_getBusinesses: ",error);}
    );
  }  
  method_getSubsidiaries(): void {
    this.subsidiaryService.action_getSubsidiaries({business_id: this.route.business_id})
    .subscribe(
      (data) => { this.subsidiaries = data;},
      (error) => {console.log("Error action_getSubsidiaries: ",error);}
    );
  }  
  method_getSessions(): void {
    this.sessionService.action_getSessions({subsidiary_id: this.route.subsidiary_id, sellers: true})
    .subscribe(
      (data) => { this.sessions = data;},
      (error) => {console.log("Error action_getSessions: ",error);}
    );
  }
  method_getRoutes(request: any){
    this.isLoading = true;
    this.routeService.action_getRoutes(request)
    .subscribe(
      (data) => { 
        this.isLoading = false;
        this.routes = data;
        this.mdbTable.setDataSource(this.routes);
        this.routes = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      },
      (error) => {
        this.isLoading = false;
        console.log("Error action_getRoutes: ",error);
      }
    );
  }
  method_showRouteConsult(routeId:number) {
    this.routeId = routeId;
    this.showedRouteInConsult = true;    
  }
  method_gotRouteInConsult(event:boolean) {    
    if(event){
      this.showedRouteInConsult = false;
    }
  } 
  method_showRouteUpdate(routeId:number) {
    this.routeId = routeId;
    this.showedRouteInUpdate = true;
  }
  method_gotRouteInUpdate(event:boolean) {
    if(event){
      this.showedRouteInUpdate = false;
    }
  }
  method_updatedRoute(event:boolean) {    
    if(event){
      this.method_getRoutes(this.route);
      this.gotRoutesInUpdate = true;
    } else {
      this.gotRoutesInUpdate = false;
    }
  }
}

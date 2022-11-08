import { Component, OnInit, Input } from "@angular/core";
import { AuthenticationService } from "../../../services/authentication.service";
import { Rol } from "../../../interfaces/rol";
import { BusinessService } from '../../../services/business.service';

@Component({
  selector: "app-subsidiary-form",
  templateUrl: "./subsidiary-form.component.html",
  styleUrls: ["./subsidiary-form.component.scss"],
})
export class SubsidiaryFormComponent implements OnInit {
  @Input() subsidiary: any;
  @Input() enterprises: any;
  @Input() businesses: any;
  @Input() subsidiaryId: number;
  rol: Rol = {id: 0, key: "", name: ""};
  postalCodes: any = [];
  neighborhoods: any = [];
  municipalities: any = [];
  states: any = [];
  cities: any = [];
  isLoading: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private businessService: BusinessService
  ) {
  }
  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_apiGetPostalCodes();//municipality
    this.method_apiGetNeighborhoods();//municipality
    this.method_apiGetMunicipalities();//state
    this.method_apiGetStates();
  }
  method_apiGetPostalCodes() {
    this.authenticationService.api_getPostalCodes(this.subsidiary.municipality)    
    .subscribe(
      (data) => { 
        this.subsidiary.postal_code = "";
        this.postalCodes = data['response']['cp'];
      },
      (error) => {
        console.log("Error api_getPostalCodes: ",error);
      }
    );
  }
  method_apiGetNeighborhoods() {
    this.authenticationService.api_getNeighborhoods(this.subsidiary.municipality)    
    .subscribe(
      (data) => { 
        this.subsidiary.neighborhood = "";
        this.neighborhoods = data['response']['colonia'];
      },
      (error) => {
        console.log("Error api_getNeighborhoods: ",error);
      }
    );
  }
  method_apiGetMunicipalities() {
    this.authenticationService.api_getMunicipalities(this.subsidiary.state)    
    .subscribe(
      (data) => { 
        this.subsidiary.municipality = "";
        this.municipalities = data['response']['municipios'];
      },
      (error) => {
        console.log("Error api_getMunicipalities: ",error);
      }
    );
  }
  method_apiGetStates() {
    this.authenticationService.api_getStates()    
    .subscribe(
      (data) => { 
        this.subsidiary.state = "";
        this.states = data['response']['estado'];
      },
      (error) => {
        console.log("Error api_getStates: ",error);
      }
    );
  }  
  method_apiGetAddresses() {
    this.authenticationService.api_getAddresses(this.subsidiary.postal_code)    
    .subscribe(
      (data) => { 
        this.subsidiary.neighborhood = "";
        this.neighborhoods = data['response']['asentamiento'];
        this.subsidiary.city = data['response']['ciudad'];
        this.subsidiary.municipality = data['response']['municipio'];
        this.subsidiary.state = data['response']['estado'];
      },
      (error) => {
        console.log("Error api_getStates: ",error);
      }
    );
  }
  method_changeMunicipality() {
    this.method_apiGetPostalCodes(); 
    this.method_apiGetNeighborhoods();
  }
  methods_getSubsidiaryLogoFile(event: any) {
    this.subsidiary.logoFile = event.target.files[0];
  }
  methods_getOverlayFile(event) {
    this.subsidiary.overlayFile = event.target.files[0];
  }
  method_getBusinesses(): void {
    this.businessService.action_getBusinesses({enterprise_id: this.subsidiary.enterpriseId})
    .subscribe(
      (data) => { this.businesses = data;},
      (error) => {console.log("Error action_getBusinesses: ",error);}
    );
  }  
}

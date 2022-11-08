import { Component, OnInit, Input } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: 'app-route-place-form',
  templateUrl: './route-place-form.component.html',
  styleUrls: ['./route-place-form.component.scss'],
})

export class RoutePlaceFormComponent implements OnInit {
  @Input() routePlace: any;
  rol: Rol = {id: 0, key: "", name: ""};
  postalCodes: any = [];
  neighborhoods: any = [];
  municipalities: any = [];
  states: any = [];
  cities: any = [];

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_apiGetPostalCodes();//municipality
    this.method_apiGetNeighborhoods();//municipality
    this.method_apiGetMunicipalities();//state
    this.method_apiGetStates();
  }
  
  method_apiGetPostalCodes() {
    this.authenticationService.api_getPostalCodes(this.routePlace.municipality)    
    .subscribe(
      (data) => { 
        this.routePlace.postal_code = "";
        this.postalCodes = data['response']['cp'];
      },
      (error) => {
        console.log("Error api_getPostalCodes: ",error);
      }
    );
  }
  method_apiGetNeighborhoods() {
    this.authenticationService.api_getNeighborhoods(this.routePlace.municipality)    
    .subscribe(
      (data) => { 
        this.routePlace.neighborhood = "";
        this.neighborhoods = data['response']['colonia'];
      },
      (error) => {
        console.log("Error api_getNeighborhoods: ",error);
      }
    );
  }
  method_apiGetMunicipalities() {
    this.authenticationService.api_getMunicipalities(this.routePlace.state)    
    .subscribe(
      (data) => { 
        this.routePlace.municipality = "";
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
        this.routePlace.state = "";
        this.states = data['response']['estado'];
      },
      (error) => {
        console.log("Error api_getStates: ",error);
      }
    );
  }  
  method_apiGetAddresses() {
    this.authenticationService.api_getAddresses(this.routePlace.postal_code)    
    .subscribe(
      (data) => { 
        this.routePlace.neighborhood = "";
        this.neighborhoods = data['response']['asentamiento'];
        this.routePlace.city = data['response']['ciudad'];
        this.routePlace.municipality = data['response']['municipio'];
        this.routePlace.state = data['response']['estado'];
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
}

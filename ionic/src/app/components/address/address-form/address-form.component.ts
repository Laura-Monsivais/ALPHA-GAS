import { Component, OnInit, Input } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit {
  @Input() address: any;
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
    this.authenticationService.api_getPostalCodes(this.address.municipality)    
    .subscribe(
      (data) => { 
        this.address.postal_code = "";
        this.postalCodes = data['response']['cp'];
      },
      (error) => {
        console.log("Error api_getPostalCodes: ",error);
      }
    );
  }
  method_apiGetNeighborhoods() {
    this.authenticationService.api_getNeighborhoods(this.address.municipality)    
    .subscribe(
      (data) => { 
        this.address.neighborhood = "";
        this.neighborhoods = data['response']['colonia'];
      },
      (error) => {
        console.log("Error api_getNeighborhoods: ",error);
      }
    );
  }
  method_apiGetMunicipalities() {
    this.authenticationService.api_getMunicipalities(this.address.state)    
    .subscribe(
      (data) => { 
        this.address.municipality = "";
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
        this.address.state = "";
        this.states = data['response']['estado'];
      },
      (error) => {
        console.log("Error api_getStates: ",error);
      }
    );
  }  
  method_apiGetAddresses() {
    this.authenticationService.api_getAddresses(this.address.postal_code)    
    .subscribe(
      (data) => { 
        this.address.neighborhood = "";
        this.neighborhoods = data['response']['asentamiento'];
        this.address.city = data['response']['ciudad'];
        this.address.municipality = data['response']['municipio'];
        this.address.state = data['response']['estado'];
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

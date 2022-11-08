import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";
import { Rol } from "../../../interfaces/rol";
import Swal from "sweetalert2";
import { Subsidiary } from 'src/app/interfaces/subsidiary';

@Component({
  selector: 'app-route-place-do',
  templateUrl: './route-place-do.component.html',
  styleUrls: ['./route-place-do.component.scss'],
})
export class RoutePlaceDoComponent implements OnInit {
  @Input() routePlace: any;
  @Input() routePlaces: any;
  rol: Rol = {id: 0, key: "", name: ""};
  routePlaceForm: FormGroup;
  @Output() emitter_addedRoutePlace: EventEmitter<boolean> = new EventEmitter();
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
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
  ) { 
    this.routePlaceForm = this.formBuilder.group({
      postal_code: new FormControl("", [
        Validators.required
      ]),
      neighborhood: new FormControl("", [
        Validators.required
      ]),
      city: new FormControl("", [
        Validators.required
      ]),
      municipality: new FormControl("", [
        Validators.required
      ]),
      state: new FormControl("", [
        Validators.required
      ]),
      country: new FormControl("", [
        Validators.required
      ]),
    });
  }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }

  
  method_addRoutePlace() {
    this.routePlaceForm.get('postal_code').setValue(this.routePlace.postal_code);
    this.routePlaceForm.get('neighborhood').setValue(this.routePlace.neighborhood);
    this.routePlaceForm.get('city').setValue(this.routePlace.city);
    this.routePlaceForm.get('municipality').setValue(this.routePlace.municipality);
    this.routePlaceForm.get('state').setValue(this.routePlace.state);
    this.routePlaceForm.get('country').setValue(this.routePlace.country);
    if (this.routePlaceForm.valid) {
      this.routePlaces.push(this.routePlace);
      this.authenticationService.localStorage_setRoutePlaces(this.routePlaces);
      this.emitter_addedRoutePlace.emit(true);  
      this.subsidiary = this.authenticationService.localStorage_getSubsidiary();
      this.routePlace = {id: 0, postal_code: this.subsidiary.postal_code, neighborhood: this.subsidiary.neighborhood, city: this.subsidiary.city, municipality: this.subsidiary.municipality, state: this.subsidiary.state, country: this.subsidiary.country};
    } else {
      Swal.fire("Lugar no agregado","Completa la información",'info');
      console.log("Información formulario: ",this.routePlaceForm);
    }
  }
}

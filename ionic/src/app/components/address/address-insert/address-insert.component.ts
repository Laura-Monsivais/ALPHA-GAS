import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { Address } from "../../../interfaces/address";
import { Rol } from "../../../interfaces/rol";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";
import { AddressService } from '../../../services/address.service';
import Swal from "sweetalert2";
import { ModalDirective } from 'angular-bootstrap-md';
import { Subsidiary } from 'src/app/interfaces/subsidiary';

@Component({
  selector: 'app-address-insert',
  templateUrl: './address-insert.component.html',
  styleUrls: ['./address-insert.component.scss'],
})
export class AddressInsertComponent implements OnInit {
  @ViewChild('addressInsert') public addressInsert:ModalDirective;
  address: Address = {
    id: 0, 
    name: "", 
    street: "", 
    exterior: "", 
    interior: "", 
    postal_code: "", 
    neighborhood: "", 
    city: "", 
    municipality: "", 
    state: "", 
    country: "", 
    references: "",
    client_id: 0
  };
  rol: Rol = {id: 0, key: "", name: ""};
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
  addressForm: FormGroup;
  isLoading: boolean = false;
  @Output() isInsertedAddress: EventEmitter<boolean> = new EventEmitter();
  @Input() getEventIsGotAddresses:boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private addressService: AddressService,
    private formBuilder: FormBuilder
  ) {
    this.addressForm = this.formBuilder.group({
      name: new FormControl("", [
        Validators.required
      ]),
      street: new FormControl("", [
        Validators.required
      ]),
      exterior: new FormControl("", [
        Validators.required
      ]),
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
  ngOnChanges() {
    if(this.getEventIsGotAddresses){
      this.isInsertedAddress.emit(false);
    }
  }
  
  method_getAddress(){
    this.addressInsert.show();
    this.subsidiary = this.authenticationService.localStorage_getSubsidiary();
    this.address = {
      id: 0, 
      name: "", 
      street: "", 
      exterior: "", 
      interior: "", 
      postal_code: this.subsidiary.postal_code, 
      neighborhood: this.subsidiary.neighborhood, 
      city: this.subsidiary.city, 
      municipality: this.subsidiary.municipality, 
      state: this.subsidiary.state, 
      country: this.subsidiary.country, 
      references: "",
      client_id: 0
    };
  }
  method_insertAddress() {
    this.addressForm.get('name').setValue(this.address.name);
    this.addressForm.get('street').setValue(this.address.street);
    this.addressForm.get('exterior').setValue(this.address.exterior);
    this.addressForm.get('postal_code').setValue(this.address.postal_code);
    this.addressForm.get('neighborhood').setValue(this.address.neighborhood);
    this.addressForm.get('city').setValue(this.address.city);
    this.addressForm.get('municipality').setValue(this.address.municipality);
    this.addressForm.get('state').setValue(this.address.state);
    this.addressForm.get('country').setValue(this.address.country);
    if (this.addressForm.valid) {
      this.isLoading = true;
      this.addressService.action_insertAddress(this.address)
      .subscribe(
        (data) => { 
          if(data == 200){
            this.addressInsert.hide();
            this.isLoading = false;
            this.isInsertedAddress.emit(true);
            Swal.fire("Dirección creada","",'success');
          } else {
            this.isLoading = false;
            Swal.fire("Dirección no creada","Intentalo de nuevo",'warning');
            console.log("Response action_insertAddress: ",data);
          }
        },
        (error) => {
          this.isLoading = false;
          Swal.fire("Dirección no creada","Reporta a un superior",'error');
          console.log("Error action_insertAddress: ",error);
        }
      );
    } else {
      Swal.fire("Dirección no creada","Completa la información",'info');
      console.log("Información formulario: ",this.addressForm);
    }
  }
}

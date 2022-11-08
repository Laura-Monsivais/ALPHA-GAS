import { Component, OnInit, Input } from '@angular/core';
import { AddressService } from '../../../services/address.service';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() order: any = [];
  addresses: any = []; 
  detectIsGotAddresses:boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private addressService: AddressService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_getAddresses();
  }
  method_getAddresses(): void {
    this.addressService.action_getAddresses({ authenticate: true })
    .subscribe(
      (data) => {
        this.addresses = data;
        if(this.addresses.length == 1){
          this.order.address_id = this.addresses[0].id;
        }
      },
      (error) => {console.log("Error action_getAddresses: ",error);}
    );
  }
  method_detectIsInsertedAddress(event:boolean){
    this.method_getAddresses();
    this.detectIsGotAddresses = true;
  }

}

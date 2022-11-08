import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Transfer } from "../../../interfaces/transfer";
import { Enterprise } from "../../../interfaces/enterprise";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import { BusinessService } from '../../../services/business.service';
import { TransferService } from '../../../services/transfer.service';
import { ModalDirective } from 'angular-bootstrap-md';
import Swal from "sweetalert2";
import { Rol } from "../../../interfaces/rol";

@Component({
  selector: 'app-transfer-insert',
  templateUrl: './transfer-insert.component.html',
  styleUrls: ['./transfer-insert.component.scss'],
})

export class TransferInsertComponent implements OnInit {
  @ViewChild('transferInsert') public transferInsert:ModalDirective;
  transfer: Transfer = {
    id: 0, 
    key: "",
    name: "",
    enterpriseId: 0,
    businessId: 0,
    originId: 0,
    categoryId: 0, 
    productId: 0, 
    productUnit: null,
    inventory_id: 0,
    inventoryTheoretical: null,
    quantity: 0,
    destination_id: 0
  };
  enterprise: Enterprise = {id: 0, name: ""};
  enterprises: any = [];
  businesses: any = [];
  origins: any = [];
  categories: any = [];
  products: any = [];
  destinations: any = [];
  transferForm: FormGroup;
  isLoading: boolean = false;
  @Output() emitter_insertedTransfer: EventEmitter<boolean> = new EventEmitter();
  @Input() gotTransfersInInsert:boolean = false;
  rol: Rol = {id: 0, key: "", name: ""};

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private businessService: BusinessService,
    private transferService: TransferService,
    private formBuilder: FormBuilder
  ) {
    this.transferForm = this.formBuilder.group({
      name: new FormControl("", [
        Validators.required
      ]),
      inventory_id: new FormControl("", [
        Validators.required,
        Validators.min(1)
      ]),
      quantity: new FormControl("", [
        Validators.required
      ]),
      destination_id: new FormControl("", [
        Validators.required,
        Validators.min(1)
      ]),
    });
  }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ngOnChanges() {
    if(this.gotTransfersInInsert){
      this.emitter_insertedTransfer.emit(false);
    }
  }
  
  method_getTransfer(){
    this.transferInsert.show();
    this.method_getEnterprises();
    this.transfer = {
      id: 0, 
      key: "",
      name: "",
      enterpriseId: 0,
      businessId: 0,
      originId: 0,
      categoryId: 0, 
      productId: 0, 
      productUnit: null,
      inventory_id: 0,
      inventoryTheoretical: null,
      quantity: 0,
      destination_id: 0
    };
    switch(this.rol.key){
      case 'Super':
      break;
      case 'Director':
        this.enterprise = this.authenticationService.localStorage_getEnterprise();
        this.transfer.enterpriseId = this.enterprise.id;
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
  }
  method_getEnterprises(): void {
    this.enterpriseService.action_insideGetEnterprises({})
    .subscribe(
      (data) => { this.enterprises = data;},
      (error) => {console.log("Error action_getEnterprises: ",error);}
    );
  }
  method_getBusinesses(): void {
    this.businessService.action_getBusinesses({enterprise_id: this.transfer.enterpriseId})
    .subscribe(
      (data) => { this.businesses = data;},
      (error) => {console.log("Error action_getBusinesses: ",error);}
    );
  }
  method_insertTransfer() {
    this.transferForm.get('name').setValue(this.transfer.name);
    this.transferForm.get('inventory_id').setValue(this.transfer.inventory_id);
    this.transferForm.get('quantity').setValue(this.transfer.quantity);
    this.transferForm.get('destination_id').setValue(this.transfer.destination_id);
    if (this.transferForm.valid) {
      this.isLoading = true;
      this.transferService.action_insertTransfer(this.transfer)
      .subscribe(
        (data) => { 
          if(data == 200){
            this.transferInsert.hide();
            this.isLoading = false;
            this.emitter_insertedTransfer.emit(true);
            Swal.fire("Traspaso creado","",'success');
          } else {
            this.isLoading = false;
            Swal.fire("Traspaso no creado","Intentalo de nuevo",'warning');
            console.log("Response action_insertTransfer: ",data);
          }
        },
        (error) => {
          this.isLoading = false;
          Swal.fire("Traspaso no creado","Reporta a un superior",'error');
          console.log("Error action_insertTransfer: ",error);
        }
      );
    } else {
      Swal.fire("Traspaso no creado","Completa la información",'info');
      console.log("Información formulario: ",this.transferForm);
    }
  }
}

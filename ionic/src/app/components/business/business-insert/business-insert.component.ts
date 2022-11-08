import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Business } from "../../../interfaces/business";
import { Enterprise } from "../../../interfaces/enterprise";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import { BusinessService } from '../../../services/business.service';
import { AttentionService } from '../../../services/attention.service';
import { ModalDirective } from 'angular-bootstrap-md';
import Swal from "sweetalert2";
import { Rol } from "../../../interfaces/rol";

@Component({
  selector: 'app-business-insert',
  templateUrl: './business-insert.component.html',
  styleUrls: ['./business-insert.component.scss'],
})
export class BusinessInsertComponent implements OnInit {
  @ViewChild('businessInsert') public businessInsert:ModalDirective;
  business: Business = {id: 0, name: "", attention_id: 0, enterprise_id: 0};
  enterprise: Enterprise = {id: 0, name: ""};
  enterprises: any = [];
  attentions: any = [];
  businessForm: FormGroup;
  isLoading: boolean = false;
  @Output() emitter_insertedBusiness: EventEmitter<boolean> = new EventEmitter();
  @Input() gotBusinessesInInsert:boolean = false;
  rol: Rol = {id: 0, key: "", name: ""};

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private businessService: BusinessService,
    private attentionService: AttentionService,
    private formBuilder: FormBuilder
  ) {
    this.businessForm = this.formBuilder.group({
      name: new FormControl("", [
        Validators.required
      ]),
      enterprise_id: new FormControl("", [
        Validators.required,
        Validators.min(1)
      ]),
      attention_id: new FormControl("", [
        Validators.required,
        Validators.min(1)
      ]),
    });
  }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ngOnChanges() {
    if(this.gotBusinessesInInsert){
      this.emitter_insertedBusiness.emit(false);
    }
  }
  
  method_getBusiness(){
    this.businessInsert.show();
    this.method_getEnterprises();
    this.method_getAttentions();
    this.business = {id: 0, name: "", attention_id: 0, enterprise_id: 0};
    switch(this.rol.key){
      case 'Super':
      break;
      case 'Director':
        this.enterprise = this.authenticationService.localStorage_getEnterprise();
        this.business.enterprise_id = this.enterprise.id;
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
  method_getAttentions(): void {
    this.attentionService.action_getAttentions({})
    .subscribe(
      (data) => { this.attentions = data;},
      (error) => {console.log("Error action_getAttentions: ",error);}
    );
  }
  method_insertBusiness() {
    this.businessForm.get('name').setValue(this.business.name);
    this.businessForm.get('enterprise_id').setValue(this.business.enterprise_id);
    this.businessForm.get('attention_id').setValue(this.business.attention_id);
    if (this.businessForm.valid) {
      this.isLoading = true;
      this.businessService.action_insertBusiness(this.business)
      .subscribe(
        (data) => { 
          if(data == 200){
            this.businessInsert.hide();
            this.isLoading = false;
            this.emitter_insertedBusiness.emit(true);
            Swal.fire("Negocio creado","",'success');
          } else {
            this.isLoading = false;
            Swal.fire("Negocio no creado","Intentalo de nuevo",'warning');
            console.log("Response action_insertBusiness: ",data);
          }
        },
        (error) => {
          this.isLoading = false;
          Swal.fire("Negocio no creado","Reporta a un superior",'error');
          console.log("Error action_insertBusiness: ",error);
        }
      );
    } else {
      Swal.fire("Negocio no creado","Completa la información",'info');
      console.log("Información formulario: ",this.businessForm);
    }
  }

}

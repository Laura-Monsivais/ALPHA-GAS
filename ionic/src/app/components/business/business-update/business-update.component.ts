import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { ModalDirective } from 'angular-bootstrap-md';
import { Business } from "../../../interfaces/business";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import { BusinessService } from '../../../services/business.service';
import { AttentionService } from '../../../services/attention.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-business-update',
  templateUrl: './business-update.component.html',
  styleUrls: ['./business-update.component.scss'],
})

export class BusinessUpdateComponent implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() businessId: number;
  @Input() showedBusinessInUpdate: boolean = false;
  @ViewChild('businessUpdate') public businessUpdate:ModalDirective;
  business: Business = {id: 0, name: "", attention_id: 0, enterprise_id: 0};
  enterprises: any = [];
  attentions: any = [];
  businessForm: FormGroup;
  isLoading: boolean = false;
  @Output() emitter_updatedBusiness: EventEmitter<boolean> = new EventEmitter();
  @Input() gotBusinessesInUpdate: boolean = false;
  @Output() emitter_gotBusinessInUpdate: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private businessService: BusinessService,
    private attentionService: AttentionService,
    private formBuilder: FormBuilder
  ) {
    this.businessForm = this.formBuilder.group({
      id: new FormControl("", [Validators.required,
        Validators.min(1)]),
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
    this.business.id = this.businessId;
  }
  ngOnChanges() {
    if(this.showedBusinessInUpdate){
      this.method_getBusiness();
      this.emitter_gotBusinessInUpdate.emit(true);
    } else {
      this.emitter_gotBusinessInUpdate.emit(false);
    }
    if (this.gotBusinessesInUpdate) {
      this.emitter_updatedBusiness.emit(false);
    }
  }

  method_getBusiness() {    
    this.businessUpdate.show();
    this.method_getEnterprises();
    this.method_getAttentions();
    this.businessService.action_getBusinesses({id: this.businessId})
    .subscribe(
      (data) => { this.business = data;},
      (error) => {console.log("Error action_getBusiness: ",error);}
    );
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
  method_updateBusiness() {
    this.businessForm.get('id').setValue(this.business.id);
    this.businessForm.get('name').setValue(this.business.name);
    this.businessForm.get('enterprise_id').setValue(this.business.enterprise_id);
    this.businessForm.get('attention_id').setValue(this.business.attention_id);
    if (this.businessForm.valid) {
      this.isLoading = true;
      this.businessService.action_updateBusiness(this.business)
      .subscribe(
        (data) => { 
          if(data == 200){
            this.businessUpdate.hide();
            this.isLoading = false;
            this.emitter_updatedBusiness.emit(true);
            Swal.fire("Negocio modificado","",'success');
          } else {
            this.isLoading = false;
            Swal.fire("Negocio no modificado","Intentalo de nuevo",'warning');
            console.log("Response action_insertBusiness: ",data);
          }
        },
        (error) => {
          this.isLoading = false;
          Swal.fire("Negocio no modificado","Reporta a un superior",'error');
          console.log("Error action_updateBusiness: ",error);
        }
      );
    } else {
      Swal.fire("Negocio no modificado","Completa la información",'info');
      console.log("Información formulario: ",this.businessForm);
    }
  }

}

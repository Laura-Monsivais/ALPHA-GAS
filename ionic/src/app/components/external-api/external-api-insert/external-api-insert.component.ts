import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ExternalApi } from "../../../interfaces/external-api";
import { Enterprise } from "../../../interfaces/enterprise";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import { ExternalApiService } from '../../../services/external-api.service';
import { ModalDirective } from 'angular-bootstrap-md';
import Swal from "sweetalert2";
import { Rol } from "../../../interfaces/rol";

@Component({
  selector: 'app-external-api-insert',
  templateUrl: './external-api-insert.component.html',
  styleUrls: ['./external-api-insert.component.scss'],
})

export class ExternalApiInsertComponent implements OnInit {
  @ViewChild('externalApiInsert') public externalApiInsert:ModalDirective;
  externalApi: ExternalApi = {id: 0, function: "rechargeCellphone", url: "", method: "GET", token: "", enterprise_id: 0};
  enterprise: Enterprise = {id: 0, name: ""};
  enterprises: any = [];
  externalApiForm: FormGroup;
  isLoading: boolean = false;
  @Output() emitter_insertedExternalApi: EventEmitter<boolean> = new EventEmitter();
  @Input() gotExternalApisInInsert:boolean = false;
  rol: Rol = {id: 0, key: "", name: ""};

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private externalApiService: ExternalApiService,
    private formBuilder: FormBuilder
  ) {
    this.externalApiForm = this.formBuilder.group({
      url: new FormControl("", [
        Validators.required
      ]),
      function: new FormControl("", [
        Validators.required
      ]),
      method: new FormControl("", [
        Validators.required
      ]),
      token: new FormControl("", [
        Validators.required
      ]),
      enterprise_id: new FormControl("", [
        Validators.required,
        Validators.min(1)
      ]),
    });
  }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ngOnChanges() {
    if(this.gotExternalApisInInsert){
      this.emitter_insertedExternalApi.emit(false);
    }
  }
  
  method_getExternalApi(){
    this.externalApiInsert.show();
    this.method_getEnterprises();
    this.externalApi = {id: 0, function: "rechargeCellphone", url: "", method: "GET", token: "", enterprise_id: 0};
    switch(this.rol.key){
      case 'Super':
      break;
      case 'Director':
        this.enterprise = this.authenticationService.localStorage_getEnterprise();
        this.externalApi.enterprise_id = this.enterprise.id;
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
  method_insertExternalApi() {
    this.externalApiForm.get('url').setValue(this.externalApi.url);
    this.externalApiForm.get('function').setValue(this.externalApi.function);
    this.externalApiForm.get('method').setValue(this.externalApi.method);
    this.externalApiForm.get('token').setValue(this.externalApi.token);
    this.externalApiForm.get('enterprise_id').setValue(this.externalApi.enterprise_id);
    if (this.externalApiForm.valid) {
      this.isLoading = true;
      this.externalApiService.action_insertExternalApi(this.externalApi)
      .subscribe(
        (data) => { 
          if(data == 200){
            this.externalApiInsert.hide();
            this.isLoading = false;
            this.emitter_insertedExternalApi.emit(true);
            Swal.fire("API creada","",'success');
          } else {
            this.isLoading = false;
            Swal.fire("API no creada","Intentalo de nuevo",'warning');
            console.log("Response action_insertExternalApi: ",data);
          }
        },
        (error) => {
          this.isLoading = false;
          Swal.fire("API no creada","Reporta a un superior",'error');
          console.log("Error action_insertExternalApi: ",error);
        }
      );
    } else {
      Swal.fire("API no creada","Completa la información",'info');
      console.log("Información formulario: ",this.externalApiForm);
    }
  }
}

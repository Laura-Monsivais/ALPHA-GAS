import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { ModalDirective } from 'angular-bootstrap-md';
import { ExternalApi } from "../../../interfaces/external-api";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import { ExternalApiService } from '../../../services/external-api.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-external-api-update',
  templateUrl: './external-api-update.component.html',
  styleUrls: ['./external-api-update.component.scss'],
})

export class ExternalApiUpdateComponent implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() externalApiId: number;
  @Input() showedExternalApiInUpdate: boolean = false;
  @ViewChild('externalApiUpdate') public externalApiUpdate:ModalDirective;
  externalApi: ExternalApi = {id: 0, function: "", url: "", method: "GET", token: "", enterprise_id: 0};
  enterprises: any = [];
  externalApiForm: FormGroup;
  isLoading: boolean = false;
  @Output() emitter_updatedExternalApi: EventEmitter<boolean> = new EventEmitter();
  @Input() gotExternalApisInUpdate: boolean = false;
  @Output() emitter_gotExternalApiInUpdate: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private externalApiService: ExternalApiService,
    private formBuilder: FormBuilder
  ) {
    this.externalApiForm = this.formBuilder.group({
      id: new FormControl("", [
        Validators.required,
        Validators.min(1)
      ]),
      function: new FormControl("", [
        Validators.required
      ]),
      url: new FormControl("", [
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
    this.externalApi.id = this.externalApiId;
  }
  ngOnChanges() {
    if(this.showedExternalApiInUpdate){
      this.method_getExternalApi();
      this.emitter_gotExternalApiInUpdate.emit(true);
    } else {
      this.emitter_gotExternalApiInUpdate.emit(false);
    }
    if (this.gotExternalApisInUpdate) {
      this.emitter_updatedExternalApi.emit(false);
    }
  }

  method_getExternalApi() {    
    this.externalApiUpdate.show();
    this.method_getEnterprises();
    this.externalApiService.action_getExternalApis({id: this.externalApiId})
    .subscribe(
      (data) => { this.externalApi = data;},
      (error) => {console.log("Error action_getExternalApi: ",error);}
    );
  }
  method_getEnterprises(): void {
    this.enterpriseService.action_insideGetEnterprises({})
    .subscribe(
      (data) => { this.enterprises = data;},
      (error) => {console.log("Error action_getEnterprises: ",error);}
    );
  }
  method_updateExternalApi() {
    this.externalApiForm.get('id').setValue(this.externalApi.id);
    this.externalApiForm.get('function').setValue(this.externalApi.function);
    this.externalApiForm.get('url').setValue(this.externalApi.url);
    this.externalApiForm.get('method').setValue(this.externalApi.method);
    this.externalApiForm.get('token').setValue(this.externalApi.token);
    this.externalApiForm.get('enterprise_id').setValue(this.externalApi.enterprise_id);
    if (this.externalApiForm.valid) {
      this.isLoading = true;
      this.externalApiService.action_updateExternalApi(this.externalApi)
      .subscribe(
        (data) => { 
          if(data == 200){
            this.externalApiUpdate.hide();
            this.isLoading = false;
            this.emitter_updatedExternalApi.emit(true);
            Swal.fire("API modificada","",'success');
          } else {
            this.isLoading = false;
            Swal.fire("API no modificada","Intentalo de nuevo",'warning');
            console.log("Response action_insertExternalApi: ",data);
          }
        },
        (error) => {
          this.isLoading = false;
          Swal.fire("API no modificada","Reporta a un superior",'error');
          console.log("Error action_updateExternalApi: ",error);
        }
      );
    } else {
      Swal.fire("API no modificada","Completa la información",'info');
      console.log("Información formulario: ",this.externalApiForm);
    }
  }
}

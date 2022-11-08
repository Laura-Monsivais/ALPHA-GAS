import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { ModalDirective } from 'angular-bootstrap-md';
import { Enterprise } from "../../../interfaces/enterprise";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from "../../../services/enterprise.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-enterprise-update',
  templateUrl: './enterprise-update.component.html',
  styleUrls: ['./enterprise-update.component.scss'],
})

export class EnterpriseUpdateComponent implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() enterpriseId: number;
  @Input() showedEnterpriseInUpdate: boolean = false;
  @ViewChild('enterpriseUpdate') public enterpriseUpdate:ModalDirective;
  enterprise: Enterprise = {id: 0, name: "", logo: "", logoFile: null, overlay: "", overlayFile: null};
  getEnterpriseLogoUrl: string;
  getEnterpriseOverlayUrl: string;
  enterpriseForm: FormGroup;
  isLoading: boolean = false;
  @Output() emitter_updatedEnterprise: EventEmitter<boolean> = new EventEmitter();
  @Input() gotEnterprisesInUpdate: boolean = false;
  @Output() emitter_gotEnterpriseInUpdate: EventEmitter<boolean> = new EventEmitter();
  
  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private formBuilder: FormBuilder
  ) {
    this.enterpriseForm = this.formBuilder.group({
      id: new FormControl("", [Validators.required,
        Validators.min(1)]),
      name: new FormControl("", [Validators.required])
    });
  }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.enterprise.id = this.enterpriseId;
  }
  ngOnChanges() {
    if(this.showedEnterpriseInUpdate){
      this.method_getEnterprise();
      this.emitter_gotEnterpriseInUpdate.emit(true);
    } else {
      this.emitter_gotEnterpriseInUpdate.emit(false);
    }
    if (this.gotEnterprisesInUpdate) {
      this.emitter_updatedEnterprise.emit(false);
    }
  }
  
  method_getEnterprise(): void {  
    this.enterpriseUpdate.show();
    this.enterpriseService.action_insideGetEnterprises({id: this.enterpriseId})
    .subscribe(
      (data) => { this.enterprise = data;},
      (error) => {console.log("Error action_getEnterprise: ",error);}
    );
  }
  method_updateEnterprise() {
    this.enterpriseForm.get('id').setValue(this.enterprise.id);
    this.enterpriseForm.get('name').setValue(this.enterprise.name);
    if (this.enterpriseForm.valid) {
      this.isLoading = true;
      this.enterpriseService.action_updateEnterprise(this.enterprise)
      .subscribe(
        (data) => { 
          if(data.status == 200){
            this.enterpriseUpdate.hide();
            this.isLoading = false;
            this.emitter_updatedEnterprise.emit(true);
            Swal.fire("Empresa modificada","",'success');
          } else {
            this.isLoading = false;
            Swal.fire("Empresa no modificada","Intentalo de nuevo",'warning');
            console.log("Response action_updateEnterprise: ",data.message);
          }
        },
        (error) => {
          this.isLoading = false;
          Swal.fire("Empresa no modificada","Reporta a sistemas",'error');
          console.log("Error action_updateEnterprise: ",error);
        }
      );
    } else {
      Swal.fire("Empresa no modificada","Completa la información",'info');
      console.log("Información formulario: ",this.enterpriseForm);
    }
  }
}

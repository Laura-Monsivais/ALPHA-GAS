import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Enterprise } from "../../../interfaces/enterprise";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import { ModalDirective } from 'angular-bootstrap-md';
import Swal from "sweetalert2";
import { Rol } from "../../../interfaces/rol";

@Component({
  selector: 'app-enterprise-insert',
  templateUrl: './enterprise-insert.component.html',
  styleUrls: ['./enterprise-insert.component.scss'],
})

export class EnterpriseInsertComponent implements OnInit {
  @ViewChild('enterpriseInsert') public enterpriseInsert:ModalDirective;
  enterprise: Enterprise = {id: 0, name: "", logo: "", logoFile: null, overlay: "", overlayFile: null};
  enterpriseForm: FormGroup;
  isLoading: boolean = false;
  @Output() emitter_insertedEnterprise: EventEmitter<boolean> = new EventEmitter();
  @Input() gotEnterprisesInInsert:boolean = false;
  rol: Rol = {id: 0, key: "", name: ""};

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private formBuilder: FormBuilder) {
    this.enterpriseForm = this.formBuilder.group({
      name: new FormControl("", [
        Validators.required
      ])
    });
  }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ngOnChanges() {
    if(this.gotEnterprisesInInsert){
      this.emitter_insertedEnterprise.emit(false);
    }
  }
  
  method_getEnterprise(){
    this.enterpriseInsert.show();
    this.enterprise = {id: 0, name: "", logo: "", logoFile: null, overlay: "", overlayFile: null};
  }
  method_insertEnterprise() {
    this.enterpriseForm.get('name').setValue(this.enterprise.name);
    if (this.enterpriseForm.valid) {
      this.isLoading = true;
      this.enterpriseService.action_insertEnterprise(this.enterprise)
      .subscribe(
        (data) => { 
          if(data.status == 200){
            this.enterpriseInsert.hide();
            this.isLoading = false;
            this.emitter_insertedEnterprise.emit(true);
            Swal.fire("Empresa creada","",'success');
          } else {
            this.isLoading = false;
            Swal.fire("Empresa no creada","Intentalo de nuevo",'warning');
            console.log("Response action_insertEnterprise: ",data);
          }
        },
        (error) => {
          this.isLoading = false;
          Swal.fire("Empresa no creada","Reporta a un superior",'error');
          console.log("Error action_insertEnterprise: ",error);
        }
      );
    } else {
      Swal.fire("Empresa no creada","Completa la información",'info');
      console.log("Información formulario: ",this.enterpriseForm);
    }
  }
}

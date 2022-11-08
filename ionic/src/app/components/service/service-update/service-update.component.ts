import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Service } from "../../../interfaces/service";
import { Rol } from "../../../interfaces/rol";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import { ServiceService } from '../../../services/service.service';
import { ModalDirective } from 'angular-bootstrap-md';
import Swal from "sweetalert2";

@Component({
  selector: 'app-service-update',
  templateUrl: './service-update.component.html',
  styleUrls: ['./service-update.component.scss'],
})
export class ServiceUpdateComponent implements OnInit {
  @ViewChild('serviceUpdate') public serviceUpdate:ModalDirective;
  @Input() serviceId: number;
  @Input() showedServiceInUpdate: boolean = false;
  service: Service = {id: 0, name: "",  description: null, cost: 0, price: 0, enterprise_id: 0};
  enterprises: any = [];
  rol: Rol = {id: 0, key: "", name: ""};
  serviceForm: FormGroup;
  isLoading: boolean = false;
  @Output() emitter_updatedService: EventEmitter<boolean> = new EventEmitter();
  @Input() gotServicesInUpdate: boolean = false;
  @Output() emitter_gotServiceInUpdate: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private serviceService: ServiceService,
    private formBuilder: FormBuilder
  ) { 
    this.serviceForm = this.formBuilder.group({
      id: new FormControl("", [Validators.required,
        Validators.min(1)]),
      name: new FormControl("", [Validators.required]),
      cost: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required]),
      enterprise_id: new FormControl("", [Validators.required,
        Validators.min(1)]),
    });
  }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.service.id = this.serviceId;
  }
  ngOnChanges() {
    if(this.showedServiceInUpdate){
      this.method_getService();
      this.emitter_gotServiceInUpdate.emit(true);
    } else {
      this.emitter_gotServiceInUpdate.emit(false);
    }
    if (this.gotServicesInUpdate) {
      this.emitter_updatedService.emit(false);
    }
  }
  method_getService(): void {    
    this.serviceUpdate.show();
    this.method_getEnterprises();
    this.serviceService.action_getServices({id: this.serviceId})
    .subscribe(
      (data) => { this.service = data;},
      (error) => {console.log("Error action_getService: ",error);}
    );
  }
  method_getEnterprises(): void {
    this.enterpriseService.action_insideGetEnterprises({})
    .subscribe(
      (data) => { this.enterprises = data;},
      (error) => {console.log("Error action_getEnterprises: ",error);}
    );
  }
  method_updateService() {
    this.serviceForm.get('id').setValue(this.service.id);
    this.serviceForm.get('name').setValue(this.service.name);
    this.serviceForm.get('cost').setValue(this.service.cost);
    this.serviceForm.get('price').setValue(this.service.price);
    this.serviceForm.get('enterprise_id').setValue(this.service.enterprise_id);
    if (this.serviceForm.valid) {
      this.isLoading = true;
      this.serviceService.action_updateService(this.service)
      .subscribe(
        (data) => { 
          if(data == 200){
            this.serviceUpdate.hide();
            this.isLoading = false;
            this.emitter_updatedService.emit(true);
            Swal.fire("Servicio modificado","",'success');
          } else {
            this.isLoading = false;
            Swal.fire("Servicio no modificado","Intentalo de nuevo",'warning');
            console.log("Response method_updateService: ",data);
          }
        },
        (error) => {
          this.isLoading = false;
          Swal.fire("Servicio no modificado","Reporta a sistemas",'error');
          console.log("Error action_updateService: ",error);
        }
      );
    } else {
      Swal.fire("Servicio no modificado","Completa la información",'info');
      console.log("Información formulario: ",this.serviceForm);
    }
  }
}

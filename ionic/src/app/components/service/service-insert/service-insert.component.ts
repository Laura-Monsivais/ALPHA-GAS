import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { Service } from "../../../interfaces/service";
import { Enterprise } from "../../../interfaces/enterprise";
import { Rol } from "../../../interfaces/rol";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import { ServiceService} from '../../../services/service.service';
import { ModalDirective } from 'angular-bootstrap-md';
import Swal from "sweetalert2";

@Component({
  selector: "app-service-insert",
  templateUrl: "./service-insert.component.html",
  styleUrls: ["./service-insert.component.scss"],
})
export class ServiceInsertComponent implements OnInit {
  @ViewChild("serviceInsert") public serviceInsert: ModalDirective;
  @Output() emitter_insertedService: EventEmitter<boolean> = new EventEmitter();
  @Input() gotServicesInInsert: boolean = false;
  service: Service = {
    id: 0,
    name: "",
    description: null,
    cost: 0,
    price: 0,
    enterprise_id: 0,
  };
  serviceForm: FormGroup;
  enterprise: Enterprise = { id: 0, name: "" };
  enterprises: any = [];
  rol: Rol = {id: 0, key: "", name: ""};
  isLoading: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private serviceService: ServiceService,
    private formBuilder: FormBuilder
  ) {
    this.serviceForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required]),
      cost: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required]),
      enterprise_id: new FormControl("", [Validators.required,
        Validators.min(1)]),
    });
  }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ngOnChanges() {
    if (this.gotServicesInInsert) {
      this.emitter_insertedService.emit(false);
    }
  }

  method_getService() {
    this.serviceInsert.show();
    this.method_getEnterprises();
    this.service = {
      id: 0,
      name: "",
      description: null,
      cost: 0,
      price: 0,
      enterprise_id: 0,
    };
    switch (this.rol.key) {
      case "Super":
      break;
      case "Director":
        this.enterprise = this.authenticationService.localStorage_getEnterprise();
        this.service.enterprise_id = this.enterprise.id;
      break;
      case "Manager":
      break;
      case "Call_Center":
      break;
      case "Seller":
      break;
      case "Client":
      break;
      default:
        break;
    }
  }
  method_getEnterprises(): void {
    this.enterpriseService.action_insideGetEnterprises({})
    .subscribe(
      (data) => {
        this.enterprises = data;
      },
      (error) => {
        console.log("Error action_getEnterprises: ", error);
      }
    );
  }
  method_insertService() {
    this.serviceForm.get('name').setValue(this.service.name);
    this.serviceForm.get('cost').setValue(this.service.cost);
    this.serviceForm.get('price').setValue(this.service.price);
    this.serviceForm.get('enterprise_id').setValue(this.service.enterprise_id);
    if (this.serviceForm.valid) {
      this.isLoading = true;
      this.serviceService.action_insertService(this.service)
      .subscribe(
        (data) => {
          if (data == 200) {
            this.serviceInsert.hide();
            this.isLoading = false;
            this.emitter_insertedService.emit(true);
            Swal.fire("Servicio creado", "", "success");
          } else {
            this.isLoading = false;
            Swal.fire("Servicio no creado", "Intentalo de nuevo", "warning");
            console.log("Response action_insertService: ", data);
          }
        },
        (error) => {
          this.isLoading = false;
          Swal.fire("Servicio no creado", "Reporta a sistemas", "error");
          console.log("Error action_insertService: ", error);
        }
      );
    } else {
      Swal.fire("Servicio no creado", "Completa la información", "info");
      console.log("Información formulario: ",this.serviceForm);
    }
  }
}

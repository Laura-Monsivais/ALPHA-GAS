import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { User } from "../../../interfaces/user";
import { Enterprise } from "../../../interfaces/enterprise";
import { Business } from "../../../interfaces/business";
import { Session } from "../../../interfaces/session";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";
import { UserService } from '../../../services/user.service';
import { EnterpriseService } from '../../../services/enterprise.service';
import { BusinessService } from '../../../services/business.service';
import { SubsidiaryService } from "../../../services/subsidiary.service";
import { RolService } from "../../../services/rol.service";
import { ModalDirective } from 'angular-bootstrap-md';
import Swal from "sweetalert2";
import { Rol } from "../../../interfaces/rol";
import { Subsidiary } from 'src/app/interfaces/subsidiary';

@Component({
  selector: "app-user-insert",
  templateUrl: "./user-insert.component.html",
  styleUrls: ["./user-insert.component.scss"],
})

export class UserInsertComponent implements OnInit {
  @ViewChild("userInsert") public userInsert: ModalDirective;
  user: User = {id: 0, name: "", avatar: "", avatarFile: null, cover: "", coverFile: null, lastname1: "", lastname2: "", cellphone: null, password: "", session_id: 0};
  enterprises: any = [];
  enterprise: Enterprise = {id: 0, name: "", logo: "", logoFile: null, overlay: "", overlayFile: null};
  businesses: any = [];
  business: Business = {id: 0, name: "", enterprise_id: 0, attention_id: 0};
  subsidiaries: any = [];
  subsidiary: Subsidiary = {
    id: 0, 
    name: "", 
    is_central: false,
    logo: null,
    logoFile: null,
    overlay: null,
    overlayFile: null,
    street: "",
    exterior: "",
    interior: null,
    postal_code: "",
    neighborhood: "",
    city: "",
    municipality: "",
    state: "",
    country: "",
    references: null,
    enterpriseId: 0, 
    business_id: 0
  };
  roles: any = [];
  session: Session = {
    id: 0, 
    user_id: 0, 
    userCellphone: 0,
    enterpriseId: 0, 
    businessId: 0, 
    subsidiary_id: 0, 
    rol_id: 0
  };
  userForm: FormGroup;
  sessionForm: FormGroup;
  isLoading: boolean = false;
  @Output() emitter_insertedUser: EventEmitter<boolean> = new EventEmitter();
  @Input() gotUsersInInsert: boolean = false;
  rol: Rol = {id: 0, key: "", name: ""};

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private businessService: BusinessService,
    private subsidiaryService: SubsidiaryService,
    private userService: UserService,
    private rolService: RolService,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required]),
      lastname1: new FormControl("", [Validators.required]),
      cellphone: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
    this.sessionForm = this.formBuilder.group({
      subsidiary_id: new FormControl("", [Validators.required,
        Validators.min(1)]),
      rol_id: new FormControl("", [Validators.required,
        Validators.min(1)])
    });
  }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ngOnChanges() {
    if (this.gotUsersInInsert) {
      this.emitter_insertedUser.emit(false);
    }
  }

  method_getUser() {
    this.userInsert.show();
    this.user = {id: 0, name: "", avatar: "", avatarFile: null, cover: "", coverFile: null, lastname1: "", lastname2: "", cellphone: null, password: "", session_id: 0};
    this.session = {
      id: 0, 
      user_id: 0, 
      userCellphone: 0,
      enterpriseId: 0, 
      businessId: 0, 
      subsidiary_id: 0, 
      rol_id: 0
    };
    this.method_getEnterprises();
    switch (this.rol.key) {
      case "Super":
      break;
      case "Director":
        this.enterprise = this.authenticationService.localStorage_getEnterprise();
        this.session.enterpriseId = this.enterprise.id;
        this.method_getBusinesses();
      break;
      case "Manager":
        this.enterprise = this.authenticationService.localStorage_getEnterprise();
        this.session.enterpriseId = this.enterprise.id;
        this.business = this.authenticationService.localStorage_getBusiness();
        this.session.businessId = this.business.id;
        this.subsidiary = this.authenticationService.localStorage_getSubsidiary();
        this.session.subsidiary_id = this.subsidiary.id;
        this.method_getBusinesses();
        this.method_getSubsidiaries();
      break;
      case "Call_Center":
        this.enterprise = this.authenticationService.localStorage_getEnterprise();
        this.session.enterpriseId = this.enterprise.id;
        this.business = this.authenticationService.localStorage_getBusiness();
        this.session.businessId = this.business.id;
        this.subsidiary = this.authenticationService.localStorage_getSubsidiary();
        this.session.subsidiary_id = this.subsidiary.id;
        this.method_getBusinesses();
        this.method_getSubsidiaries();
      break;
      case "Seller":
        this.enterprise = this.authenticationService.localStorage_getEnterprise();
        this.session.enterpriseId = this.enterprise.id;
        this.business = this.authenticationService.localStorage_getBusiness();
        this.session.businessId = this.business.id;
        this.subsidiary = this.authenticationService.localStorage_getSubsidiary();
        this.session.subsidiary_id = this.subsidiary.id;
        this.method_getBusinesses();
        this.method_getSubsidiaries();
      break;
      case "Client":
      break;
      default:
      break;
    }
    this.method_getRoles();
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
  method_getBusinesses(): void {
    this.businessService.action_getBusinesses({enterprise_id: this.session.enterpriseId})
    .subscribe(
      (data) => {
        this.businesses = data;
      },
      (error) => {
        console.log("Error action_getBusinesses: ", error);
      }
    );
  }
  method_getSubsidiaries(): void {
    this.subsidiaryService.action_getSubsidiaries({business_id: this.session.businessId})
    .subscribe(
      (data) => {
        this.subsidiaries = data;
      },
      (error) => {
        console.log("Error action_getSubsidiaries: ", error);
      }
    );
  }
  method_getRoles(): void {
    this.rolService.action_getRoles({})
    .subscribe(
      (data) => {
        this.roles = data;
      },
      (error) => {
        console.log("Error action_getRoles: ", error);
      }
    );
  }
  method_insertUser() {
    this.userForm.get('name').setValue(this.user.name);
    this.userForm.get('lastname1').setValue(this.user.lastname1);
    this.userForm.get('cellphone').setValue(this.user.cellphone);
    this.userForm.get('password').setValue(this.user.password);
    this.sessionForm.get('subsidiary_id').setValue(this.session.subsidiary_id);
    this.sessionForm.get('rol_id').setValue(this.session.rol_id);
    if (this.userForm.valid && this.sessionForm.valid) {
      this.isLoading = true;
      this.userService.action_insertUser(this.user, this.session)
      .subscribe(
        (data) => {
          if(data.status == 200){
            this.userInsert.hide();
            this.isLoading = false;
            this.emitter_insertedUser.emit(true);
            Swal.fire("Usuario creado", "", "success");
          } else {
            this.isLoading = false;
            Swal.fire("Usuario no creado", "Intentalo de nuevo", "warning");
            console.log("Response action_insertUser: ", data);
          }
        },
        (error) => {
          this.isLoading = false;
          Swal.fire("Usuario no creado", "Reporta a sistemas", "error");
          console.log("Error action_insertUser: ", error);
        }
      );
    } else {
      Swal.fire("Usuario no creado", "Completa la información", "info");
      console.log("Información formulario: ",this.userForm, this.sessionForm);
    }
  }
}

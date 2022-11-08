import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { ModalDirective } from 'angular-bootstrap-md';
import { User } from "../../../interfaces/user";
import { Session } from "../../../interfaces/session";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";
import { RolService } from "../../../services/rol.service";
import { UserService } from '../../../services/user.service';
import { SessionService } from '../../../services/session.service';
import { EnterpriseService } from '../../../services/enterprise.service';
import { BusinessService } from '../../../services/business.service';
import { SubsidiaryService } from "../../../services/subsidiary.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})

export class UserUpdateComponent implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() userId: number;
  @Input() showedUserInUpdate: boolean = false;
  @ViewChild('userUpdate') public userUpdate: ModalDirective;  
  user: User = {id: 0, name: "", avatar: "", avatarFile: null, cover: "", coverFile: null, lastname1: "", lastname2: "", cellphone: null, password: "", session_id: 0};
  enterprises: any = [];
  businesses: any = [];
  subsidiaries: any = [];
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
  isLoading: boolean = false;
  @Output() emitter_updatedUser: EventEmitter<boolean> = new EventEmitter();
  @Input() gotUsersInUpdate: boolean = false;
  @Output() emitter_gotUserInUpdate: EventEmitter<boolean> = new EventEmitter();  

  constructor(
    private authenticationService: AuthenticationService,
    private rolService: RolService,
    private userService: UserService,
    private enterpriseService: EnterpriseService,
    private businessService: BusinessService,
    private subsidiaryService: SubsidiaryService,
    private sessionService: SessionService,
    private formBuilder: FormBuilder
  ) { 
    this.userForm = this.formBuilder.group({
      id: new FormControl("", [Validators.required,
        Validators.min(1)]),
      name: new FormControl("", [Validators.required]),
      lastname1: new FormControl("", [Validators.required]),
      cellphone: new FormControl("", [Validators.required])
    });
  }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.user.id = this.userId;
  }
  ngOnChanges() {
    if(this.showedUserInUpdate){
      this.method_getUser();
      this.emitter_gotUserInUpdate.emit(true);
    } else {
      this.emitter_gotUserInUpdate.emit(false);
    }
    if (this.gotUsersInUpdate) {
      this.emitter_updatedUser.emit(false);
    }
  }
  
  method_getUser() {    
    this.userUpdate.show();
    this.method_getEnterprises();
    this.userService.action_getUsers({id: this.userId})
    .subscribe(
      (dataUser) => { 
        this.user = dataUser;
        this.user.avatarFile = null;
        this.user.coverFile = null;
        this.sessionService.action_getSessions({id: this.user.session_id})
        .subscribe(
          (dataSession) => { 
            this.session = dataSession;
            this.method_getBusinesses();
            this.method_getSubsidiaries();
          },
          (errorSession) => {console.log("Error action_getSession: ",errorSession);}
        );
      },
      (errorUser) => {console.log("Error action_getUser: ",errorUser);}
    );
    this.method_getRoles();
  }
  method_getEnterprises() {
    this.enterpriseService.action_insideGetEnterprises({})
    .subscribe(
      (data) => { this.enterprises = data; },
      (error) => { console.log("Error action_getEnterprises: ",error); }
    );
  }
  method_getBusinesses() {
    this.businessService.action_getBusinesses({enterprise_id: this.session.enterpriseId})
    .subscribe(
      (data) => { this.businesses = data; },
      (error) => { console.log("Error action_getBusinesses: ",error); }
    );
  }
  method_getSubsidiaries() {
    this.subsidiaryService.action_getSubsidiaries({business_id: this.session.businessId})
    .subscribe(
      (data) => { this.subsidiaries = data; },
      (error) => { console.log("Error action_getSubsidiaries: ", error); }
    );
  }
  method_getRoles() {
    this.rolService.action_getRoles({})
    .subscribe(
      (data) => { this.roles = data; },
      (error) => { console.log("Error action_getRoles: ", error); }
    );
  }
  method_updateUser() {
    this.userForm.get('id').setValue(this.user.id);
    this.userForm.get('name').setValue(this.user.name);
    this.userForm.get('lastname1').setValue(this.user.lastname1);
    this.userForm.get('cellphone').setValue(this.user.cellphone);
    if (this.userForm.valid) {
      this.isLoading = true;
      this.userService.action_updateUser(this.user, this.session)
      .subscribe(
        (data) => { 
          if(data.status == 200){
            this.userUpdate.hide();
            this.isLoading = false;
            this.emitter_updatedUser.emit(true);
            Swal.fire("Usuario modificado","",'success');
          } else {
            this.isLoading = false;
            Swal.fire("Usuario no modificado","Intentalo de nuevo",'warning');
            console.log("Response action_updateUser: ",data);
          }
        },
        (error) => {
          this.isLoading = false;
          Swal.fire("Usuario no modificado","Reporta a sistemas",'error');
          console.log("Error action_updateUser: ",error);
        }
      );
    } else {
      Swal.fire("Usuario no modificado","Completa la información",'info');
      console.log("Información formulario: ",this.userForm);
    }
  }
}

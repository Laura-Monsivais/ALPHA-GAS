import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from "../../../interfaces/user";
import { Enterprise } from "../../../interfaces/enterprise";
import { Business } from "../../../interfaces/business";
import { Session } from "../../../interfaces/session";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";
import { UserService } from '../../../services/user.service';
import Swal from "sweetalert2";
import { Rol } from "../../../interfaces/rol";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})

export class UserProfileComponent implements OnInit {
  getUserAvatarUrl: string;
  getUserCoverUrl: string;
  user: User = {id: 0, name: "", avatar: "", avatarFile: null, cover: "", coverFile: null, lastname1: "", lastname2: "", cellphone: null, password: "", session_id: 0};
  enterprise: Enterprise = {id: 0, name: "", logo: "", logoFile: null, overlay: "", overlayFile: null};
  business: Business = {id: 0, name: "", enterprise_id: 0, attention_id: 0};
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
  rol: Rol = {id: 0, key: "", name: ""};

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
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
    this.method_getUser();
    this.rol = this.authenticationService.localStorage_getRol();
  }
  
  method_getUser(): void {  
    this.user = this.authenticationService.localStorage_getUser();
    this.user.avatarFile = null;
    this.getUserAvatarUrl = this.userService.action_getUserAvatar(this.user.avatar);
    this.user.coverFile = null;
    this.getUserCoverUrl = this.userService.action_getUserCover(this.user.cover);  
    this.session = this.authenticationService.localStorage_getSession();
    this.enterprise = this.authenticationService.localStorage_getEnterprise();
    this.session.enterpriseId = this.enterprise.id;
    this.business = this.authenticationService.localStorage_getBusiness();
    this.session.businessId = this.business.id;
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
            this.isLoading = false;
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

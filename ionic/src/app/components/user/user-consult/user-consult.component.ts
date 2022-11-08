import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { ModalDirective } from 'angular-bootstrap-md';
import { AuthenticationService } from "../../../services/authentication.service";
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-consult',
  templateUrl: './user-consult.component.html',
  styleUrls: ['./user-consult.component.scss'],
})

export class UserConsultComponent implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() userId: number;
  @Input() showedUserInConsult: boolean = false;
  @ViewChild('userConsult') public userConsult: ModalDirective;  
  user: any = {id: 0, 
    name: "", 
    avatar: "", 
    avatarFile: null, 
    cover: "", 
    coverFile: null, 
    lastname1: "", 
    lastname2: "", 
    cellphone: null, 
    password: "", 
    session_id: 0};
  @Output() emitter_gotUserInConsult: EventEmitter<boolean> = new EventEmitter();  

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ngOnChanges() {
    if(this.showedUserInConsult){
      this.method_getUser();
      this.emitter_gotUserInConsult.emit(true);
    } else {
      this.emitter_gotUserInConsult.emit(false);
    }
  }
  
  method_getUser() {    
    this.userConsult.show();
    this.userService.action_getUsers({id: this.userId})
    .subscribe(
      (data) => { this.user = data; },
      (error) => {console.log("Error action_getUser: ",error);}
    );
  }
}

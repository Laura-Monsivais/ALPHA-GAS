import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { User } from "../../../interfaces/user";
import { AuthenticationService } from "../../../services/authentication.service";
import { UserService } from '../../../services/user.service';
import Swal from "sweetalert2";
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})

export class UserTableComponent implements OnInit, AfterViewInit {
    rol: Rol = {id: 0, key: "", name: ""};
    gotUsersInInsert: boolean = false;
    user: any = {search: null, limit: 20, name: null, lastname1: null, lastname2: null, cellphone: null, createdAtStart: null, createdAtEnd: null};
    isLoading: boolean = false;
    @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
    headsSort = ['id', 'avatar', 'name', 'lastname1', 'cellphone', 'created_at', 'updated_at'];
    heads = ['Opciones', 'Avatar', 'Nombre', 'Primer apellido', 'Celular', 'Creado', 'Modificado'];
    users: any = [];
    userId: number = 1;
    showedUserInConsult: boolean = false;
    showedUserInUpdate: boolean = false;
    gotUsersInUpdate: boolean = false;
    previous: any = [];    
    @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  
    constructor(
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private cdRef: ChangeDetectorRef
    ) { }
    
    ngOnInit() {
      this.rol = this.authenticationService.localStorage_getRol();
      this.method_getUsers(this.user);
    }
    ngAfterViewInit() {
      this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
      this.cdRef.detectChanges();
    }
    method_insertedUser(event:boolean) {
      if(event){
        this.method_getUsers(this.user);
        this.gotUsersInInsert = true;
      } else {
        this.gotUsersInInsert = false;
      }
    }  
    method_exportUsers() {
      this.userService.action_exportUsers({})
      .subscribe(
        (data) => { 
          var url = (window.URL || window.webkitURL).createObjectURL(data);
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.href = url;
          a.download = "EMURCIA_usuarios.xlsx";
          a.click();
          window.URL.revokeObjectURL(url);          
        },
        (error) => {
          Swal.fire("Excel de los usuarios no descargado","Reporta a un superior",'error');
          console.log("Error action_exportUsers: ",error);
        }
      );
    }
    method_searchUsers() {
      if (!this.user.search) {
        this.mdbTable.setDataSource(this.previous);
        this.users = this.mdbTable.getDataSource();
      }
      if (this.user.search) {
        this.users = this.mdbTable.searchLocalDataBy(this.user.search);
        this.mdbTable.setDataSource(this.mdbTable.getDataSource());
      }
    }
    method_searchAdvancedUsers() {
      this.method_getUsers(this.user);
    }
    method_getUsers(request: any) {
      this.isLoading = true;
      this.userService.action_getUsers(request)
      .subscribe(
        (data) => { 
          this.isLoading = false;
          this.users = data;
          this.mdbTable.setDataSource(this.users);
          this.users = this.mdbTable.getDataSource();
          this.previous = this.mdbTable.getDataSource();
        },
        (error) => {
          this.isLoading = false;
          console.log("Error action_getUsers: ",error);
        }
      );
    }
    method_showUserConsult(userId:number) {
      this.userId = userId;
      this.showedUserInConsult = true;    
    }
    method_gotUserInConsult(event:boolean) {    
      if(event){
        this.showedUserInConsult = false;
      }
    } 
    method_showUserUpdate(userId:number) {
      this.userId = userId;
      this.showedUserInUpdate = true;
    }
    method_gotUserInUpdate(event:boolean) {
      if(event){
        this.showedUserInUpdate = false;
      }
    }
    method_updatedUser(event:boolean) {    
      if(event){
        this.method_getUsers(this.user);
        this.gotUsersInUpdate = true;
      } else {
        this.gotUsersInUpdate = false;
      }
    } 
  }
 
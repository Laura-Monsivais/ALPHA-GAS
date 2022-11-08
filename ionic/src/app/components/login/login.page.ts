import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { AuthenticationService } from "../../services/authentication.service";
import { Router } from "@angular/router";
import { User } from "../../interfaces/user";
import Swal from "sweetalert2";
import { environment } from "src/environments/environment";
import { EnterpriseService } from "src/app/services/enterprise.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  user: User = {
    id: 0, 
    name: "",
    lastname1: "",
    lastname2: null,
    cellphone: null, 
    password: "", 
    avatar: null,
    avatarFile: null,
    cover: null,
    coverFile: null,
    session_id: 0,
    remember_token: null
  };
  fieldTextType: boolean; 
  loginForm: FormGroup;
  isLoading: boolean = false;
  getSiteOverlayUrl: string = "";
  enterprises: any = [];

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      cellphone: new FormControl("", [
        Validators.required,
        Validators.maxLength(10),
      ]),
      password: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit() {}
  ionViewDidEnter() {
    this.method_getEnterprises();
    this.getSiteOverlayUrl = environment.siteUrl+ "/assets/overlays/emurcia.jpg";
    if(this.authenticationService.localStorage_getUser()){      
      this.user = this.authenticationService.localStorage_getUser();
      if(this.user.remember_token){
        this.router.navigate(["/dashboard"]);
      } else {        
        this.authenticationService.localStorage_removeToken();
        this.authenticationService.localStorage_removeUser();
        this.authenticationService.localStorage_removeSession();
        this.authenticationService.localStorage_removeEnterprise();
        this.authenticationService.localStorage_removeBusiness();
        this.authenticationService.localStorage_removeAttention();
        this.authenticationService.localStorage_removeSubsidiary();
        this.authenticationService.localStorage_removeRol();
        this.authenticationService.localStorage_removeOrderDetailProducts();
        this.authenticationService.localStorage_removeOrderDetailPromotions();
        this.user = {
          id: 0, 
          name: "",
          lastname1: "",
          lastname2: null,
          cellphone: null, 
          password: "", 
          avatar: null,
          avatarFile: null,
          cover: null,
          coverFile: null,
          session_id: 0,
          remember_token: null
        };
      }
    } else {
      this.user = {
        id: 0, 
        name: "",
        lastname1: "",
        lastname2: null,
        cellphone: null, 
        password: "", 
        avatar: null,
        avatarFile: null,
        cover: null,
        coverFile: null,
        session_id: 0,
        remember_token: null
      };
    }
  }
  ionViewDidLeave() {}

  method_getEnterprises(): void {
    this.enterpriseService.action_outsideGetEnterprises({})
    .subscribe(
      (data) => { this.enterprises = data;},
      (error) => {console.log("Error action_getEnterprises: ",error);}
    );
  }  
  method_getEnterpriseLogoUrl(logo: string){
    return this.enterpriseService.action_outsideGetEnterpriseLogo(logo);
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  method_login() {
    this.loginForm.get("cellphone").setValue(this.user.cellphone);
    this.loginForm.get("password").setValue(this.user.password);
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authenticationService.action_login(this.user)
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.authenticationService.localStorage_setToken(data.token);
          this.authenticationService.localStorage_setUser(data.user);
          this.authenticationService.localStorage_setSession(data.session);
          this.authenticationService.localStorage_setEnterprise(data.enterprise);
          this.authenticationService.localStorage_setBusiness(data.business);
          this.authenticationService.localStorage_setAttention(data.attention);
          this.authenticationService.localStorage_setSubsidiary(data.subsidiary);
          this.authenticationService.localStorage_setRol(data.rol);
          this.authenticationService.localStorage_setOrderDetailProducts([]);
          this.authenticationService.localStorage_setOrderDetailPromotions([]);
          this.authenticationService.localStorage_setSale({});
          this.authenticationService.localStorage_setSaleDetailPromotions([]);
          this.authenticationService.localStorage_setSaleDetailProducts([]);
          this.authenticationService.localStorage_setSaleDetailServices([]);
          this.authenticationService.localStorage_setBuy({});
          this.authenticationService.localStorage_setBuyDetailProducts([]);
          this.authenticationService.localStorage_setBuyDetailServices([]);
          this.router.navigate(["/dashboard"]);
        },
        (error) => {     
          this.isLoading = false;     
          Swal.fire("Sesión no iniciada","Accesos incorrectos",'error');
          console.log("Error action_login: ",error);
        }
      );
    } else {
      this.isLoading = false;
      this.router.navigateByUrl("/login");
      Swal.fire("Sesión no iniciada", "Completa la información", "info");
      console.log("Información formulario: ",this.loginForm);
    }
  }
}

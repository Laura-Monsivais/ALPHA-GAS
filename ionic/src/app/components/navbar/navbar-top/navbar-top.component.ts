import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { User } from "../../../interfaces/user";
import { Attention } from "../../../interfaces/attention";
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { SessionService } from "../../../services/session.service";
import { Router } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { UserService } from '../../../services/user.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss'],
})
export class NavbarTopComponent implements OnInit {
  @Input() userId: number;
  getUserAvatarUrl: string;
  getUserCoverUrl: string;
  user: User = {id: 0, name: "", avatar: "", avatarFile: null, cover: "", coverFile: null, lastname1: "", lastname2: "", cellphone: null, password: "", session_id: 0};
  attention: Attention = {id: 0, key: "", name: ""};
  rol: Rol = {id: 0, key: "", name: ""};
  sessions: any = [];
  subsidiaries: any = [];
  optionSelect: any = [];
  response: any;
  form: FormGroup;
  cartQuantity: number = 0;  
  @Input() isAddedArticle:boolean;
  @Output() emitter_isGotArticles: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private sessionService: SessionService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    console.log('Inicia app-navbar-top'+ this.router.url);
    this.attention = this.authenticationService.localStorage_getAttention();
    this.rol = this.authenticationService.localStorage_getRol();
    this.user = this.authenticationService.localStorage_getUser();
    this.getUserAvatarUrl = this.userService.action_getUserAvatar(this.user.avatar);
    this.getUserCoverUrl = this.userService.action_getUserCover(this.user.cover);
    let productsAdded = this.authenticationService.localStorage_getOrderDetailProducts();
    let promotionsAdded = this.authenticationService.localStorage_getOrderDetailPromotions();
    this.cartQuantity = productsAdded.length + promotionsAdded.length;   
    this.method_getSessions();
  }
  ionViewDidEnter() {
  }
  ionViewDidLeave() {
  }
  ngOnChanges() {
    if(this.isAddedArticle){
      let productsAdded = this.authenticationService.localStorage_getOrderDetailProducts();
      let promotionsAdded = this.authenticationService.localStorage_getOrderDetailPromotions();
      this.cartQuantity = productsAdded.length + promotionsAdded.length;
      this.emitter_isGotArticles.emit(true);
    } else {
      this.emitter_isGotArticles.emit(false);
    }
  }
  
  method_routeActive(route: string) {
    return this.router.url === "/" + route;
  }
  method_getSessions(): void {
    this.sessionService.action_getSessions({ authenticate: true })
    .subscribe(
      (data) => {
        this.sessions = data;
      },
      (error) => {
        console.log("Error action_getSessions: ", error);
        Swal.fire("Sesión ha expirado","",'error')
        .then((result) => {
          if (result.isConfirmed) {
            this.method_getLogout();
          } else if (result.isDenied) {
            this.method_getLogout();
          } else {
            this.method_getLogout();
          }
        });
      }
    );
  }
  method_updateUserSessionId(): void {
    Swal.showLoading();
    this.userService
      .action_updateUserSessionId({ session_id: this.user.session_id })
      .subscribe(
        (dataUser) => {
          if(dataUser == 200){
            this.authenticationService.action_getAuth({})
            .subscribe(
              (data) => {
                this.authenticationService.localStorage_removeUser();
                this.authenticationService.localStorage_removeSession();
                this.authenticationService.localStorage_removeEnterprise();
                this.authenticationService.localStorage_removeBusiness();
                this.authenticationService.localStorage_removeAttention();
                this.authenticationService.localStorage_removeSubsidiary();
                this.authenticationService.localStorage_removeRol();
                this.authenticationService.localStorage_removeOrderDetailProducts();
                this.authenticationService.localStorage_removeOrderDetailPromotions();
                this.authenticationService.localStorage_removeSale();
                this.authenticationService.localStorage_removeSaleDetailProducts();
                this.authenticationService.localStorage_removeSaleDetailPromotions();
                this.authenticationService.localStorage_removeSaleDetailServices();
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
                this.authenticationService.localStorage_setSaleDetailProducts([]);
                this.authenticationService.localStorage_setSaleDetailPromotions([]);
                this.authenticationService.localStorage_setSaleDetailServices([]);
                this.authenticationService.localStorage_setBuy({});
                this.authenticationService.localStorage_setBuyDetailProducts([]);
                this.authenticationService.localStorage_setBuyDetailServices([]);
                window.location.reload();
              },
              (error) => {
                console.log("Error action_getAuth: ", error);
              }
            );
          } else {
            console.log("Response action_updateUserSessionId: ",dataUser);
          }
        },
        (errorUser) => {
          console.log("Error action_updateUserSessionId: ", errorUser);
        }
      );
  }
  method_goToConfiguration() {
    this.router.navigate(["/configuration"]);
  }
  method_getLogout(): void {
    Swal.showLoading();
    this.authenticationService.action_logout({})
    .subscribe(
      (data) => {
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
        window.location.reload();
      },
      (error) => {
        console.log("Error action_getLogout: ", error);
      }
    );
  }
}

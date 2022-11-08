import { Component, OnInit, Input } from "@angular/core";
import { AuthenticationService } from "../../../services/authentication.service";
import { Rol } from "src/app/interfaces/rol";
import { BusinessService } from '../../../services/business.service';
import { SubsidiaryService } from '../../../services/subsidiary.service';
@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.scss"],
})
export class UserFormComponent implements OnInit {
  @Input() user: any;
  @Input() session: any;
  @Input() enterprises: any = [];
  @Input() businesses: any = [];
  @Input() subsidiaries: any = [];
  @Input() roles: any = [];
  fieldTextType: boolean;
  rol: Rol = {id: 0, key: "", name: ""};

  constructor(
    private authenticationService: AuthenticationService,
    private businessService: BusinessService,
    private subsidiaryService: SubsidiaryService
  ) { 
  }

  ngOnInit() {
    this.user = this.user;
    this.rol = this.authenticationService.localStorage_getRol();
  }

  method_getUserAvatarFile(event: any){
    this.user.avatarFile = event.target.files[0];
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  method_getUserCoverFile(event: any){
    this.user.coverFile = event.target.files[0];
  }
  method_getBusinesses(): void {
    this.businessService.action_getBusinesses({enterprise_id: this.session.enterpriseId})
    .subscribe(
      (data) => { this.businesses = data;},
      (error) => {console.log("Error action_getBusinesses: ",error);}
    );
  }
  method_getSubsidiaries(): void {
    this.subsidiaryService.action_getSubsidiaries({business_id: this.session.businessId})
    .subscribe(
      (data) => { this.subsidiaries = data;},
      (error) => {console.log("Error action_getSubsidiaries: ",error);}
    );
  }
}

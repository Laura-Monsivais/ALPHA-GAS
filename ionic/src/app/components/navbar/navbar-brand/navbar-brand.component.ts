import { Component, OnInit } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { Enterprise } from "../../../interfaces/enterprise";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import { environment } from "src/environments/environment";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar-brand',
  templateUrl: './navbar-brand.component.html',
  styleUrls: ['./navbar-brand.component.scss'],
})
export class NavbarBrandComponent implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  getEnterpriseLogoUrl: string;
  enterprise: Enterprise = {id: 0, name: "", logo: "", logoFile: null, overlay: "", overlayFile: null};

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.enterprise = this.authenticationService.localStorage_getEnterprise();
    this.method_insideGetEnterpriseLogo();
  }

  method_insideGetEnterpriseLogo(): void {
    if(this.rol.key === 'Super'){
      this.getEnterpriseLogoUrl = environment.siteUrl+ "/assets/logos/emurcia.png";
    } else {
      this.enterpriseService.action_insideGetEnterpriseLogo({logo: this.enterprise.logo})
      .subscribe(
        (data) => {
          this.getEnterpriseLogoUrl = (window.URL || window.webkitURL).createObjectURL(data);
        },
        (error) => {
          console.log("Error action_insideGetEnterpriseLogo: ", error);
        }
      );
    }
  }
  method_sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}

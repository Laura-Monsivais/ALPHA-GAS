import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import Swal from "sweetalert2";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-enterprise-logo',
  templateUrl: './enterprise-logo.component.html',
  styleUrls: ['./enterprise-logo.component.scss'],
})

export class EnterpriseLogoComponent implements OnInit {
  @ViewChild('enterpriseLogoDownload') public enterpriseLogoDownload:ModalDirective;
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() enterpriseLogo: string;
  @Input() enterpriseLogoFile: any;
  getEnterpriseLogoUrl: string;
  getEnterpriseLogoFileUrl: string;
  isPreview: boolean = false;
  isLoading: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private sanitizer:DomSanitizer
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_insideGetEnterpriseLogo();
  }
  ngOnChanges() {
    this.method_insideGetEnterpriseLogo();    
    if (this.enterpriseLogoFile !== null) {
      if(this.enterpriseLogoFile.type === "image/png" || this.enterpriseLogoFile.type === "image/jpeg") {
        this.getEnterpriseLogoFileUrl = (window.URL || window.webkitURL).createObjectURL(this.enterpriseLogoFile);
        this.isPreview = true;
      } else {
        this.isPreview = false;
      }
    } else {
      this.isPreview = false;
    }
  }
  
  method_insideGetEnterpriseLogo(): void {
    this.enterpriseService.action_insideGetEnterpriseLogo({logo: this.enterpriseLogo})
    .subscribe(
      (data) => {
        this.getEnterpriseLogoUrl = (window.URL || window.webkitURL).createObjectURL(data);
      },
      (error) => {
        console.log("Error action_insideGetEnterpriseLogo: ", error);
      }
    );
  }
  method_sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  method_downloadEnterpriseLogo() {
    this.isLoading = true;
    this.enterpriseService.action_downloadEnterpriseLogo({logo: this.enterpriseLogo})
    .subscribe(
      (data) => { 
        var url = (window.URL || window.webkitURL).createObjectURL(data);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = this.enterpriseLogo;
        a.click();
        window.URL.revokeObjectURL(url);
        this.enterpriseLogoDownload.hide();
        this.isLoading = false;        
      },
      (error) => {
        this.isLoading = false;
        Swal.fire("Logo del usuario no descargado","Reporta a un superior",'error');
        console.log("Error action_downloadEnterpriseLogo: ",error);
      }
    );
  }
}

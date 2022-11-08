import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import Swal from "sweetalert2";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-enterprise-overlay',
  templateUrl: './enterprise-overlay.component.html',
  styleUrls: ['./enterprise-overlay.component.scss'],
})

export class EnterpriseOverlayComponent implements OnInit {
  @ViewChild('enterpriseOverlayDownload') public enterpriseOverlayDownload:ModalDirective;
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() enterpriseOverlay: string;
  @Input() enterpriseOverlayFile: any;
  getEnterpriseOverlayUrl: string;
  getEnterpriseOverlayFileUrl: string;
  isPreview: boolean = false;
  isLoading: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private sanitizer:DomSanitizer
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_getEnterpriseOverlay();   
  }
  ngOnChanges() {
    this.method_getEnterpriseOverlay();   
    if (this.enterpriseOverlayFile !== null) {
      if(this.enterpriseOverlayFile.type === "image/png" || this.enterpriseOverlayFile.type === "image/jpeg") {
        this.getEnterpriseOverlayFileUrl = (window.URL || window.webkitURL).createObjectURL(this.enterpriseOverlayFile);
        this.isPreview = true;
      } else {
        this.isPreview = false;
      }
    } else {
      this.isPreview = false;
    }
  }
  
  method_getEnterpriseOverlay(): void {
    this.enterpriseService.action_getEnterpriseOverlay({overlay: this.enterpriseOverlay})
    .subscribe(
      (data) => {
        this.getEnterpriseOverlayUrl = (window.URL || window.webkitURL).createObjectURL(data);
      },
      (error) => {
        console.log("Error action_getEnterpriseOverlay: ", error);
      }
    );
  }  
  method_sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  method_downloadEnterpriseOverlay() {
    this.isLoading = true;
    this.enterpriseService.action_downloadEnterpriseOverlay({overlay: this.enterpriseOverlay})
    .subscribe(
      (data) => { 
        var url = (window.URL || window.webkitURL).createObjectURL(data);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = this.enterpriseOverlay;
        a.click();
        window.URL.revokeObjectURL(url);
        this.enterpriseOverlayDownload.hide();
        this.isLoading = false;        
      },
      (error) => {
        this.isLoading = false;
        Swal.fire("Overlay del usuario no descargado","Reporta a un superior",'error');
        console.log("Error action_downloadEnterpriseOverlay: ",error);
      }
    );
  }
}

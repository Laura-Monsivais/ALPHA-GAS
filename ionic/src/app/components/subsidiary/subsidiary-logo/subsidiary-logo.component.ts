import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { SubsidiaryService } from '../../../services/subsidiary.service';
import Swal from "sweetalert2";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-subsidiary-logo',
  templateUrl: './subsidiary-logo.component.html',
  styleUrls: ['./subsidiary-logo.component.scss'],
})

export class SubsidiaryLogoComponent implements OnInit {
  @ViewChild('subsidiaryLogoDownload') public subsidiaryLogoDownload:ModalDirective;
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() subsidiaryLogo: string;
  @Input() subsidiaryLogoFile: any;
  getSubsidiaryLogoUrl: string;
  getSubsidiaryLogoFileUrl: string;
  isPreview: boolean = false;
  isLoading: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private subsidiaryService: SubsidiaryService,
    private sanitizer:DomSanitizer
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.getSubsidiaryLogoUrl = this.subsidiaryService.action_getSubsidiaryLogo(this.subsidiaryLogo);
  }
  ngOnChanges() {
    this.getSubsidiaryLogoUrl = this.subsidiaryService.action_getSubsidiaryLogo(this.subsidiaryLogo);    
    if (this.subsidiaryLogoFile !== null) {
      if(this.subsidiaryLogoFile.type === "image/png" || this.subsidiaryLogoFile.type === "image/jpeg") {
        this.getSubsidiaryLogoFileUrl = (window.URL || window.webkitURL).createObjectURL(this.subsidiaryLogoFile);
        this.isPreview = true;
      } else {
        this.isPreview = false;
      }
    } else {
      this.isPreview = false;
    }
  }
  
  method_downloadSubsidiaryLogo() {
    this.isLoading = true;
    this.subsidiaryService.action_downloadSubsidiaryLogo({logo: this.subsidiaryLogo})
    .subscribe(
      (data) => { 
        var url = (window.URL || window.webkitURL).createObjectURL(data);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = this.subsidiaryLogo;
        a.click();
        window.URL.revokeObjectURL(url);
        this.subsidiaryLogoDownload.hide();
        this.isLoading = false;        
      },
      (error) => {
        this.isLoading = false;
        Swal.fire("Logo del usuario no descargado","Reporta a un superior",'error');
        console.log("Error action_downloadSubsidiaryLogo: ",error);
      }
    );
  }
  method_sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}

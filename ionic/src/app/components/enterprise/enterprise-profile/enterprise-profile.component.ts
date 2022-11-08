import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Enterprise } from "../../../interfaces/enterprise";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from "../../../services/enterprise.service";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Rol } from "../../../interfaces/rol";
import Swal from "sweetalert2";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-enterprise-profile',
  templateUrl: './enterprise-profile.component.html',
  styleUrls: ['./enterprise-profile.component.scss'],
})
export class EnterpriseProfileComponent implements OnInit {
  getEnterpriseLogoUrl: string;
  getEnterpriseOverlayUrl: string;
  enterprise: Enterprise = {id: 0, name: "", logo: "", logoFile: null, overlay: "", overlayFile: null};
  enterpriseForm: FormGroup;
  isLoading: boolean = false;
  @Output() isUpdatedEnterprise: EventEmitter<boolean> = new EventEmitter();
  rol: Rol = {id: 0, key: "", name: ""};
  

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) { 
    this.enterpriseForm = this.formBuilder.group({
      id: new FormControl("", [Validators.required,
        Validators.min(1)]),
      name: new FormControl("", [Validators.required])
    });
  }

  ngOnInit() {
    this.method_getEnterprise();
    this.rol = this.authenticationService.localStorage_getRol();
  }
  
  method_getEnterprise(): void {  
    this.enterprise = this.authenticationService.localStorage_getEnterprise();
    this.enterprise.logoFile = null;
    this.method_insideGetEnterpriseLogo();
    this.enterprise.overlayFile = null;
    this.method_getEnterpriseOverlay(); 
  }
  method_insideGetEnterpriseLogo(): void {
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
  method_getEnterpriseOverlay(): void {
    this.enterpriseService.action_getEnterpriseOverlay({overlay: this.enterprise.overlay})
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
  method_sanitizeStyle(url:string){
    return this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
  }
  method_updateEnterprise() {
    this.enterpriseForm.get('id').setValue(this.enterprise.id);
    this.enterpriseForm.get('name').setValue(this.enterprise.name);
    if (this.enterpriseForm.valid) {
      this.isLoading = true;
      this.enterpriseService.action_updateEnterprise(this.enterprise)
      .subscribe(
        (data) => { 
          if(data.status == 200){
            this.isLoading = false;
            this.isUpdatedEnterprise.emit(true);
            Swal.fire("Empresa modificada","",'success');
          } else {
            this.isLoading = false;
            Swal.fire("Empresa no modificada","Intentalo de nuevo",'warning');
            console.log("Response action_updateEnterprise: ",data);
          }
        },
        (error) => {
          this.isLoading = false;
          Swal.fire("Empresa no modificada","Reporta a sistemas",'error');
          console.log("Error action_updateEnterprise: ",error);
        }
      );
    } else {
      Swal.fire("Empresa no modificada","Completa la información",'info');
      console.log("Información formulario: ",this.enterpriseForm);
    }
  }

}

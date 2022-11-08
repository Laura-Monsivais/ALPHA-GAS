import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subsidiary } from "../../../interfaces/subsidiary";
import { Business } from "../../../interfaces/business";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import { SubsidiaryService } from "../../../services/subsidiary.service";
import { BusinessService } from '../../../services/business.service';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Rol } from "../../../interfaces/rol";
import Swal from "sweetalert2";
import { Enterprise } from 'src/app/interfaces/enterprise';

@Component({
  selector: 'app-subsidiary-profile',
  templateUrl: './subsidiary-profile.component.html',
  styleUrls: ['./subsidiary-profile.component.scss'],
})
export class SubsidiaryProfileComponent implements OnInit {
  getSubsidiaryLogoUrl: string;
  getSubsidiaryOverlayUrl: string;
  subsidiary: Subsidiary = {id: 0, name: "", street: "", exterior: "", interior: "", postal_code: "", neighborhood: "", city: "", municipality: "", state: "", country: "", is_central: false,  references: "", enterpriseId: 0, business_id: 0, logo: "", logoFile: null, overlay: "", overlayFile: null};
  enterprise: Enterprise;
  enterprises: any = [];
  businesses: any = [];
  business: Business = {id: 0, name: "", enterprise_id: 0, attention_id: 0};
  subsidiaryForm: FormGroup;
  isLoading: boolean = false;
  @Output() isUpdatedSubsidiary: EventEmitter<boolean> = new EventEmitter();
  rol: Rol = {id: 0, key: "", name: ""};

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private subsidiaryService: SubsidiaryService,
    private businessService: BusinessService,
    private formBuilder: FormBuilder
  ) { 
    this.subsidiaryForm = this.formBuilder.group({
      id: new FormControl("", [Validators.required,
        Validators.min(1)]),
      name: new FormControl("", [Validators.required]),
      is_central: new FormControl("", [Validators.required]),
      street: new FormControl("", [Validators.required]),
      exterior: new FormControl("", [Validators.required]),
      postal_code: new FormControl("", [Validators.required]),
      neighborhood: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      municipality: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      country: new FormControl("", [Validators.required]),
      business_id: new FormControl("", [Validators.required,
        Validators.min(1)]),
    });
  }

  ngOnInit() {
    this.method_getSubsidiary();
    this.rol = this.authenticationService.localStorage_getRol();
  }
  
  method_getSubsidiary(): void {  
    this.method_getEnterprises();
    this.enterprise = this.authenticationService.localStorage_getEnterprise();
    this.subsidiary = this.authenticationService.localStorage_getSubsidiary();
    this.subsidiary.enterpriseId = this.enterprise.id;
    this.subsidiary.logoFile = null;
    this.getSubsidiaryLogoUrl = this.subsidiaryService.action_getSubsidiaryLogo(this.subsidiary.logo);
    this.subsidiary.overlayFile = null;
    this.getSubsidiaryOverlayUrl = this.subsidiaryService.action_getSubsidiaryOverlay(this.subsidiary.overlay); 
    this.business = this.authenticationService.localStorage_getBusiness();
    this.method_getBusinesses();
  }
  method_getEnterprises(): void {
    this.enterpriseService.action_insideGetEnterprises({})
    .subscribe(
      (data) => { this.enterprises = data;},
      (error) => {console.log("Error action_getEnterprises: ",error);}
    );
  }
  method_getBusinesses(): void {
    this.businessService.action_getBusinesses({enterprise_id: this.subsidiary.enterpriseId})
    .subscribe(
      (data) => { this.businesses = data;},
      (error) => {console.log("Error action_getBusinesses: ",error);}
    );
  }
  method_updateSubsidiary() {
    this.subsidiaryForm.get("id").setValue(this.subsidiary.id);
    this.subsidiaryForm.get("name").setValue(this.subsidiary.name);
    this.subsidiaryForm.get("is_central").setValue(this.subsidiary.is_central);
    this.subsidiaryForm.get("street").setValue(this.subsidiary.street);
    this.subsidiaryForm.get("exterior").setValue(this.subsidiary.exterior);
    this.subsidiaryForm.get("postal_code").setValue(this.subsidiary.postal_code);
    this.subsidiaryForm.get("neighborhood").setValue(this.subsidiary.neighborhood);
    this.subsidiaryForm.get("city").setValue(this.subsidiary.city);
    this.subsidiaryForm.get("municipality").setValue(this.subsidiary.municipality);
    this.subsidiaryForm.get("state").setValue(this.subsidiary.state);
    this.subsidiaryForm.get("country").setValue(this.subsidiary.country);
    this.subsidiaryForm.get("business_id").setValue(this.subsidiary.business_id);
    if (this.subsidiaryForm.valid) {
      this.isLoading = true;
      this.subsidiaryService.action_updateSubsidiary(this.subsidiary)
      .subscribe(
        (data) => { 
          if(data.status == 200){
            this.isLoading = false;
            this.isUpdatedSubsidiary.emit(true);
            Swal.fire("Sucursal modificada","",'success');
          } else {
            this.isLoading = false;
            Swal.fire("Sucursal no modificada","Intentalo de nuevo",'warning');
            console.log("Response action_updateSubsidiary: ",data.message);
          }
        },
        (error) => {
          this.isLoading = false;
          Swal.fire("Sucursal no modificada","Reporta a sistemas",'error');
          console.log("Error action_updateSubsidiary: ",error);
        }
      );
    } else {
      Swal.fire("Sucursal no modificada","Completa la información",'info');
      console.log("Información formulario: ",this.subsidiaryForm);
    }
  }

}

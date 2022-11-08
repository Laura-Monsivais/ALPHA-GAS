import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Promotion } from "../../../interfaces/promotion";
import { Enterprise } from "../../../interfaces/enterprise";
import { Business } from "../../../interfaces/business";
import { Subsidiary } from "../../../interfaces/subsidiary";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import { BusinessService } from '../../../services/business.service';
import { SubsidiaryService } from '../../../services/subsidiary.service';
import { PromotionService } from '../../../services/promotion.service';
import { ModalDirective } from 'angular-bootstrap-md';
import Swal from "sweetalert2";
import { Rol } from "../../../interfaces/rol";

@Component({
  selector: 'app-promotion-insert',
  templateUrl: './promotion-insert.component.html',
  styleUrls: ['./promotion-insert.component.scss'],
})

export class PromotionInsertComponent implements OnInit {
  @ViewChild('promotionInsert') public promotionInsert:ModalDirective;  
  promotion: Promotion = {id: 0, name: "", price: 0, cost: 0, expires_at: "", enterprise_id: 0, business_id: 0, subsidiary_id: 0};
  enterprise: Enterprise = {id: 0, name: ""};
  business: Business = {id: 0, name: "", enterprise_id: 0, attention_id: 0};
  subsidiary: Subsidiary = {
    id: 0, 
    name: "", 
    is_central: false,
    logo: null,
    logoFile: null,
    overlay: null,
    overlayFile: null,
    street: "",
    exterior: "",
    interior: null,
    postal_code: "",
    neighborhood: "",
    city: "",
    municipality: "",
    state: "",
    country: "",
    references: null,
    enterpriseId: 0, 
    business_id: 0
  };
  enterprises: any = [];
  businesses: any = [];
  subsidiaries: any = [];
  promotionForm: FormGroup;
  isLoading: boolean = false;
  @Output() emitter_insertedPromotion: EventEmitter<boolean> = new EventEmitter();
  @Input() gotPromotionsInInsert:boolean = false;
  rol: Rol = {id: 0, key: "", name: ""};

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private businessService: BusinessService,
    private subsidiaryService: SubsidiaryService,
    private promotionService: PromotionService,
    private formBuilder: FormBuilder
  ) {
    this.promotionForm = this.formBuilder.group({
      name: new FormControl("", [
        Validators.required
      ]),
      expires_at: new FormControl("", [
        Validators.required
      ]),
      enterprise_id: new FormControl("", [
        Validators.required,
        Validators.min(1)
      ]),
    });
  }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ngOnChanges() {
    if(this.gotPromotionsInInsert){
      this.emitter_insertedPromotion.emit(false);
    }
  }
  
  method_getPromotion(){
    this.promotionInsert.show();
    this.method_getEnterprises();
    this.promotion = {id: 0, name: "", price: 0, cost: 0, expires_at: "", enterprise_id: 0, business_id: 0, subsidiary_id: 0};
    switch(this.rol.key){
      case 'Super':
      break;
      case 'Director':
        this.enterprise = this.authenticationService.localStorage_getEnterprise();
        this.promotion.enterprise_id = this.enterprise.id;
        this.method_getBusinesses();
      break;
      case 'Manager':
      break;
      case 'Call_Center':
      break;
      case 'Seller':
      break;
      case 'Client':
      break;
      default:
      break;
    }
  }
  method_getEnterprises(): void {
    this.enterpriseService.action_insideGetEnterprises({})
    .subscribe(
      (data) => { this.enterprises = data;},
      (error) => {console.log("Error action_getEnterprises: ",error);}
    );
  }
  method_getBusinesses(): void {
    this.businessService.action_getBusinesses({enterprise_id: this.promotion.enterprise_id})
    .subscribe(
      (data) => { this.businesses = data;},
      (error) => {console.log("Error action_getBusinesses: ",error);}
    );
  }
  method_insertPromotion() {
    this.promotionForm.get('name').setValue(this.promotion.name);
    this.promotionForm.get('expires_at').setValue(this.promotion.expires_at);
    this.promotionForm.get('enterprise_id').setValue(this.promotion.enterprise_id);
    if (this.promotionForm.valid) {
      this.isLoading = true;
      this.promotionService.action_insertPromotion(this.promotion)
      .subscribe(
        (data) => { 
          if(data == 200){
            this.promotionInsert.hide();
            this.isLoading = false;
            this.emitter_insertedPromotion.emit(true);
            Swal.fire("Promoción creada","",'success');
          } else {
            this.isLoading = false;
            Swal.fire("Promoción no creada","Intentalo de nuevo",'warning');
            console.log("Response action_insertPromotion: ",data);
          }
        },
        (error) => {
          this.isLoading = false;
          Swal.fire("Promoción no creada","Reporta a un superior",'error');
          console.log("Error action_insertPromotion: ",error);
        }
      );
    } else {
      Swal.fire("Promoción no creada","Completa la información",'info');
      console.log("Información formulario: ",this.promotionForm);
    }
  }
}

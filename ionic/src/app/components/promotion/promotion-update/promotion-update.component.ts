import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { ModalDirective } from 'angular-bootstrap-md';
import { Promotion } from "../../../interfaces/promotion";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import { BusinessService } from '../../../services/business.service';
import { SubsidiaryService } from '../../../services/subsidiary.service';
import { PromotionService } from '../../../services/promotion.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-promotion-update',
  templateUrl: './promotion-update.component.html',
  styleUrls: ['./promotion-update.component.scss'],
})

export class PromotionUpdateComponent implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() promotionId: number;
  @Input() showedPromotionInUpdate: boolean = false;
  @ViewChild('promotionUpdate') public promotionUpdate:ModalDirective;
  promotion: Promotion = {id: 0, name: "", price: 0, cost: 0, expires_at: "", enterprise_id: 0, business_id: 0, subsidiary_id: 0};
  enterprises: any = [];
  businesses: any = [];
  subsidiaries: any = [];
  promotionForm: FormGroup;
  isLoading: boolean = false;
  @Output() emitter_updatedPromotion: EventEmitter<boolean> = new EventEmitter();
  @Input() gotPromotionsInUpdate: boolean = false;
  @Output() emitter_gotPromotionInUpdate: EventEmitter<boolean> = new EventEmitter();

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
    this.promotion.id = this.promotionId;
  }
  ngOnChanges() {
    if(this.showedPromotionInUpdate){
      this.method_getPromotion();
      this.emitter_gotPromotionInUpdate.emit(true);
    } else {
      this.emitter_gotPromotionInUpdate.emit(false);
    }
    if (this.gotPromotionsInUpdate) {
      this.emitter_updatedPromotion.emit(false);
    }
  }
  
  method_getPromotion(): void {    
    this.promotionUpdate.show();
    this.method_getEnterprises();
    this.promotionService.action_getPromotions({id: this.promotionId})
    .subscribe(
      (data) => { 
        this.promotion = data;
        this.method_getBusinesses();
        this.method_getSubsidiaries();
      },
      (error) => {console.log("Error action_getPromotion: ",error);}
    );
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
  method_getSubsidiaries(): void {
    this.subsidiaryService.action_getSubsidiaries({business_id: this.promotion.business_id})
    .subscribe(
      (data) => { this.subsidiaries = data;},
      (error) => {console.log("Error action_getSubsidiaries: ",error);}
    );
  }
  method_updatePromotion() {
    this.promotionForm.get('name').setValue(this.promotion.name);
    this.promotionForm.get('expires_at').setValue(this.promotion.expires_at);
    this.promotionForm.get('enterprise_id').setValue(this.promotion.enterprise_id);
    if (this.promotionForm.valid) {
      this.isLoading = true;
      this.promotionService.action_updatePromotion(this.promotion)
      .subscribe(
        (data) => { 
          if(data == 200){
            this.promotionUpdate.hide();
            this.isLoading = false;
            this.emitter_updatedPromotion.emit(true);
            Swal.fire("Promoción modificada","",'success');
          } else {
            this.isLoading = false;
            Swal.fire("Promoción no modificada","Intentalo de nuevo",'warning');
            console.log("Response action_insertPromotion: ",data);
          }
        },
        (error) => {
          this.isLoading = false;
          Swal.fire("Promoción no modificada","Reporta a un superior",'error');
          console.log("Error action_updatePromotion: ",error);
        }
      );
    } else {
      Swal.fire("Promoción no modificada","Completa la información",'info');
      console.log("Información formulario: ",this.promotionForm);
    }
  }
}

import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Donation } from "../../../interfaces/donation";
import { Enterprise } from "../../../interfaces/enterprise";
import { Business } from "../../../interfaces/business";
import { Subsidiary } from "../../../interfaces/subsidiary";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import { BusinessService } from '../../../services/business.service';
import { DonationService } from '../../../services/donation.service';
import { ModalDirective } from 'angular-bootstrap-md';
import Swal from "sweetalert2";
import { Rol } from "../../../interfaces/rol";

@Component({
  selector: 'app-donation-insert',
  templateUrl: './donation-insert.component.html',
  styleUrls: ['./donation-insert.component.scss'],
})

export class DonationInsertComponent implements OnInit {
  @ViewChild('donationInsert') public donationInsert:ModalDirective;  
  donation: Donation = {
    id: 0, 
    name: "", 
    realized_at: "", 
    enterpriseId: 0, 
    businessId: 0, 
    subsidiaryId: 0, 
    categoryId: 0, 
    productId: 0, 
    productUnit: null,
    inventory_id: 0,
    inventoryTheoretical: null, 
    quantity: 0, 
    cost: 0, 
    total: 0
  };
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
  categories: any = [];
  products: any = [];
  donationForm: FormGroup;
  isLoading: boolean = false;
  @Output() emitter_insertedDonation: EventEmitter<boolean> = new EventEmitter();
  @Input() gotDonationsInInsert:boolean = false;
  rol: Rol = {id: 0, key: "", name: ""};

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private businessService: BusinessService,
    private donationService: DonationService,
    private formBuilder: FormBuilder
  ) {
    this.donationForm = this.formBuilder.group({
      name: new FormControl("", [
        Validators.required
      ]),
      realized_at: new FormControl("", [
        Validators.required
      ]),
      inventory_id: new FormControl("", [
        Validators.required,
        Validators.min(1)
      ]),
      quantity: new FormControl("", [
        Validators.required
      ]),
      cost: new FormControl("", [
        Validators.required
      ]),
      total: new FormControl("", [
        Validators.required
      ]),
    });
  }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ngOnChanges() {
    if(this.gotDonationsInInsert){
      this.emitter_insertedDonation.emit(false);
    }
  }
  
  method_getDonation(){
    this.donationInsert.show();
    this.donation = {
      id: 0, 
      name: "", 
      realized_at: "", 
      enterpriseId: 0, 
      businessId: 0, 
      subsidiaryId: 0, 
      categoryId: 0, 
      productId: 0, 
      productUnit: null,
      inventory_id: 0,
      inventoryTheoretical: null, 
      quantity: 0, 
      cost: 0, 
      total: 0
    };
    this.method_getEnterprises();
    let date = new Date();
    let monthNumber = date.getMonth()+1;
    let month = (monthNumber<10)?'0'+monthNumber: monthNumber;
    let dayNumber = date.getDate();
    let day = (dayNumber<10)?'0'+dayNumber: dayNumber;
    this.donation.realized_at = date.getFullYear() + "-"  + month + "-" + day;
    this.business = this.authenticationService.localStorage_getBusiness();
    this.subsidiary = this.authenticationService.localStorage_getSubsidiary();
    switch(this.rol.key){
      case 'Super':
      break;
      case 'Director':
        this.enterprise = this.authenticationService.localStorage_getEnterprise();
        this.donation.enterpriseId = this.enterprise.id;
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
    this.businessService.action_getBusinesses({enterprise_id: this.donation.enterpriseId})
    .subscribe(
      (data) => { this.businesses = data;},
      (error) => {console.log("Error action_getBusinesses: ",error);}
    );
  }
  method_insertDonation() {
    this.donationForm.get('name').setValue(this.donation.name);
    this.donationForm.get('realized_at').setValue(this.donation.realized_at);
    this.donationForm.get('inventory_id').setValue(this.donation.inventory_id);
    this.donationForm.get('quantity').setValue(this.donation.quantity);
    this.donationForm.get('cost').setValue(this.donation.cost);
    this.donationForm.get('total').setValue(this.donation.total);
    if (this.donationForm.valid) {
      this.isLoading = true;
      this.donationService.action_insertDonation(this.donation)
      .subscribe(
        (data) => { 
          if(data == 200){
            this.donationInsert.hide();
            this.isLoading = false;
            this.emitter_insertedDonation.emit(true);
            Swal.fire("Donación creada","",'success');
          } else {
            this.isLoading = false;
            Swal.fire("Donación no creada","Intentalo de nuevo",'warning');
            console.log("Response action_insertDonation: ",data);
          }
        },
        (error) => {
          this.isLoading = false;
          Swal.fire("Donación no creada","Reporta a un superior",'error');
          console.log("Error action_insertDonation: ",error);
        }
      );
    } else {
      Swal.fire("Donación no creada","Completa la información",'info');
      console.log("Información formulario: ",this.donationForm);
    }
  }
}

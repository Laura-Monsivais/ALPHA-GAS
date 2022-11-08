import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { ModalDirective } from 'angular-bootstrap-md';
import { Donation } from "../../../interfaces/donation";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import { BusinessService } from '../../../services/business.service';
import { SubsidiaryService } from '../../../services/subsidiary.service';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { DonationService } from '../../../services/donation.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-donation-update',
  templateUrl: './donation-update.component.html',
  styleUrls: ['./donation-update.component.scss'],
})

export class DonationUpdateComponent implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() donationId: number;
  @Input() showedDonationInUpdate: boolean = false;
  @ViewChild('donationUpdate') public donationUpdate:ModalDirective;
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
  enterprises: any = [];
  businesses: any = [];
  subsidiaries: any = [];
  categories: any = [];
  products: any = [];
  donationForm: FormGroup;
  isLoading: boolean = false;
  @Output() emitter_updatedDonation: EventEmitter<boolean> = new EventEmitter();
  @Input() gotDonationsInUpdate: boolean = false;
  @Output() emitter_gotDonationInUpdate: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private businessService: BusinessService,
    private subsidiaryService: SubsidiaryService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private donationService: DonationService,
    private formBuilder: FormBuilder
  ) {
    this.donationForm = this.formBuilder.group({
      id: new FormControl("", [
        Validators.required,
        Validators.min(1)
      ]),
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
    this.donation.id = this.donationId;
  }
  ngOnChanges() {
    if(this.showedDonationInUpdate){
      this.method_getDonation();
      this.emitter_gotDonationInUpdate.emit(true);
    } else {
      this.emitter_gotDonationInUpdate.emit(false);
    }
    if (this.gotDonationsInUpdate) {
      this.emitter_updatedDonation.emit(false);
    }
  }
  
  method_getDonation(): void {    
    this.donationUpdate.show();
    this.method_getEnterprises();
    this.donationService.action_getDonations({id: this.donationId})
    .subscribe(
      (data) => { 
        this.donation = data;
        this.method_getBusinesses();
        this.method_getSubsidiaries();
        this.method_getCategories();
        this.method_getProducts();
      },
      (error) => {console.log("Error action_getDonation: ",error);}
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
    this.businessService.action_getBusinesses({enterprise_id: this.donation.enterpriseId})
    .subscribe(
      (data) => { this.businesses = data;},
      (error) => {console.log("Error action_getBusinesses: ",error);}
    );
  }
  method_getSubsidiaries(): void {
    this.subsidiaryService.action_getSubsidiaries({business_id: this.donation.businessId})
    .subscribe(
      (data) => { this.subsidiaries = data;},
      (error) => {console.log("Error action_getSubsidiaries: ",error);}
    );
  }
  method_getCategories(): void {
    this.categoryService.action_getCategories({business_id: this.donation.businessId})
    .subscribe(
      (data) => { this.categories = data;},
      (error) => {console.log("Error action_getCategories: ",error);}
    );
  }
  method_getProducts(): void{
    this.productService.action_getProducts({category_id: this.donation.categoryId})
    .subscribe(
      (data) => { this.products = data; },
      (error) => {console.log("Error action_getProducts: ",error);}
    );
  }
  method_updateDonation() {
    this.donationForm.get('id').setValue(this.donation.id);
    this.donationForm.get('name').setValue(this.donation.name);
    this.donationForm.get('realized_at').setValue(this.donation.realized_at);
    this.donationForm.get('inventory_id').setValue(this.donation.inventory_id);
    this.donationForm.get('quantity').setValue(this.donation.quantity);
    this.donationForm.get('cost').setValue(this.donation.cost);
    this.donationForm.get('total').setValue(this.donation.total);
    if (this.donationForm.valid) {
      this.isLoading = true;
      this.donationService.action_updateDonation(this.donation)
      .subscribe(
        (data) => { 
          if(data == 200){
            this.donationUpdate.hide();
            this.isLoading = false;
            this.emitter_updatedDonation.emit(true);
            Swal.fire("Donación modificada","",'success');
          } else {
            this.isLoading = false;
            Swal.fire("Donación no modificada","Intentalo de nuevo",'warning');
            console.log("Response action_insertDonation: ",data);
          }
        },
        (error) => {
          this.isLoading = false;
          Swal.fire("Donación no modificada","Reporta a un superior",'error');
          console.log("Error action_updateDonation: ",error);
        }
      );
    } else {
      Swal.fire("Donación no modificada","Completa la información",'info');
      console.log("Información formulario: ",this.donationForm);
    }
  }
}

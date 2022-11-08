import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Transfer } from "../../../interfaces/transfer";
import { Enterprise } from "../../../interfaces/enterprise";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import { BusinessService } from '../../../services/business.service';
import { SubsidiaryService } from '../../../services/subsidiary.service';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { TransferService } from '../../../services/transfer.service';
import { ModalDirective } from 'angular-bootstrap-md';
import Swal from "sweetalert2";
import { Rol } from "../../../interfaces/rol";

@Component({
  selector: 'app-transfer-update',
  templateUrl: './transfer-update.component.html',
  styleUrls: ['./transfer-update.component.scss'],
})

export class TransferUpdateComponent implements OnInit {
  @Input() transferId: number;
  @ViewChild('transferUpdate') public transferUpdate:ModalDirective;
  transfer: Transfer = {
    id: 0, 
    key: "",
    name: "",
    enterpriseId: 0,
    businessId: 0,
    originId: 0,
    categoryId: 0, 
    productId: 0, 
    productUnit: null,
    inventory_id: 0,
    inventoryTheoretical: null,
    quantity: 0,
    destination_id: 0
  };
  enterprise: Enterprise = {id: 0, name: ""};
  enterprises: any = [];
  businesses: any = [];
  origins: any = [];
  categories: any = [];
  products: any = [];
  destinations: any = [];
  transferForm: FormGroup;
  isLoading: boolean = false;
  @Input() showedTransferInUpdate: boolean = false;
  @Output() emitter_updatedTransfer: EventEmitter<boolean> = new EventEmitter();
  @Input() gotTransfersInUpdate: boolean = false;
  @Output() emitter_gotTransferInUpdate: EventEmitter<boolean> = new EventEmitter();
  rol: Rol = {id: 0, key: "", name: ""};

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private businessService: BusinessService,
    private subsidiaryService: SubsidiaryService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private transferService: TransferService,
    private formBuilder: FormBuilder
  ) {
    this.transferForm = this.formBuilder.group({
      id: new FormControl("", [
        Validators.required,
        Validators.min(1)
      ]),
      name: new FormControl("", [
        Validators.required
      ]),
      inventory_id: new FormControl("", [
        Validators.required,
        Validators.min(1)
      ]),
      quantity: new FormControl("", [
        Validators.required
      ]),
      destination_id: new FormControl("", [
        Validators.required,
        Validators.min(1)
      ]),
    });
  }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.transfer.id = this.transferId;
  }
  ngOnChanges() {
    if(this.showedTransferInUpdate){
      this.method_getTransfer();
      this.emitter_gotTransferInUpdate.emit(true);
    } else {
      this.emitter_gotTransferInUpdate.emit(false);
    }
    if (this.gotTransfersInUpdate) {
      this.emitter_updatedTransfer.emit(false);
    }
  }

  method_getTransfer() {    
    this.transferUpdate.show();
    this.method_getEnterprises();
    this.transferService.action_getTransfers({id: this.transferId})
    .subscribe(
      (data) => {
        this.transfer = data;
        this.method_getBusinesses();
        this.method_getSubsidiaries();
        this.method_getCategories();
        this.method_getProducts();
      },
      (error) => {console.log("Error action_getTransfer: ",error);}
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
    this.businessService.action_getBusinesses({enterprise_id: this.transfer.enterpriseId})
    .subscribe(
      (data) => { this.businesses = data;},
      (error) => {console.log("Error action_getBusinesses: ",error);}
    );
  }
  method_getSubsidiaries(): void {
    this.subsidiaryService.action_getSubsidiaries({business_id: this.transfer.businessId})
    .subscribe(
      (data) => { 
        this.origins = data;
        this.destinations = data;
      },
      (error) => {console.log("Error action_getSubsidiaries: ",error);}
    );
  }
  method_getCategories(): void {
    this.categoryService.action_getCategories({business_id: this.transfer.businessId})
    .subscribe(
      (data) => { this.categories = data;},
      (error) => {console.log("Error action_getCategories: ",error);}
    );
  }
  method_getProducts(): void{
    this.productService.action_getProducts({category_id: this.transfer.categoryId})
    .subscribe(
      (data) => { this.products = data; },
      (error) => {console.log("Error action_getProducts: ",error);}
    );
  }
  method_updateTransfer() {
    this.transferForm.get('id').setValue(this.transfer.id);
    this.transferForm.get('name').setValue(this.transfer.name);
    this.transferForm.get('inventory_id').setValue(this.transfer.inventory_id);
    this.transferForm.get('quantity').setValue(this.transfer.quantity);
    this.transferForm.get('destination_id').setValue(this.transfer.destination_id);
    if (this.transferForm.valid) {
      this.isLoading = true;
      this.transferService.action_updateTransfer(this.transfer)
      .subscribe(
        (data) => { 
          if(data == 200){
            this.transferUpdate.hide();
            this.isLoading = false;
            this.emitter_updatedTransfer.emit(true);
            Swal.fire("Traspaso modificado","",'success');
          } else {
            this.isLoading = false;
            Swal.fire("Traspaso no modificado","Intentalo de nuevo",'warning');
            console.log("Response action_insertTransfer: ",data);
          }
        },
        (error) => {
          this.isLoading = false;
          Swal.fire("Traspaso no modificado","Reporta a un superior",'error');
          console.log("Error action_updateTransfer: ",error);
        }
      );
    } else {
      Swal.fire("Traspaso no modificado","Completa la información",'info');
      console.log("Información formulario: ",this.transferForm);
    }
  }
}

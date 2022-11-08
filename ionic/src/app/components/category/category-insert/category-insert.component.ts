import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Category } from "../../../interfaces/category";
import { Enterprise } from "../../../interfaces/enterprise";
import { Rol } from "../../../interfaces/rol";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import { BusinessService } from '../../../services/business.service';
import { CategoryService } from '../../../services/category.service';
import { ModalDirective } from 'angular-bootstrap-md';
import Swal from "sweetalert2";

@Component({
  selector: 'app-category-insert',
  templateUrl: './category-insert.component.html',
  styleUrls: ['./category-insert.component.scss'],
})

export class CategoryInsertComponent implements OnInit {
  @ViewChild('categoryInsert') public categoryInsert:ModalDirective;
  category: Category = {id: 0, name: "", enterpriseId: 0, business_id: 0};
  enterprise: Enterprise = {id: 0, name: ""};
  enterprises: any = [];
  businesses: any = [];
  categoryForm: FormGroup;
  isLoading: boolean = false;
  @Output() emitter_insertedCategory: EventEmitter<boolean> = new EventEmitter();
  @Input() gotCategoriesInInsert:boolean = false;
  rol: Rol = {id: 0, key: "", name: ""};

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private businessService: BusinessService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {
    this.categoryForm = this.formBuilder.group({
      name: new FormControl("", [
        Validators.required
      ]),
      business_id: new FormControl("", [
        Validators.required,
        Validators.min(1)
      ]),
    });
  }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ngOnChanges() {
    if(this.gotCategoriesInInsert){
      this.emitter_insertedCategory.emit(false);
    }
  }
  
  method_getCategory(){
    this.categoryInsert.show();
    this.enterprise = this.authenticationService.localStorage_getEnterprise();
    this.category = {id: 0, name: "", enterpriseId: this.enterprise.id, business_id: 0};
    this.method_getEnterprises();
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
    this.businessService.action_getBusinesses({enterprise_id: this.category.enterpriseId})
    .subscribe(
      (data) => { this.businesses = data;},
      (error) => {console.log("Error action_getBusinesses: ",error);}
    );
  }
  method_insertCategory() {
    this.categoryForm.get('name').setValue(this.category.name);
    this.categoryForm.get('business_id').setValue(this.category.business_id);
    if (this.categoryForm.valid) {
      this.isLoading = true;
      this.categoryService.action_insertCategory(this.category)
      .subscribe(
        (data) => { 
          if(data == 200){
            this.categoryInsert.hide();
            this.isLoading = false;
            this.emitter_insertedCategory.emit(true);
            Swal.fire("Categoría creada","",'success');
          } else {
            this.isLoading = false;
            Swal.fire("Categoría no creada","Intentalo de nuevo",'warning');
            console.log("Response action_insertCategory: ",data);
          }
        },
        (error) => {
          this.isLoading = false;
          Swal.fire("Categoría no creada","Reporta a un superior",'error');
          console.log("Error action_insertCategory: ",error);
        }
      );
    } else {
      Swal.fire("Categoría no creada","Completa la información",'info');
      console.log("Información formulario: ",this.categoryForm);
    }
  }
}

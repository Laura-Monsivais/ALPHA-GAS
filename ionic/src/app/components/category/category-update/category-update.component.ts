import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Category } from "../../../interfaces/category";
import { Rol } from "../../../interfaces/rol";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';
import { BusinessService } from '../../../services/business.service';
import { CategoryService } from '../../../services/category.service';
import Swal from "sweetalert2";
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.scss'],
})

export class CategoryUpdateComponent implements OnInit {
  @ViewChild('categoryUpdate') public categoryUpdate:ModalDirective;
  @Input() categoryId: number;
  @Input() showedCategoryInUpdate: boolean = false;
  category: Category = {id: 0, name: "", enterpriseId: 0, business_id: 0};
  enterprises: any = [];
  businesses: any = [];
  subsidiaries: any = [];
  rol: Rol = {id: 0, key: "", name: ""};
  categoryForm: FormGroup;
  isLoading: boolean = false;
  @Output() emitter_updatedCategory: EventEmitter<boolean> = new EventEmitter();
  @Input() gotCategoriesInUpdate: boolean = false;
  @Output() emitter_gotCategoryInUpdate: EventEmitter<boolean> = new EventEmitter();

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
    this.category.id = this.categoryId;
  }
  ngOnChanges() {
    if(this.showedCategoryInUpdate){
      this.method_getCategory();
      this.emitter_gotCategoryInUpdate.emit(true);
    } else {
      this.emitter_gotCategoryInUpdate.emit(false);
    }
    if (this.gotCategoriesInUpdate) {
      this.emitter_updatedCategory.emit(false);
    }
  }
  method_getCategory() {    
    this.categoryUpdate.show();
    this.method_getEnterprises();
    this.categoryService.action_getCategories({id: this.categoryId})
    .subscribe(
      (data) => { 
        this.category = data;
        this.method_getBusinesses();
      },
      (error) => {console.log("Error action_getCategory: ",error);}
    );
  }
  method_getEnterprises(){
    this.enterpriseService.action_insideGetEnterprises({})
    .subscribe(
      (data) => { this.enterprises = data;},
      (error) => {console.log("Error action_getEnterprises: ",error);}
    );
  }
  method_getBusinesses(){
    this.businessService.action_getBusinesses({enterprise_id: this.category.enterpriseId})
    .subscribe(
      (data) => { this.businesses = data;},
      (error) => {console.log("Error action_getBusinesses: ",error);}
    );
  }
  method_updateCategory() {
    this.categoryForm.get('name').setValue(this.category.name);
    this.categoryForm.get('business_id').setValue(this.category.business_id);
    if (this.categoryForm.valid) {
      this.isLoading = true;
      this.categoryService.action_updateCategory(this.category)
      .subscribe(
        (data) => { 
          if(data == 200){
            this.categoryUpdate.hide();
            this.isLoading = false;
            this.emitter_updatedCategory.emit(true);
            Swal.fire("Categoría modificada","",'success');
          } else {
            this.isLoading = false;
            Swal.fire("Categoría no modificada","Intentalo de nuevo",'warning');
            console.log("Response action_insertCategory: ",data);
          }
        },
        (error) => {
          this.isLoading = false;
          Swal.fire("Categoría no modificada","Reporta a un superior",'error');
          console.log("Error action_updateCategory: ",error);
        }
      );
    } else {
      Swal.fire("Categoría no modificada","Completa la información",'info');
      console.log("Información formulario: ",this.categoryForm);
    }
  }
}

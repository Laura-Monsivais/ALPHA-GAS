import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { ModalDirective } from 'angular-bootstrap-md';
import { AuthenticationService } from "../../../services/authentication.service";
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-consult',
  templateUrl: './category-consult.component.html',
  styleUrls: ['./category-consult.component.scss'],
})

export class CategoryConsultComponent implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() categoryId: number;
  @Input() showedCategoryInConsult: boolean = false;
  @ViewChild('categoryConsult') public categoryConsult: ModalDirective;  
  category: any = {id: 0, 
    name: "", 
    enterpriseName: "", 
    businessName: "", 
    created_at: "", 
    updated_at: ""
  };
  @Output() emitter_gotCategoryInConsult: EventEmitter<boolean> = new EventEmitter();  

  constructor(
    private authenticationService: AuthenticationService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ngOnChanges() {
    if(this.showedCategoryInConsult){
      this.method_getCategory();
      this.emitter_gotCategoryInConsult.emit(true);
    } else {
      this.emitter_gotCategoryInConsult.emit(false);
    }
  }
  
  method_getCategory() {    
    this.categoryConsult.show();
    this.categoryService.action_getCategories({is: this.categoryId})
    .subscribe(
      (data) => { this.category = data; },
      (error) => {console.log("Error action_getCategory: ",error);}
    );
  }
}

import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { ModalDirective } from 'angular-bootstrap-md';
import { AuthenticationService } from "../../../services/authentication.service";
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-consult',
  templateUrl: './product-consult.component.html',
  styleUrls: ['./product-consult.component.scss'],
})

export class ProductConsultComponent implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() productId: number;
  @Input() showedProductInConsult: boolean = false;
  @ViewChild('productConsult') public productConsult: ModalDirective;  
  product: any = {id: 0, 
    name: "", 
    image: null, 
    description: "", 
    unit: "", 
    cost: "", 
    price: "", 
    quantity: "",
    enterpriseName: "", 
    businessName: "", 
    created_at: "", 
    updated_at: ""
  };
  @Output() emitter_gotProductInConsult: EventEmitter<boolean> = new EventEmitter();  

  constructor(
    private authenticationService: AuthenticationService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ngOnChanges() {
    if(this.showedProductInConsult){
      this.method_getProduct();
      this.emitter_gotProductInConsult.emit(true);
    } else {
      this.emitter_gotProductInConsult.emit(false);
    }
  }
  
  method_getProduct() {    
    this.productConsult.show();
    this.productService.action_getProducts({id: this.productId})
    .subscribe(
      (data) => { this.product = data; },
      (error) => {console.log("Error action_getProduct: ",error);}
    );
  }
}

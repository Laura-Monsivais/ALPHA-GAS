import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent implements OnInit {
  @ViewChild('productDownload') public productDownload:ModalDirective;
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() onlyIcon: any;
  @Input() product: any;
  getProductImageUrl: string;

  constructor(
    private authenticationService: AuthenticationService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.getProductImageUrl = this.productService.action_getProductImage(this.product.image);
  }
  ngOnChanges() {
    if (this.product.image !== null) {
      this.getProductImageUrl = this.productService.action_getProductImage(this.product.image);
    } 
  }
}

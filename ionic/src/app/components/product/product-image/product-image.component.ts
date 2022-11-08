import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { ProductService } from '../../../services/product.service';
import Swal from "sweetalert2";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss'],
})

export class ProductImageComponent implements OnInit {
  @ViewChild('productImageDownload') public productImageDownload:ModalDirective;
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() productImage: string;
  @Input() productImageFile: any;
  getProductImageUrl: string;
  getProductImageFileUrl: string;
  isPreview: boolean = false;
  isLoading: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private productService: ProductService,
    private sanitizer:DomSanitizer
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.getProductImageUrl = this.productService.action_getProductImage(this.productImage);
  }
  ngOnChanges() {
    if (this.productImage !== null) {
      this.getProductImageUrl = this.productService.action_getProductImage(this.productImage);
    } 
    if (this.productImageFile === null) {
      this.isPreview = false;
    } else if(this.productImageFile.type === "image/png" || this.productImageFile.type === "image/jpeg") {
      this.getProductImageFileUrl = (window.URL || window.webkitURL).createObjectURL(this.productImageFile);
      this.isPreview = true;
    }
  }
  
  method_downloadProductImage() {
    this.isLoading = true;
    this.productService.action_downloadProductImage({image: this.productImage})
    .subscribe(
      (data) => { 
        var url = (window.URL || window.webkitURL).createObjectURL(data);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = this.productImage;
        a.click();
        window.URL.revokeObjectURL(url);
        this.productImageDownload.hide();
        this.isLoading = false;        
      },
      (error) => {
        this.isLoading = false;
        Swal.fire("Imagen del producto no descargada","Reporta a un superior",'error');
        console.log("Error action_downloadProductImage: ",error);
      }
    );
  }
  method_sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}

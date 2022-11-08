import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthenticationService } from ".././services/authentication.service";
import { Product } from "../interfaces/product";

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(
    public http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  action_getProducts(request:any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post<Product>(environment.url + "getProducts", request, { headers: headers })
      .pipe(map(data => data));
  }  
  action_insertProduct(request:any): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders({
      enctype: "multipart/form-data",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    let formData: FormData = new FormData();
    formData.append("imageForm", request.imageFile);
    formData.append("product", JSON.stringify(request));
    return this.http
      .post<Product>(environment.url+'insertProduct', formData, { headers: headers })
      .pipe(map(data => data));
  }    
  action_updateProduct(request:any): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders({
      enctype: "multipart/form-data",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    let formData: FormData = new FormData();
    formData.append("imageForm", request.imageFile);
    formData.append("product", JSON.stringify(request));
    return this.http
      .post<Product>(environment.url+'updateProduct', formData, { headers: headers })
      .pipe(map(data => data));
  }  
  action_getProductImage(productImage:string) {
    return environment.url+'getProductImage/'+productImage; 
  }
  action_downloadProductImage(request:any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken()
    });
    return this.http.post(environment.url+'downloadProductImage', request, { headers: headers, responseType: 'blob' });
  }
  action_exportProducts(request: any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http.post(environment.url + "exportProducts", request, { headers: headers, responseType: 'blob' });
  }
}

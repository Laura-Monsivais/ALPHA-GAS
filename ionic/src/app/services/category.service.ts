import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthenticationService } from "./authentication.service";
import { Category } from "../interfaces/category";

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(
    public http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  action_getCategories(request:any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post<Category>(environment.url + "getCategories", request, { headers: headers })
      .pipe(map(data => data));
  }  
  action_insertCategory(request:any): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders({
      enctype: "multipart/form-data",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post<Category>(environment.url+'insertCategory', request, { headers: headers })
      .pipe(map(data => data));
  }    
  action_updateCategory(request:any): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders({
      enctype: "multipart/form-data",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post<Category>(environment.url+'updateCategory', request, { headers: headers })
      .pipe(map(data => data));
  }  
  action_exportCategories(request: any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http.post(environment.url + "exportCategories", request, { headers: headers, responseType: 'blob' });
  }
}

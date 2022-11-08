import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(public http: HttpClient) { }
  test(){
    return new Promise(resolve=>{
      this.http.get(environment.url, {responseType: 'text'}).subscribe((data) => {
          resolve(data);
      },(error) => {
        console.log(error);
      });
    });
  }
}

import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { ModalDirective } from 'angular-bootstrap-md';
import { AuthenticationService } from "../../../services/authentication.service";
import { BusinessService } from '../../../services/business.service';

@Component({
  selector: 'app-business-consult',
  templateUrl: './business-consult.component.html',
  styleUrls: ['./business-consult.component.scss'],
})

export class BusinessConsultComponent implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() businessId: number;
  @Input() showedBusinessInConsult: boolean = false;
  @ViewChild('businessConsult') public businessConsult: ModalDirective;  
  business: any = {id: 0, 
    url: ""};
  @Output() emitter_gotBusinessInConsult: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private businessService: BusinessService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ngOnChanges() {
    if(this.showedBusinessInConsult){
      this.method_getBusiness();
      this.emitter_gotBusinessInConsult.emit(true);
    } else {
      this.emitter_gotBusinessInConsult.emit(false);
    }
  }
  
  method_getBusiness() {    
    this.businessConsult.show();
    this.businessService.action_getBusinesses({id: this.businessId})
    .subscribe(
      (data) => { this.business = data; },
      (error) => {console.log("Error action_getBusiness: ",error);}
    );
  }
}

import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { ModalDirective } from 'angular-bootstrap-md';
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from '../../../services/enterprise.service';

@Component({
  selector: 'app-enterprise-consult',
  templateUrl: './enterprise-consult.component.html',
  styleUrls: ['./enterprise-consult.component.scss'],
})

export class EnterpriseConsultComponent implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() enterpriseId: number;
  @Input() showedEnterpriseInConsult: boolean = false;
  @ViewChild('enterpriseConsult') public enterpriseConsult: ModalDirective;  
  enterprise: any = {id: 0,  url: ""};
  @Output() emitter_gotEnterpriseInConsult: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ngOnChanges() {
    if(this.showedEnterpriseInConsult){
      this.method_getEnterprise();
      this.emitter_gotEnterpriseInConsult.emit(true);
    } else {
      this.emitter_gotEnterpriseInConsult.emit(false);
    }
  }
  
  method_getEnterprise() {    
    this.enterpriseConsult.show();
    this.enterpriseService.action_insideGetEnterprises({id: this.enterpriseId})
    .subscribe(
      (data) => { this.enterprise = data; },
      (error) => {console.log("Error action_getEnterprise: ",error);}
    );
  }
}

import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { ModalDirective } from 'angular-bootstrap-md';
import { AuthenticationService } from "../../../services/authentication.service";
import { ServiceService } from '../../../services/service.service';

@Component({
  selector: 'app-service-consult',
  templateUrl: './service-consult.component.html',
  styleUrls: ['./service-consult.component.scss'],
})

export class ServiceConsultComponent implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() serviceId: number;
  @Input() showedServiceInConsult: boolean = false;
  @ViewChild('serviceConsult') public serviceConsult: ModalDirective;  
  service: any = {id: 0, 
    name: "", 
    price: "", 
    enterpriseName: "", 
    created_at: "", 
    updated_at: "", 
    session_id: 0};
  @Output() emitter_gotServiceInConsult: EventEmitter<boolean> = new EventEmitter();  

  constructor(
    private authenticationService: AuthenticationService,
    private serviceService: ServiceService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ngOnChanges() {
    if(this.showedServiceInConsult){
      this.method_getService();
      this.emitter_gotServiceInConsult.emit(true);
    } else {
      this.emitter_gotServiceInConsult.emit(false);
    }
  }
  
  method_getService() {    
    this.serviceConsult.show();
    this.serviceService.action_getServices({id: this.serviceId})
    .subscribe(
      (data) => { this.service = data; },
      (error) => {console.log("Error action_getService: ",error);}
    );
  }
}

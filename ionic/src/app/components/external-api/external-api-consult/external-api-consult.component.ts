import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { ModalDirective } from 'angular-bootstrap-md';
import { AuthenticationService } from "../../../services/authentication.service";
import { ExternalApiService } from '../../../services/external-api.service';

@Component({
  selector: 'app-external-api-consult',
  templateUrl: './external-api-consult.component.html',
  styleUrls: ['./external-api-consult.component.scss'],
})

export class ExternalApiConsultComponent implements OnInit {  
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() externalApiId: number;
  @Input() showedlExternalApiInConsult: boolean = false;
  @ViewChild('externalApiConsult') public externalApiConsult: ModalDirective;  
  externalApi: any = {id: 0, 
    url: ""};
  @Output() emitter_gotExternalApiInConsult: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private externalApiService: ExternalApiService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ngOnChanges() {
    if(this.showedlExternalApiInConsult){
      this.method_getExternalApi();
      this.emitter_gotExternalApiInConsult.emit(true);
    } else {
      this.emitter_gotExternalApiInConsult.emit(false);
    }
  }
  
  method_getExternalApi() {    
    this.externalApiConsult.show();
    this.externalApiService.action_getExternalApis({id: this.externalApiId})
    .subscribe(
      (data) => { this.externalApi = data; },
      (error) => {console.log("Error action_getExternalApi: ",error);}
    );
  }
}
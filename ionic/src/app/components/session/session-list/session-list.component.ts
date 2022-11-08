import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { SessionService } from '../../../services/session.service';
@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss'],
})
export class SessionListComponent implements OnInit, OnChanges {
  @Input() sale: any;
  rol: Rol = {id: 0, key: "", name: ""};
  sessions: any = [];
  session: any = {limit: 10, search: null, name: null, clients: true, subsidiary_id: 0};
  @Output() emitter_addedClient: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private sessionService: SessionService
  ) { }


  ngOnInit() {
    this.session.subsidiary_id = this.sale.subsidiaryId;
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_getSessions(this.session);
  }
  ngOnChanges() {
    if(this.sale.subsidiaryId != 0) {
      this.session.subsidiary_id = this.sale.subsidiaryId;
      this.method_getSessions(this.session);
    }
  }

  method_searchAdvancedSessions() {
    this.method_getSessions(this.session);
  }
  method_getSessions(request: any) {
    this.sessionService.action_getSessions(request)
    .subscribe(
      (data) => { 
        this.sessions = data;
      },
      (error) => {
        console.log("Error action_getSessions: ",error);
      }
    );
  }
  method_addClientSale(client:any){
    this.sale.client_id = client.id;
    this.authenticationService.localStorage_setSale(this.sale);
    this.emitter_addedClient.emit(true);
  }
  method_removeClientSale(){
    this.sale.client_id = 0;
    this.sale.order_id = 0;
    this.authenticationService.localStorage_setSale(this.sale);
    this.emitter_addedClient.emit(false);
  }

}

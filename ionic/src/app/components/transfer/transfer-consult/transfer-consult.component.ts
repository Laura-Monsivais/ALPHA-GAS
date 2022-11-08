import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { ModalDirective } from 'angular-bootstrap-md';
import { AuthenticationService } from "../../../services/authentication.service";
import { TransferService } from '../../../services/transfer.service';

@Component({
  selector: 'app-transfer-consult',
  templateUrl: './transfer-consult.component.html',
  styleUrls: ['./transfer-consult.component.scss'],
})

export class TransferConsultComponent implements OnInit {  
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() transferId: number;
  @Input() showedTransferInConsult: boolean = false;
  @ViewChild('transferConsult') public transferConsult: ModalDirective;  
  transfer: any = {id: 0, 
    url: ""};
  @Output() emitter_gotTransferInConsult: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private transferService: TransferService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ngOnChanges() {
    if(this.showedTransferInConsult){
      this.method_getTransfer();
      this.emitter_gotTransferInConsult.emit(true);
    } else {
      this.emitter_gotTransferInConsult.emit(false);
    }
  }
  
  method_getTransfer() {    
    this.transferConsult.show();
    this.transferService.action_getTransfers({id: this.transferId})
    .subscribe(
      (data) => { this.transfer = data; },
      (error) => {console.log("Error action_getTransfer: ",error);}
    );
  }
}

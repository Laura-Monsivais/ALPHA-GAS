import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { ModalDirective } from 'angular-bootstrap-md';
import { AuthenticationService } from "../../../services/authentication.service";
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-sale-consult',
  templateUrl: './sale-consult.component.html',
  styleUrls: ['./sale-consult.component.scss'],
})

export class SaleConsultComponent implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() saleId: number;
  @Input() showedModalSaleConsult: boolean = false;
  @ViewChild('saleConsult') public saleConsult: ModalDirective;  
  sale: any = { 
    id: 0, 
    created_at: "", 
    updated_at: "", 
    sellerNameComplete: 0, 
    subsidiaryName: "",
    clientNameComplete: "",
    clientCellphone: "",
    total: 0 };
  @Output() emitter_gotSaleInConsult: EventEmitter<boolean> = new EventEmitter();  

  constructor(
    private authenticationService: AuthenticationService,
    private saleService: SaleService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ngOnChanges() {
    if(this.showedModalSaleConsult){
      this.method_getSale();
      this.emitter_gotSaleInConsult.emit(true);
    } else {
      this.emitter_gotSaleInConsult.emit(false);
    }
  }
  
  method_getSale() {    
    this.saleConsult.show();
    this.saleService.action_getSales({id: this.saleId})
    .subscribe(
      (data) => { this.sale = data; },
      (error) => {console.log("Error action_getSale: ",error);}
    );
  }
}

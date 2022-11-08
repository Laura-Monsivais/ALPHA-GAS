import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { ModalDirective } from 'angular-bootstrap-md';
import { AuthenticationService } from "../../../services/authentication.service";
import { SubsidiaryService } from '../../../services/subsidiary.service';

@Component({
  selector: 'app-subsidiary-consult',
  templateUrl: './subsidiary-consult.component.html',
  styleUrls: ['./subsidiary-consult.component.scss'],
})
export class SubsidiaryConsultComponent implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() subsidiaryId: number;
  @Input() showedSubsidiaryInConsult: boolean = false;
  @ViewChild('subsidiaryConsult') public subsidiaryConsult: ModalDirective;  
  subsidiary: any = {id: 0,  url: ""};
  @Output() emitter_gotSubsidiaryInConsult: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private subsidiaryService: SubsidiaryService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ngOnChanges() {
    if(this.showedSubsidiaryInConsult){
      this.method_getSubsidiary();
      this.emitter_gotSubsidiaryInConsult.emit(true);
    } else {
      this.emitter_gotSubsidiaryInConsult.emit(false);
    }
  }
  
  method_getSubsidiary() {    
    this.subsidiaryConsult.show();
    this.subsidiaryService.action_getSubsidiaries({id: this.subsidiaryId})
    .subscribe(
      (data) => { this.subsidiary = data; },
      (error) => {console.log("Error action_getSubsidiary: ",error);}
    );
  }
}

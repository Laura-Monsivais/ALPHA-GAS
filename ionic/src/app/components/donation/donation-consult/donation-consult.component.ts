import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { ModalDirective } from 'angular-bootstrap-md';
import { AuthenticationService } from "../../../services/authentication.service";
import { DonationService } from '../../../services/donation.service';

@Component({
  selector: 'app-donation-consult',
  templateUrl: './donation-consult.component.html',
  styleUrls: ['./donation-consult.component.scss'],
})

export class DonationConsultComponent implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() donationId: number;
  @Input() showedDonationInConsult: boolean = false;
  @ViewChild('donationConsult') public donationConsult: ModalDirective;  
  donation: any = {id: 0, 
    name: ""
  };
  @Output() emitter_gotDonationInConsult: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private donationService: DonationService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ngOnChanges() {
    if(this.showedDonationInConsult){
      this.method_getDonation();
      this.emitter_gotDonationInConsult.emit(true);
    } else {
      this.emitter_gotDonationInConsult.emit(false);
    }
  }
  
  method_getDonation() {    
    this.donationConsult.show();
    this.donationService.action_getDonations({id: this.donationId})
    .subscribe(
      (data) => { this.donation = data; },
      (error) => {console.log("Error action_getDonation: ",error);}
    );
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: 'app-route-do-step-first',
  templateUrl: './route-do-step-first.component.html',
  styleUrls: ['./route-do-step-first.component.scss'],
})

export class RouteDoStepFirstComponent implements OnInit {
  @Input() route: any;
  @Input() routeTypes: any = [];
  @Input() enterprises: any = [];
  @Input() businesses: any = [];
  @Input() subsidiaries: any = [];
  @Input() sessions: any = [];

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {}

}

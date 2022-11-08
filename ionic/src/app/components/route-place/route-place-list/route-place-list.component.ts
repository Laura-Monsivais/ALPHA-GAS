import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: 'app-route-place-list',
  templateUrl: './route-place-list.component.html',
  styleUrls: ['./route-place-list.component.scss'],
})

export class RoutePlaceListComponent implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() routePlaces: any = [];
  @Output() emitter_removededRoutePlace: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }

  method_removeRoutePlace(routePlaceIndex:number) {
    const index = this.routePlaces.indexOf(routePlaceIndex);
    this.routePlaces.splice(index, 1);
    this.authenticationService.localStorage_setRoutePlaces(this.routePlaces);
    this.emitter_removededRoutePlace.emit(true);
  }
}

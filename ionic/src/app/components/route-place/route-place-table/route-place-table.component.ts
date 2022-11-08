import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { RoutePlaceService } from 'src/app/services/route-place.service';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: 'app-route-place-table',
  templateUrl: './route-place-table.component.html',
  styleUrls: ['./route-place-table.component.scss'],
})

export class RoutePlaceTableComponent implements OnInit {
  @Input() routeId: number;
  rol: Rol = {id: 0, key: "", name: ""};
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  headsSort = ['id', 'country', 'state', 'municipality', 'city', 'neighborhood', 'postal_code', 'created_at', 'updated_at'];
  heads = ['Opciones', 'País', 'Estado', 'Municipio', 'Ciudad', 'Colonia', 'Código postal', 'Creado', 'Modificado'];
  routePlaces: any = [];
  previous: any = [];
  search: string = '';
  isLoading: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private routePlaceService: RoutePlaceService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_getRoutePlaces();
  }    
  ngOnChanges() {
    if(this.routeId != 0){
      this.method_getRoutePlaces();
    }
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  method_searchRoutePlaces() {
    if (!this.search) {
      this.method_getRoutePlaces();
    }
    if (this.search) {
        this.routePlaces = this.mdbTable.searchLocalDataBy(this.search);
        this.mdbTable.setDataSource(this.mdbTable.getDataSource());
    }
  }
  method_getRoutePlaces(): void {
    this.isLoading = true;
    this.routePlaceService.action_getRoutePlaces({route_id: this.routeId})
    .subscribe(
      (data) => { 
        this.isLoading = false;
        this.routePlaces = data;
        this.mdbTable.setDataSource(this.routePlaces);
        this.routePlaces = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      },
      (error) => {
        this.isLoading = false;
        console.log("Error action_getRoutePlaces: ",error);
      }
    );
  }

}

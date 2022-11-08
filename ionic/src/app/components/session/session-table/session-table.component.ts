import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { Session } from "../../../interfaces/session";
import { AuthenticationService } from "../../../services/authentication.service";
import { SessionService } from '../../../services/session.service';
import Swal from "sweetalert2";
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-session-table',
  templateUrl: './session-table.component.html',
  styleUrls: ['./session-table.component.scss'],
})

export class SessionTableComponent implements OnInit {
  @Input() general: boolean = true;
  @Input() userId: number;
  rol: Rol = {id: 0, key: "", name: ""};
  session: any = {search: null, limit: 20, user_id: 0};
  isLoading: boolean = false;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  headsSort = ['id', 'sessionNameComplete', 'sessionCellphone', 'enterpriseName', 'businessName', 'subsidiaryName', 'rolName', 'created_at', 'updated_at'];
  heads = ['Opciones', 'Usuario', 'Celular', 'Empresa', 'Negocio', 'Sucursal', 'Rol', 'Creado', 'Modificado'];
  sessions: any = [];
  sessionId: number = 1;  
  showedModalSessionConsult: boolean = false;
  previous: any = [];
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  
  constructor(
    private authenticationService: AuthenticationService,
    private sessionService: SessionService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_getSessions(this.session);
  }
  ngOnChanges() {
    if(this.userId != 0){
      this.session.user_id = this.userId;
      this.method_getSessions(this.session);
    }
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  method_exportSessions() {
    this.sessionService.action_exportSessions({})
    .subscribe(
      (data) => { 
        var url = (window.URL || window.webkitURL).createObjectURL(data);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = "EMURCIA_sesiones.xlsx";
        a.click();
        window.URL.revokeObjectURL(url);          
      },
      (error) => {
        Swal.fire("Excel de los sesiones no descargado","Reporta a un superior",'error');
        console.log("Error action_exportSessions: ",error);
      }
    );
  }
  method_searchSessions() {
    if (!this.session.search) {
      this.mdbTable.setDataSource(this.previous);
      this.sessions = this.mdbTable.getDataSource()
    }
    if (this.session.search) {
      this.sessions = this.mdbTable.searchLocalDataBy(this.session.search);
      this.mdbTable.setDataSource(this.mdbTable.getDataSource());
    }
  }
  method_searchAdvancedSessions() {
    this.method_getSessions(this.session);
  }
  method_getSessions(request: any) {
    this.isLoading = true;
    this.sessionService.action_getSessions(request)
    .subscribe(
      (data) => { 
        this.isLoading = false;
        this.sessions = data;
        this.mdbTable.setDataSource(this.sessions);
        this.sessions = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      },
      (error) => {
        this.isLoading = false;
        console.log("Error action_getSessions: ",error);
      }
    );
  }
  method_showModalSessionConsult(sessionId:number) {
    this.sessionId = sessionId;
    this.showedModalSessionConsult = true;    
  }

}

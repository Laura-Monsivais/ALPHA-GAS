import { Component, OnInit } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { RolService } from '../../../services/rol.service';
import Swal from "sweetalert2";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-rol-manual',
  templateUrl: './rol-manual.component.html',
  styleUrls: ['./rol-manual.component.scss'],
}) 
export class RolManualComponent implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  getRolManualUrl: string;
  isLoading: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private rolService: RolService,
    private sanitizer:DomSanitizer
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.getRolManualUrl = this.rolService.action_getRolManual(this.rol.key+".pdf");
  }
  
  method_downloadRolManual() {
    this.isLoading = true;
    this.rolService.action_downloadRolManual({manual: this.rol.key+".pdf"})
    .subscribe(
      (data) => { 
        var url = (window.URL || window.webkitURL).createObjectURL(data);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = this.rol.name;
        a.click();
        window.URL.revokeObjectURL(url);
        this.isLoading = false;        
      },
      (error) => {
        this.isLoading = false;
        Swal.fire("Manual no descargado","Reporta a un superior",'error');
        console.log("Error action_downloadRolManual: ",error);
      }
    );
  }
  method_sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

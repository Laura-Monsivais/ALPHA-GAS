import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { UserService } from '../../../services/user.service';
import Swal from "sweetalert2";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-cover',
  templateUrl: './user-cover.component.html',
  styleUrls: ['./user-cover.component.scss'],
})

export class UserCoverComponent implements OnInit {
  @ViewChild('userCoverDownload') public userCoverDownload:ModalDirective;
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() userCover: string;
  @Input() userCoverFile: any;
  getUserCoverUrl: string;
  getUserCoverFileUrl: string;
  isPreview: boolean = false;
  isLoading: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private sanitizer:DomSanitizer
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.getUserCoverUrl = this.userService.action_getUserCover(this.userCover);
  }
  ngOnChanges() {
    this.getUserCoverUrl = this.userService.action_getUserCover(this.userCover);  
    if (this.userCoverFile !== null) {
      if(this.userCoverFile.type === "image/png" || this.userCoverFile.type === "image/jpeg") {
        this.getUserCoverFileUrl = (window.URL || window.webkitURL).createObjectURL(this.userCoverFile);
        this.isPreview = true;
      } else {
        this.isPreview = false;
      }
    } else {
      this.isPreview = false;
    }
  }
  
  method_downloadUserCover() {
    this.isLoading = true;
    this.userService.action_downloadUserCover({cover: this.userCover})
    .subscribe(
      (data) => { 
        var url = (window.URL || window.webkitURL).createObjectURL(data);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = this.userCover;
        a.click();
        window.URL.revokeObjectURL(url);
        this.userCoverDownload.hide();
        this.isLoading = false;        
      },
      (error) => {
        this.isLoading = false;
        Swal.fire("Cover del usuario no descargado","Reporta a un superior",'error');
        console.log("Error action_downloadUserCover: ",error);
      }
    );
  }
  method_sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}

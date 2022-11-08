import { Component, OnInit } from '@angular/core';
import { Attention } from "../../../interfaces/attention";
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { Router } from "@angular/router";
import { EnterpriseService } from '../../../services/enterprise.service';
import { Enterprise } from "../../../interfaces/enterprise";
import { Business } from 'src/app/interfaces/business';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-navbar-left',
  templateUrl: './navbar-left.component.html',
  styleUrls: ['./navbar-left.component.scss'],
})

export class NavbarLeftComponent implements OnInit {
  attention: Attention = {id: 0, key: "", name: ""};
  business: Business = {id: 0, name: "", enterprise_id: 0, attention_id: 0};
  rol: Rol = {id: 0, key: "", name: ""};
  searchMenu: string = "";
  options: any = [{}];
  getEnterpriseOverlayUrl: string;
  enterprise: Enterprise = {id: 0, name: "", logo: "", logoFile: null, overlay: "", overlayFile: null};
  toggleNavbarLeft: boolean = true;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private enterpriseService: EnterpriseService,
    private sanitizer:DomSanitizer
  ) { }

  ngOnInit() {
    console.log('Inicia app-navbar-left'+ this.router.url);
    this.toggleNavbarLeft = true;
    this.attention = this.authenticationService.localStorage_getAttention();
    this.business = this.authenticationService.localStorage_getBusiness();
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_getMenu();
    this.enterprise = this.authenticationService.localStorage_getEnterprise();
    this.method_getEnterpriseOverlay();
  }

  method_getMenu(): void {
    this.options = [
      {
        title: "Tablero",
        url: "dashboard",
        icon: "chalkboard"
      }
    ];
    switch (this.rol.key) {
      case "Super":
        this.options.push(          
          {
            title: "Inventarios",
            url: "inventories",
            icon: "truck-loading"
          },
          {
            title: "Donaciones",
            url: "donations",
            icon: "donate"
          },
          {
            title: "Autoconsumos",
            url: "self-consumptions",
            icon: "chart-bar"
          }, 
          {
            title: "Ventas",
            url: "sales",
            icon: "credit-card"
          },
          {
            title: "Traspasos",
            url: "transfers",
            icon: "exchange-alt"
          },
          {
            title: "Compras",
            url: "buys",
            icon: "cash-register"
          },
          {
            title: "Pedidos",
            url: "orders",
            icon: "dolly-flatbed"
          }, 
          {
            title: "Rutas",
            url: "routes",
            icon: "road"
          },
          {
            title: "Promociones",
            url: "promotions",
            icon: "bullhorn"
          },
          {
            title: "Productos",
            url: "products",
            icon: "box"
          },
          {
            title: "Categorías",
            url: "categories",
            icon: "grip-horizontal"
          },
          {
            title: "Servicios",
            url: "services",
            icon: "tools"
          },
          {
            title: "API's",
            url: "external-apis",
            icon: "laptop-code"
          },
          {
            title: "Sucursales",
            url: "subsidiaries",
            icon: "store-alt"
          },
          {
            title: "Negocios",
            url: "businesses",
            icon: "briefcase"
          },
          {
            title: "Empresas",
            url: "enterprises",
            icon: "building"
          },
          {
            title: "Usuarios",
            url: "users",
            icon: "users"
          }
        );
      break;
      case "Director":
        this.options.push(
          {
            title: "Inventarios",
            url: "inventories",
            icon: "truck-loading"
          }
        );  
        if (this.business.name === "Gasera") {
          this.options.push(
            {
              title: "Donaciones",
              url: "donations",
              icon: "donate"
            }  
          );
        }
        if (this.business.name === "Gasera" && this.attention.key === "Order") {
          this.options.push(
            {
              title: "Autoconsumos",
              url: "self-consumptions",
              icon: "chart-bar"
            }   
          );
        }
        this.options.push(
          {
            title: "Ventas",
            url: "sales",
            icon: "credit-card"
          },
          {
            title: "Traspasos",
            url: "transfers",
            icon: "exchange-alt"
          },
          {
            title: "Compras",
            url: "buys",
            icon: "cash-register"
          }    
        );
        if (this.attention.key === "Order") {
          this.options.push(
            {
              title: "Pedidos",
              url: "orders",
              icon: "dolly-flatbed"
            },    
            {
              title: "Rutas",
              url: "routes",
              icon: "road"
            }      
          );
        }        
        this.options.push(
          {
            title: "Promociones",
            url: "promotions",
            icon: "bullhorn"
          },
          {
            title: "Productos",
            url: "products",
            icon: "box"
          },
          {
            title: "Categorías",
            url: "categories",
            icon: "grip-horizontal"
          }
        ); 
        if (this.attention.key === "Subsidiary") {
          this.options.push(
            {
              title: "Servicios",
              url: "services",
              icon: "tools"
            },
            {
              title: "API's",
              url: "external-apis",
              icon: "laptop-code"
            }
          );
        }
        this.options.push(
          {
            title: "Sucursales",
            url: "subsidiaries",
            icon: "store-alt"
          },
          {
            title: "Negocios",
            url: "businesses",
            icon: "briefcase"
          },
          {
            title: "Usuarios",
            url: "users",
            icon: "users"
          }
        );
      break;    
      case "Manager":
        this.options.push(      
          {
            title: "Inventarios",
            url: "inventories",
            icon: "truck-loading"
          }
        );
        if (this.business.name === "Gasera") {
          this.options.push(
            {
              title: "Donaciones",
              url: "donations",
              icon: "donate"
            }  
          );
        }
        if (this.business.name === "Gasera" && this.attention.key === "Order") {
          this.options.push(
            {
              title: "Autoconsumos",
              url: "self-consumptions",
              icon: "chart-bar"
            }   
          );
        }
        this.options.push(   
          {
            title: "Ventas",
            url: "sales",
            icon: "credit-card"
          },
          {
            title: "Traspasos",
            url: "transfers",
            icon: "exchange-alt"
          }, 
          {
            title: "Compras",
            url: "buys",
            icon: "cash-register"
          }
        );  
        if (this.attention.key === "Order") {
          this.options.push(
            {
              title: "Pedidos",
              url: "orders",
              icon: "dolly-flatbed"
            }, 
            {
              title: "Rutas",
              url: "routes",
              icon: "road"
            }         
          );
        }
        this.options.push(
          {
            title: "Promociones",
            url: "promotions",
            icon: "bullhorn"
          },
          {
            title: "Productos",
            url: "products",
            icon: "box"
          }
        );
        if (this.attention.key === "Subsidiary") {
          this.options.push(
            {
              title: "Servicios",
              url: "services",
              icon: "tools"
            }
          );
        }
        this.options.push(
          {
            title: "Usuarios",
            url: "users",
            icon: "users"
          }
        );
      break;
      case "Call_Center": 
        this.options.push(
          {
            title: "Ventas",
            url: "sales",
            icon: "credit-card"
          },
        );
        if (this.attention.key === "Order") {
          this.options.push(
            {
              title: "Pedidos",
              url: "orders",
              icon: "dolly-flatbed"
            },
            {
              title: "Rutas",
              url: "routes",
              icon: "road"
            }        
          );
        }     
        this.options.push(
          {
            title: "Promociones",
            url: "promotions",
            icon: "bullhorn"
          },
          {
            title: "Productos",
            url: "products",
            icon: "box"
          }
        ); 
        if (this.attention.key === "Subsidiary") {
          this.options.push(
            {
              title: "Servicios",
              url: "services",
              icon: "tools"
            }
          );
        }
        this.options.push(
          {
            title: "Usuarios",
            url: "users",
            icon: "users"
          }
        );
      break;  
      case "Seller":
        this.options.push(
          {
            title: "Ventas",
            url: "sales",
            icon: "credit-card"
          }
        ); 
        if (this.attention.key === "Order") {
          this.options.push(
            {
              title: "Pedidos",
              url: "orders",
              icon: "dolly-flatbed"
            }, 
            {
              title: "Rutas",
              url: "routes",
              icon: "road"
            }        
          );
        }
        this.options.push(
          {
            title: "Promociones",
            url: "promotions",
            icon: "bullhorn"
          },
          {
            title: "Productos",
            url: "products",
            icon: "box"
          }
        );
        if (this.attention.key === "Subsidiary") {
          this.options.push(
            {
              title: "Servicios",
              url: "services",
              icon: "tools"
            }
          );
        }
        this.options.push(
          {
            title: "Usuarios",
            url: "users",
            icon: "users"
          }
        );
      break;
      case "Client":
        this.options.push(
          {
            title: "Ventas",
            url: "sales",
            icon: "credit-card"
          }
        ); 
        if (this.attention.key === "Order") {
          this.options.push(
            {
              title: "Pedidos",
              url: "orders",
              icon: "dolly-flatbed"
            }, 
            {
              title: "Rutas",
              url: "routes",
              icon: "road"
            }        
          );
        }
        this.options.push(
          {
            title: "Promociones",
            url: "promotions",
            icon: "bullhorn"
          },
          {
            title: "Productos",
            url: "products",
            icon: "box"
          }
        );
      break;
    }
  }
  method_getEnterpriseOverlay(): void {
    if(this.rol.key === 'Super'){
      this.getEnterpriseOverlayUrl = environment.siteUrl+ "/assets/overlays/emurcia.jpg";
    } else {
      this.enterpriseService.action_getEnterpriseOverlay({overlay: this.enterprise.overlay})
      .subscribe(
        (data) => {
          this.getEnterpriseOverlayUrl = (window.URL || window.webkitURL).createObjectURL(data);
        },
        (error) => {
          console.log("Error action_getEnterpriseOverlay: ", error);
        }
      );
    }
  }  
  method_sanitizeStyle(url:string){ 
    return this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
  }
  method_searchMenus() {
    let search = this.searchMenu.toUpperCase();      
    if (search !== "") {    
      this.options = this.options.filter((element) => {
        let content = element['title'].toUpperCase();  
        return content.indexOf(search) >= 0;
      });
    } else {
      this.method_getMenu();
    }
  }
  method_routeActive(route: string) {
    return this.router.url === "/" + route;
  }
  method_toggleNavbarLeft(){
    this.toggleNavbarLeft = !this.toggleNavbarLeft;
  }

}

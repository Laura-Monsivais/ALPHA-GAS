import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../../../../services/authentication.service";
import { DashboardService } from "../../../../../services/dashboard.service";
import { Dashboard } from "../../../../../interfaces/dashboard";
import { Rol } from "../../../../../interfaces/rol";

@Component({
  selector: "app-subsidiaries-sales",
  templateUrl: "./subsidiaries-sales.component.html",
  styleUrls: ["./subsidiaries-sales.component.scss"],
})

export class SubsidiariesSalesComponent implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  dashboard: Dashboard = {
    label: [],
    chartLabels: [],
    chartColors: [],
    chartDatasets: [],
  };
  customerBarChartData : boolean;
  year: any;
  constructor(
    private authenticationService: AuthenticationService,
    private dashboardService: DashboardService
  ) {}
  
  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.method_getSubsidiariesSales();
    let date = new Date();
    this.year = date.getFullYear();
  }
  method_getSubsidiariesSales(): void {
    this.dashboardService.action_getSubsidiariesSales({}).subscribe(
      (data) => {
        this.dashboard = data;
        this.customerBarChartData = true;
      },
      (error) => {
        console.log("Error action_getSubsidiariesSales: ", error);
      }
    );
  }
  public chartType: string = "line";
  public chartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public chartOptions: any = {
    responsive: true,
    customerBarChartData : true,
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var labelValue = data.datasets[tooltipItem.datasetIndex].label;
          var dataValue =
            data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          var formatMoneyValue =
            data.datasets[tooltipItem.datasetIndex].formatMoney;
          return formatMoneyValue
            ? labelValue + ": $ " + dataValue + " MXN"
            : labelValue + ": $ " + dataValue;
        },
      },
    },
  };

  public chartClicked(e: any): void {}
  public chartHovered(e: any): void {}
}

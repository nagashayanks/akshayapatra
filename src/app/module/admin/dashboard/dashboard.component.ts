import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { SchemaSummary } from 'src/app/model/model';
import { CommonService } from 'src/app/service/common-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  gridColumns = [];
  pagination = true;
  sorting = true;
  pageLinks = 5;
  schemaList: SchemaSummary[];
  data: any;
  constructor(
    private api: Service,
    private url: UrlConfig,
    private common: CommonService,
    private router: Router
  ) {
    this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
          {
              data: [300, 50, 100],
              backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56'
              ],
              hoverBackgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56'
              ]
          }]
      };
  }
  ngOnInit() {
    this.getSchemadetails();
  }
  /**
   * method to fetch all doctor details
   */
  public getSchemadetails() {
    this.generateGridColumn();
    const params = `/${1}`;
    this.api.getList(this.url.urlConfig().schemes.concat(params)).subscribe(data => {
      this.schemaList = data;

    });
  }

  /* configure the grid columns */
  private generateGridColumn(): void {
    this.gridColumns = [
      {
        colName: 'Scheme Name',
        rowName: 'schemeName',
      },
      {
        colName: 'Date',
        rowName: 'date',
      },
      {
        colName: 'User Name',
        rowName: 'userName',
      },
       {
        colName: 'Payment Mode',
        rowName: 'paymentMode',
      }
    ];
  }

  selectData(event) {
  }
}

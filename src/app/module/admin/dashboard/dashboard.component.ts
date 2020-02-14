import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { SchemaSummary } from 'src/app/model/model';

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
  chartlist;
  currtid;

  constructor(
    private api: Service,
    private url: UrlConfig
  ) {

  }
  ngOnInit() {
    this.getPiechartData();
  }
  /**
   * method to fetch all schema details
   */
  public getSchemadetails(id: number) {
    this.generateGridColumn();
    const params = `/${id}`;
    this.api.getList(this.url.urlConfig().schemes.concat(params)).subscribe(data => {
      this.schemaList = data;
      console.log('data', data);
    });
  }

  /* configure the grid columns */
  private generateGridColumn(): void {
    this.gridColumns = [
      {
        colName: 'Date',
        rowName: 'date',
      },
      {
        colName: 'User Name',
        rowName: 'userName',
      },
      {
        colName: 'Scheme Name',
        rowName: 'schemeName',
      },
      {
        colName: 'Payment Mode',
        rowName: 'paymentMode',
      },
      {
        colName: 'Email Id',
        rowName: 'email',
      }
    ];
  }

  selectData(event) {
    this.currtid = this.chartlist[event.element._index];
    console.log(this.currtid.schemeId);
    this.getSchemadetails(this.currtid.schemeId);
  }

  getPiechartData() {
    this.api.getList(this.url.urlConfig().analysis).subscribe(response => {
      this.data = response;
      this.chartlist = response;
      console.log('pie', response);
      const name: any = [];
      const values = [];
      response.forEach(element => {
        name.push(element.y);
        values.push(element.name);
      });
      this.data = {
        labels: values,
        datasets: [
          {
            data: name,
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
    });
  }

}

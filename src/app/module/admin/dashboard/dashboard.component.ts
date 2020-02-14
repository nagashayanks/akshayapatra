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
  schemaList;
  gridColumns = [];

  constructor(
    private api: Service,
    private url: UrlConfig,
    private common: CommonService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  /**
   * method to fetch all doctor details
   */
  public getSchemadetails() {
    this.generateGridColumn();
    this.api.getList(this.url.urlConfig().doctors).subscribe(searchData => {
      this.schemaList = searchData;

    });
  }

  /* configure the grid columns */
  private generateGridColumn(): void {
    this.gridColumns = [
      {
        colName: 'Scheme Name',
        rowName: 'doctorName',
      }, {
        colName: 'Description',
        rowName: 'rating',
      }, {
        colName: 'Amount',
        rowName: 'specialization',
      },
      {
        colName: 'Tax Benifit Percentage',
        rowName: 'consultationFee',
      },
      {
        colName: 'Tax Benifit Description',
        rowName: 'consultationFee',
      }
    ];
  }

}

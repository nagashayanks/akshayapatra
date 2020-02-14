import { Component, OnInit } from '@angular/core';

import { Service } from 'src/app/service/service';
import { CommonService } from 'src/app/service/common-service';
import { UrlConfig } from 'src/app/service/url-config';
import { Cause } from 'src/app/model/model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  spinner = false;
  causesList: Cause[];
  constructor(
    private api: Service,
    private url: UrlConfig,
    public commonService: CommonService,
    private router: Router,
  ) { }

  private getCausesList = () => {
    this.api.getList(this.url.urlConfig().allCauses).subscribe(causes => {
      this.spinner = false;
      this.causesList = causes;
    }, error => {
      this.spinner = false;
    });
  }

  public donateNow(causes: Cause) {
    sessionStorage.setItem('accountNumber', JSON.stringify(causes));
    this.router.navigate(['/home/donation']);
  }

  ngOnInit() {
    this.getCausesList();
  }

}

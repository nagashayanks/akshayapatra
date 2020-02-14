import { Component, OnInit } from '@angular/core';
import { Cause } from 'src/app/model/model';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { CommonService } from 'src/app/service/common-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {
  causeDetail: Cause;
  donateForm: FormGroup;
  submitted = false;
  donateFlag = false;
  constructor(
    private api: Service,
    private url: UrlConfig,
    public common: CommonService,
    private fb: FormBuilder
  ) { }

  /* Donate form controls creation */
  private createForm() {
    this.donateForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      panNumber: ['', Validators.required],
      paymentMode: ['', Validators.required],
    });
  }

  /*  Access to Donate form fields */
  get donate() { return this.donateForm.controls; }

  public sendPay() {
    this.submitted = true;
    if (this.donateForm.valid) {
      
    }
  }

  public cancel() {
    this.submitted = false;
    this.donateForm.reset();
  }
  public showDonateForm() {
    this.donateFlag = !this.donateFlag;
  }
  ngOnInit() {
    this.causeDetail = JSON.parse(sessionStorage.getItem('causes'));
    console.log(this.causeDetail);
    this.createForm();
  }

}

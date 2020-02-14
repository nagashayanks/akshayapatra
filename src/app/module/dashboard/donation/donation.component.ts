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
  spinner = false;
  pdfFlag = false;
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

   /*  Send the payment Donator */
  public sendPay() {
    this.submitted = true;
    this.pdfFlag = false;
    if (this.donateForm.valid) {
      this.donateForm.value.schemeId = this.causeDetail.schemeId;
      this.donateForm.value.mobile = Number(this.donateForm.value.mobile);
      /* Api call*/
      this.api.postCall(this.url.urlConfig().donate, this.donateForm.value, 'post').subscribe(appointment => {
        if (appointment.statusCode === 200) {
          this.spinner = false;
          this.common.alertConfig = this.common.modalConfig(
            'Error', 'Thanks for your support. Please check your mail for tax benefit certificate',
            true, [{ name: 'Ok' }]
          );
          this.pdfFlag = true;
        } else {
          this.common.alertConfig = this.common.modalConfig(
            'Error', 'Sorry, There are some problems with your payment',
            true, [{ name: 'Ok' }]
          );
          this.spinner = false;
        }
      });
    }
  }

  /* Modal Action
  @param Ok modal has been closed
 */
  public modalAction(action: string): void {
    if (action === 'Ok') {
      this.spinner = false;
      this.common.alertConfigDefaultValue();
      this.pdfFlag = false;
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

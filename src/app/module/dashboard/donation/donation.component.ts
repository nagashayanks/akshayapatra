import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Cause } from 'src/app/model/model';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { CommonService } from 'src/app/service/common-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
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
  taxCertificate: any;
  viewFlag = false;
  @ViewChild('content', { static: false }) content: ElementRef;

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
    this.viewFlag = false;
    this.submitted = true;
    this.pdfFlag = false;
    if (this.donateForm.valid) {
      this.spinner = true;
      this.donateForm.value.schemeId = this.causeDetail.schemeId;
      this.donateForm.value.mobile = Number(this.donateForm.value.mobile);
      /* Api call*/
      this.api.postCall(this.url.urlConfig().donate, this.donateForm.value, 'post').subscribe(certificate => {
        if (certificate.statusCode === 200) {
          this.spinner = false;
          this.taxCertificate = certificate;
          this.common.alertConfig = this.common.modalConfig(
            'Error', 'Thanks for your support. Please check your mail for confirmation',
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
      this.cancel();
    }
  }

  public cancel() {
    this.submitted = false;
    this.donateForm.reset();
  }
  public showDonateForm() {
    this.donateFlag = !this.donateFlag;
  }
  viewPdf() {
    this.viewFlag = true;
    this.content.nativeElement.style.display = 'block';
  }
  public downloadPdf() {
    this.spinner = true;
    const node = this.content.nativeElement;
    let img;
    let filename;
    let newImage;
    domtoimage.toPng(node, { bgcolor: '#fff' })
      .then(dataUrl => {
        img = new Image();
        img.src = dataUrl;
        newImage = img.src;

        img.onload = () =>  {
          const pdfWidth = img.width;
          const pdfHeight = img.height;
          let doc;
          if (pdfWidth > pdfHeight) {
            doc = new jsPDF('l', 'px', [pdfWidth, pdfHeight]);
          } else {
            doc = new jsPDF('p', 'px', [pdfWidth, pdfHeight]);
          }
          const width = doc.internal.pageSize.getWidth();
          const height = doc.internal.pageSize.getHeight();
          doc.addImage(newImage, 'PNG', 10, 10, width, height);
          filename = 'mypdf_' + '.pdf';
          doc.save(filename);
        };
        this.spinner = false;
      })
      .catch( error => {
        // Error Handling
      });
  }
  ngOnInit() {
    this.causeDetail = JSON.parse(sessionStorage.getItem('causes'));
    this.createForm();
  }

}

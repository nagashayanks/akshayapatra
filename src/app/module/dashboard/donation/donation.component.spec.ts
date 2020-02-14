import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationComponent } from './donation.component';
import { SharedModuleModule } from 'src/app/shared/shared-module.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PrimeModule } from 'src/app/shared/primeng-module';
import { UrlConfig } from 'src/app/service/url-config';
import { Service } from 'src/app/service/service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('DonationComponent', () => {
  let component: DonationComponent;
  let fixture: ComponentFixture<DonationComponent>;
  let api: Service;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  const MockUserService = {
    modalConfig: () => ({
      header: '',
      message: '',
      modalShow: '',
      button: []
    }),
    alertConfigDefaultValue: () => ({
      header: '',
      message: '',
      modalShow: '',
      button: []
    }),
    postCall(url: string, data: any, type: string) {
      return of({
        userId: 123,
        name: 'abc',
        panNumber: 'PXER20009T',
        mobile: 9876543210,
        email: 'ta@gmail.com',
        paymentMode: 'PAYTM',
        date: '22-12-2023',
        schemeName: 'Hunger',
        description: 'hunger fund',
        amount: 12000.00,
        taxBenefitAmount: 1000,
        taxBenefitDescription: 'benefit allowed'
      });
    },
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DonationComponent],
      imports: [SharedModuleModule, HttpClientTestingModule, PrimeModule],
      providers: [{ provide: Router, Service, useValue: MockUserService, mockRouter }, UrlConfig]
    }).compileComponents();
    mockRouter = TestBed.get(Router);
    api = TestBed.get(Service);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should check modalAction', () => {
    const action =  'Ok';
    component.modalAction(action);
    expect(action).toEqual(action);
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { of } from 'rxjs';
import { PrimeModule } from 'src/app/shared/primeng-module';
import { SharedModuleModule } from 'src/app/shared/shared-module.module';
import { Service } from 'src/app/service/service';
import { Router } from '@angular/router';
import { UrlConfig } from 'src/app/service/url-config';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let api: Service;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  /* create mock data for testing */
  const MockUserService = {
    isValidUser: false,
    setValidUser: (flag: boolean) => { MockUserService.isValidUser = flag; },
    currentUser: {
      userName: 'Mani',
      userId: 1234
    },
    validUser: () => MockUserService.isValidUser,
    loggedUser: () => {
      return MockUserService.currentUser;
    },
    modalConfig: () => ({
      header: '',
      message: '',
      modalShow: '',
      button: ''
    }),
    alertConfigDefaultValue: () => ({
      header: '',
      message: '',
      modalShow: '',
      button: ''
    }),
    getList(url: string) {
      return of(
        [
          {
            schemeId: 1,
            schemeName: 'string',
            userName: 'string',
            paymentMode: 'string',
            date: '12',
            email: 'string'
          }
        ],
        [{
          schemeId: 1,
          name: 'String',
          y: 78
        }]
      );
    },
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PrimeModule, SharedModuleModule],
      declarations: [DashboardComponent],
      providers: [Service, { provide: Router, useValue: mockRouter },
        UrlConfig]
    })
      .compileComponents();
    mockRouter = TestBed.get(Router);
    api = TestBed.get(Service);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

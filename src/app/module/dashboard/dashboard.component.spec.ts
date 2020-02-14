import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModuleModule } from 'src/app/shared/shared-module.module';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { of } from 'rxjs';
import { PrimeModule } from 'src/app/shared/primeng-module';
import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let api: Service;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  const MockUserService = {
    getList(url: string) {
      return of([
        {
          schemeId: 1,
          schemeName: 'Hunger And Poverty',
          description: 'Donate to fight world',
          amount: 30000,
          taxBenefitAmount: 3000,
          taxBenefitDescription: 'section1',
          imageUrl: 'https://www.un.org/millenniumgoals/2015_MDG_Report/img/MDGs_Infographi'
        }
      ]);
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [SharedModuleModule, HttpClientTestingModule, PrimeModule],
      providers: [{ provide: Router, Service, useValue: MockUserService, mockRouter }, UrlConfig]
    }).compileComponents();
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

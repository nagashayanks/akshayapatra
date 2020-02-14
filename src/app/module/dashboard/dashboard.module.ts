import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DonationComponent } from './donation/donation.component';
import { SharedModuleModule } from 'src/app/shared/shared-module.module';


@NgModule({
  declarations: [DashboardComponent, DonationComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModuleModule
  ]
})
export class DashboardModule { }

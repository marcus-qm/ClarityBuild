import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import {NgxFsModule} from 'ngx-fs';
import { NgxElectronModule } from 'ngx-electron';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddDayComponent } from './add-day/add-day.component';
import { NavComponent } from './shared/nav/nav.component';
import { AccountComponent } from './account/account.component';
import { QuickviewComponent } from './home/quickview/quickview.component';
import { Step1Component } from './home/daycloseoutmdal/step1/step1.component';
import { Step2Component } from './home/daycloseoutmdal/step2/step2.component';
import { OverviewComponent } from './home/daycloseoutmdal/overview/overview.component';
import { LogsComponent } from './logs/logs.component';
import { ChartComponent } from './home/quickview/chart/chart.component';
import { ProfileComponent } from './account/profile/profile.component';
import { DefaultsComponent } from './account/defaults/defaults.component';
import { EmployeesComponent } from './account/employees/employees.component';
import { ForecastComponent } from './forecast/forecast.component';
import { EntryinsightsComponent } from './forecast/entryinsights/entryinsights.component';
import { BusinessinsightsComponent } from './forecast/businessinsights/businessinsights.component';
import { CostinsightsComponent } from './forecast/costinsights/costinsights.component';
import { Step3EditComponent } from './home/editentry/step3/step3.component';
import { Step2EditComponent } from './home/editentry/step2/step2.component';
import { Step1EditComponent } from './home/editentry/step1/step1.component';
import { HelpComponent } from './help/help.component';
import { InventoryComponent } from './account/inventory/inventory.component';
import { SetupComponent } from './setup/setup.component';

import { SetupProfileComponent } from './setup/profile/profile.component';
import { SetupDefaultsComponent } from './setup/defaults/defaults.component';
import { SetupEmployeesComponent } from './setup/employees/employees.component';
import { SetupInventoryComponent } from "./setup/inventory/inventory.component";

@NgModule({
  declarations: [
    SetupProfileComponent,
    SetupDefaultsComponent,
    SetupEmployeesComponent,
    SetupInventoryComponent,
    AppComponent,
    HomeComponent,
    AddDayComponent,
    NavComponent,
    AccountComponent,
    QuickviewComponent,
    Step1Component,
    Step2Component,
    OverviewComponent,
    LogsComponent,
    ChartComponent,
    ProfileComponent,
    DefaultsComponent,
    EmployeesComponent,
    ForecastComponent,
    EntryinsightsComponent,
    BusinessinsightsComponent,
    CostinsightsComponent,
    Step3EditComponent,
    Step2EditComponent,
    Step1EditComponent,
    HelpComponent,
    InventoryComponent,
    SetupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxFsModule,
    NgxElectronModule
        
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

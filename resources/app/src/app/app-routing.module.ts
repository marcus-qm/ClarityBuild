import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/home/home.component';
import { AddDayComponent } from '../app/add-day/add-day.component';
import { AccountComponent } from '../app/account/account.component';
import { LogsComponent } from '../app/logs/logs.component';
import { ForecastComponent } from "../app/forecast/forecast.component";
import { ProfileComponent } from '../app/account/profile/profile.component';
import { DefaultsComponent } from "../app/account/defaults/defaults.component";
import { EmployeesComponent } from "../app/account/employees/employees.component";
import { BusinessinsightsComponent } from "../app/forecast/businessinsights/businessinsights.component";
import { CostinsightsComponent } from "../app/forecast/costinsights/costinsights.component";
import { EntryinsightsComponent } from "../app/forecast/entryinsights/entryinsights.component";
import { InventoryComponent } from "../app/account/inventory/inventory.component";
import { SetupComponent } from "../app/setup/setup.component";

const routes: Routes = [
  {
    path: 'account',
    component: AccountComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      {
        path: 'profile',
        component: ProfileComponent
      }
      , {
        path: 'defaults',
        component: DefaultsComponent
      }, {
        path: 'employees',
        component: EmployeesComponent
      }, {
        path: 'inventory',
        component: InventoryComponent
      }
    ]
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'add',
    component: AddDayComponent
  },
  {
    path: 'logs',
    component: LogsComponent,
  },
  {
    path: 'forecast',
    component: ForecastComponent,
    children: [
      { path: '', redirectTo: 'entry', pathMatch: 'full' },
      {
        path: 'entry',
        component: EntryinsightsComponent
      }
      , {
        path: 'business',
        component: BusinessinsightsComponent
      }, {
        path: 'cost',
        component: CostinsightsComponent
      }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

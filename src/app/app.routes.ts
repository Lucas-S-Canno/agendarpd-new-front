import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }     from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewEventComponent } from './components/new-event/new-event.component';
import { MyEventsComponent } from './components/my-events/my-events.component';

export const routes: Routes = [
  { path: '',         redirectTo: 'dashboard',    pathMatch: 'full' },
  { path: 'login',    component: LoginComponent },
  { path: 'dashboard',component: DashboardComponent },
  { path: 'novo-evento', component: NewEventComponent },
  { path: 'meus-eventos', component: MyEventsComponent },
  { path: '**',       redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'

import { SignupComponent } from './signup/signup.component'
import { SigninComponent } from './signin/signin.component'
import { PayrollComponent } from './payroll/payroll.component'
import { StaffComponent } from './staff/staff.component'
import { TeamComponent } from './team/team.component'
import { ProfileComponent } from './profile/profile.component'
import { DetailComponent } from './detail/detail.component'
import { NavigatorComponent } from './navigator/navigator.component'

import { AuthGuard } from './guards/auth.guard'
import { RoleGuard } from './guards/role.guard'

const routes: Routes = [
  {
    path: '',
    component: NavigatorComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        // canActivate: [AuthGuard],
        component: HomeComponent
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        component: ProfileComponent
      },
      {
        path: 'payroll',
        canActivate: [AuthGuard],
        component: PayrollComponent
      },
      {
        path: 'staff',
        component: StaffComponent,
        canActivate: [RoleGuard],
        data: { roles: ['manager', 'hr'] }
      },
      {
        path: 'team',
        component: TeamComponent,
        canActivate: [RoleGuard],
        data: { roles: ['manager', 'hr'] }
      },
      {
        path: 'team/:name',
        component: DetailComponent
      },
    ]
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

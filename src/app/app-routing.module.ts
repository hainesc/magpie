import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { SignupComponent } from './signup/signup.component'
import { SigninComponent } from './signin/signin.component'
import { ManagerComponent } from './manager/manager.component'
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
        canActivate: [AuthGuard],
        component: HomeComponent
      },
      {
        path: 'manager',
        canActivate: [AuthGuard],
        component: ManagerComponent
      }
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

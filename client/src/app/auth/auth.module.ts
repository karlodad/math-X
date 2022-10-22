import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import AuthComponent from './auth.component';
import LoginComponent from './login/login.component';
import RegistrationComponent from './registration/registration.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'registration',
        component: RegistrationComponent,
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
];

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegistrationComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export default class AuthModule {}

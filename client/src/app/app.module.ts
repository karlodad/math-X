import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import AppComponent from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ru_RU } from 'ng-zorro-antd/i18n';
import { NzMessageService } from 'ng-zorro-antd/message';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/auth.Interceptor';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthGuard } from './guards/auth.guard';

registerLocaleData(ru);

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.default),
    canActivate: [NoAuthGuard],
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, OverlayModule, RouterModule.forRoot(routes), HttpClientModule, BrowserAnimationsModule],
  providers: [
    NzMessageService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: NZ_I18N, useValue: ru_RU },
  ],
  bootstrap: [AppComponent],
})
export default class AppModule {}

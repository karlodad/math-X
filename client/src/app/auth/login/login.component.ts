import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  isLoading$ = new BehaviorSubject<boolean>(false);
  errorMessage$ = new BehaviorSubject<string>('');

  formLogin: FormGroup;

  constructor(private msg: NzMessageService, private authService: AuthService, private router: Router) {
    this.formLogin = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  async submitForm() {
    try {
      this.isLoading$.next(true), this.errorMessage$.next('');
      await this.authService.login(this.formLogin.getRawValue());
      this.router.navigate(['/main']);
    } catch (error: any) {
      this.msg.error(error?.error?.message ?? error?.error?.message ?? error);
      this.errorMessage$.next(error?.error?.message ?? error?.error?.message ?? error);
      console.error(error);
    } finally {
      this.isLoading$.next(false);
    }
  }
}

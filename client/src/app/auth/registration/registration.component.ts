import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegistrationComponent {
  isLoading$ = new BehaviorSubject<boolean>(false);
  errorMessage$ = new BehaviorSubject<string>('');

  formRegistration: FormGroup;

  constructor(private msg: NzMessageService, private authService: AuthService, private router: Router) {
    this.formRegistration = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  async submitForm() {
    try {
      this.isLoading$.next(true), this.errorMessage$.next('');
      await this.authService.registration(this.formRegistration.getRawValue());
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

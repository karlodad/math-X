import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MenuComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  refreshToken() {
    this.authService.refreshToken();
  }
  logout() {
    this.authService.logout();
  }
}

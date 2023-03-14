import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-main',
  template: `
    <div class="content">
      <div class="actions">
        <button nz-button nzType="primary" title="Профиль" disabled>
          <i nz-icon nzType="user" nzTheme="outline"></i>
        </button>
        <button nz-button nzType="dashed" title="Выйти" (click)="logout()">
          <i nz-icon nzType="logout" nzTheme="outline"></i>
        </button>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      :host {
        background-image: url(/assets/images/background.png);
        height: 100%;
        width: 100%;
        position: fixed;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .content {
        border-radius: 10px;
        border: 5px solid #76a1af;
        box-shadow: 1px -1px 2px 1px #6e6e6e;
        max-width: 100%;
        width: 400px;
        max-height: 100%;
        overflow: auto;
        padding: 10px;
        background: #ced8e152;
        position: relative;
      }
      .actions {
        position: absolute;
        top: 0;
        right: 0;
        padding: 10px;
      }
      .actions > * + * {
        margin-left: 5px;
      }
    `,
  ],
  providers: [SocketService],
})
export default class MainComponent implements OnInit {
  constructor(private readonly authService: AuthService, private readonly socket: SocketService) {}

  ngOnInit(): void {
    // TODO: load user info
  }

  logout() {
    this.authService.logout();
  }
}

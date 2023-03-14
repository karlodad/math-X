import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, interval, Subscription } from 'rxjs';
import { User } from '../auth/models/user.model';

export type ReturnUserTokens = { refreshToken: string; accessToken: string; datalife: string };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: User | null = null;
  private tokens: ReturnUserTokens | null = null;
  private sub: Subscription | null = null;
  private readonly LOCAL_STORAGE_NAME = 'auth-settings';

  constructor(private httpClient: HttpClient, private router: Router) {}

  async login(user: User): Promise<void> {
    const tokens = this.getTokens();
    if (tokens) {
      throw new Error('Пользователь уже авторизован!');
    }
    const answer = await firstValueFrom(
      this.httpClient.post<ReturnUserTokens>('http://localhost:4000/user/login', user),
    );
    this.saveTokens(answer);
    this.user = user;
    this.startWatchRefreshToken();
  }

  async registration(user: User): Promise<void> {
    const tokens = this.getTokens();
    if (tokens) {
      throw new Error('Пользователь уже авторизован!');
    }
    const answer = await firstValueFrom(
      this.httpClient.post<ReturnUserTokens>('http://localhost:4000/user/signup', user),
    );
    this.saveTokens(answer);
    this.user = user;
    this.startWatchRefreshToken();
  }

  async logout() {
    const tokens = this.getTokens();
    if (!tokens) {
      throw new Error('Пользователь не авторизован!');
    }
    try {
      await firstValueFrom(this.httpClient.post<void>('http://localhost:4000/user/logout', {}));
    } catch {}
    this.clearToken();
    this.stopWatchRefreshToken();
    this.router.navigate(['/auth']);
  }

  public startWatchRefreshToken() {
    console.log('start watch auth');
    const tokens = this.getTokens();
    if (!tokens) {
      return this.stopWatchRefreshToken();
    }
    if (this.sub) {
      this.stopWatchRefreshToken();
    }
    const future = new Date(tokens.datalife).getTime();
    const current = new Date().getTime();
    const fullMinute = (future - current) / 1000 / 60;
    const refreshMinute = (fullMinute * 80) / 100;
    this.sub = interval(Math.round(refreshMinute * 60 * 1000)).subscribe((e) => this.refreshToken());
  }

  public stopWatchRefreshToken() {
    console.log('stop watch token');
    this.sub?.unsubscribe();
    this.sub = null;
  }

  public async refreshToken() {
    console.log('refresh token');
    const tokens = this.getTokens();
    if (!tokens) {
      throw new Error('Пользователь не авторизован!');
    }
    try {
      this.stopWatchRefreshToken();
      const answer = await firstValueFrom(
        this.httpClient.post<ReturnUserTokens>('http://localhost:4000/user/refresh', {
          refreshToken: tokens.refreshToken,
        }),
      );
      this.saveTokens(answer);
      this.startWatchRefreshToken();
      console.warn('token update success', answer.datalife);
    } catch {
      console.warn('token refresh failed');
      this.stopWatchRefreshToken();
      this.logout();
    }
  }

  public getTokens(): ReturnUserTokens | null {
    try {
      if (this.tokens) {
        return this.tokens;
      }
      const token = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_NAME) ?? '');
      return (this.tokens = token);
    } catch {
      return null;
    }
  }

  private saveTokens(token: ReturnUserTokens): ReturnUserTokens {
    localStorage.setItem(this.LOCAL_STORAGE_NAME, JSON.stringify(token));
    return (this.tokens = token);
  }

  private clearToken() {
    localStorage.removeItem(this.LOCAL_STORAGE_NAME);
    this.tokens = null;
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { APP_CONFIG } from '../../environments/app-config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authenticatedSubject = new BehaviorSubject<boolean>(false);
  readonly isAuthenticated$ = this.authenticatedSubject.asObservable();

  private readonly config = APP_CONFIG.cloudflare;

  constructor() {
    this.updateAuthState();
  }

  isAuthenticated(): boolean {
    if (this.isDevMode() && this.hasDevAuthOverride()) {
      return true;
    }
    const token = this.getCookie(this.config.cookieName);
    return !!token && !this.isTokenExpired();
  }

  getTokenExpiry(): Date | null {
    const token = this.getCookie(this.config.cookieName);
    if (!token) return null;

    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      const payload = JSON.parse(atob(parts[1]));
      if (!payload.exp) return null;

      return new Date(payload.exp * 1000);
    } catch {
      return null;
    }
  }

  isTokenExpired(): boolean {
    const expiry = this.getTokenExpiry();
    if (!expiry) return true;
    return expiry.getTime() < Date.now();
  }

  login(): void {
    const redirectUrl = encodeURIComponent(this.config.postLoginRedirectUrl);
    window.location.href = `${this.config.loginUrl}?redirect_url=${redirectUrl}`;
  }

  logout(): void {
    if (this.isDevMode()) {
      localStorage.removeItem('dev_auth_override');
    }
    this.clearCookie(this.config.cookieName);
    this.updateAuthState();
  }

  toggleDevAuth(): void {
    if (!this.isDevMode()) return;

    if (this.hasDevAuthOverride()) {
      localStorage.removeItem('dev_auth_override');
    } else {
      localStorage.setItem('dev_auth_override', 'true');
    }
    this.updateAuthState();
  }

  isDevMode(): boolean {
    const hostname = window.location.hostname;
    return hostname === 'localhost' || hostname === '127.0.0.1';
  }

  private hasDevAuthOverride(): boolean {
    return localStorage.getItem('dev_auth_override') === 'true';
  }

  private updateAuthState(): void {
    this.authenticatedSubject.next(this.isAuthenticated());
  }

  private getCookie(name: string): string | null {
    const match = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`));
    return match ? match.split('=').slice(1).join('=') : null;
  }

  private clearCookie(name: string): void {
    document.cookie = `${name}=; path=/; domain=.kasperda.dk; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}

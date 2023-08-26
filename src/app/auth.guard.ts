import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalstorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorage: LocalstorageService
  ) {}
  canActivate(): boolean {
    let user = this.localStorage.getItem('user');
    if (!user) {
      this.router.navigateByUrl('/login');
      return false;
    } else {
      return true;
    }
  }
}

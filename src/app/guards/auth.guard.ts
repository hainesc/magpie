import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookie: CookieService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    try {
      if (this.cookie.check("BID")) {
        let token = this.cookie.get('BID')
        let payload = token.split('.')[1]
        let decoded = atob(payload)
        let claims: any = JSON.parse(decoded)
        if (claims.hasOwnProperty('exp')) {
          const date = new Date(0)
          date.setUTCSeconds(claims.exp)
          if (date.valueOf() > new Date().valueOf()) {
            return claims.hasOwnProperty('name')
          }
        }
      }
    } catch (e) {
      // Catch all exception here and do nothing.
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}


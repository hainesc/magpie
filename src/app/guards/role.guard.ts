import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private cookie: CookieService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let role = next.data["role"] as string;
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
            if (claims.hasOwnProperty('groups')) {
              // if role in groups return true
              let groups = claims.groups as Array<string>;
              return groups.indexOf(role) > -1
            }
          }
        }
      }
    } catch (e) {

    }
    this.router.navigate(['/page404'])
    return false
  }
}

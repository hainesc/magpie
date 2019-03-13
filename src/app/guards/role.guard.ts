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

    let roles = next.data["roles"] as Array<string>
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
              // if one of roles in groups return true
              let groups = claims.groups as Array<string>
              console.log(groups)
              for (let role of roles) {
                if (groups.indexOf(role) > -1) {
                  return true
                }
              }
            }
          } else {
            // token is expired
            this.router.navigate(['/signin'])
            return false
          }
        }
      } else {
        this.router.navigate(['/signin'])
        return false
      }
    } catch (e) {
      console.log(e)
    }
    console.log(roles)
    this.router.navigate(['/page404'])
    return false
  }
}

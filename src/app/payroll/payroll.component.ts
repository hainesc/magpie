import { Component, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss']
})
export class PayrollComponent implements OnInit {

  role = (() => {
    let groups = (JSON.parse(atob(this.cookie.get('BID').split('.')[1]))).groups as Array<string>
    if (groups.indexOf('hr') > -1) {
      return 'hr'

    }
    if (groups.indexOf('manager') > -1) {
      return 'manager'
    }
    return 'staff'
  })()

  constructor(private cookie: CookieService) { }

  ngOnInit() {
    console.log(this.role)
  }

}

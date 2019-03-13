import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private staffUrl = 'api/staff'
  constructor(private http: HttpClient) { }

  getPersonalInfo(userName: string): Observable<Object> {
    return this.http.get<Object>(this.staffUrl)
      .pipe(
      )
  }

  updatePersonnalBankID(userName: string, newValue: Object): Observable<Object> {
    const options = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }

    return this.http.post<Object>(this.staffUrl, newValue, options)
      .pipe(
      )
  }

  updatePersonalBirthday(userName: string, newValue: Object): Observable<Object> {
    const options = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }

    return this.http.post<Object>(this.staffUrl, newValue, options)
      .pipe(
      )
  }

  updatePersonalAddress(userName: string, newValue: Object): Observable<Object> {
    const options = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }

    return this.http.post<Object>(this.staffUrl, newValue, options)
      .pipe(
      )

  }
}

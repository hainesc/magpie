import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signUpURL = 'http://localhost:8090/api/signup'
  signInURL = 'http://localhost:8090/api/signin'

  constructor(private http: HttpClient) { }

  signup(signupForm): Observable<Object> {
    const options = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    console.log(signupForm)
    return this.http.post(this.signUpURL, signupForm, options)
  }

  signin(signinForm): Observable<Object> {
    const options = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    console.log(signinForm)
    return this.http.post(this.signInURL, signinForm, options)
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.signinForm.invalid) {
      return
    }
    console.log(this.signinForm.controls.user.value)
    console.log(this.signinForm.controls.password.value)

    this.authService.signin(this.signinForm.value)
      .subscribe(
        (resp: Response) => {
          console.log(resp)
          if (resp instanceof HttpErrorResponse) {
            console.log("Error response")
            this.snackBar.open('Sign in failed', '', { duration: 2000 });

          } else {
            console.log("Success response")
            this.snackBar.open('Sign in success', '', { duration: 2000 });
            this.router.navigate(['']);
          }
        },

        err => {
          this.snackBar.open('Sign in failed', '', { duration: 2000 });
          console.log(err)
        }

      )
  }
}

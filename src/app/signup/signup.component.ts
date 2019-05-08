import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MatSnackBar } from '@angular/material';
import { AuthService } from "../services/auth.service";

export class SignupErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  matcher = new SignupErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      user: ['', Validators.compose(
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20)
        ]
      )],
      email: ['', Validators.compose(
        [
          Validators.required,
          Validators.email
        ]
      )],
      password: ['', Validators.compose(
        [
          Validators.required,
          // TODO: password strength.
          // Validators.pattern('(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}'),
          Validators.minLength(5),
        ]
      )],
      confirm: ['', Validators.required]
    }, { validator: this.confirmValidator })
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return
    }
    this.authService.signup(this.signupForm.value)
      .subscribe(
        (resp: Response) => {
          console.log(resp)
          if (resp instanceof HttpErrorResponse) {
            console.log("Error response")
            this.snackBar.open('Sign up failed', '', { duration: 2000 });
          } else {
            console.log("Success response")
            this.snackBar.open('Sign up success', '', { duration: 2000 });
            this.router.navigate(['/signin']);
          }
        },
        err => {
          this.snackBar.open('Sign up failed', '', { duration: 2000 });
          console.log(err)
        }
      )
  }

  confirmValidator(group: FormGroup) { // here we have the 'passwords' group
    let password = group.controls.password.value;
    let confirm = group.controls.confirm.value;
    return password === confirm ? null : { diff: true }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  showPassword = false;
  emailExists = false;
  constructor(
    public formBuilder: FormBuilder,
    public userService: UserService,
    public router: Router,
    public authService: AuthService,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      fname: [null, Validators.compose([Validators.required, Validators.pattern(/[a-zA-Z]{1,30}/)])],
      mname: [null, Validators.compose([Validators.pattern(/[a-zA-Z]{1,30}/)])],
      lname: [null, Validators.compose([Validators.required, Validators.pattern(/[a-zA-Z]{1,30}/)])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required])],
      mobile: [null, Validators.compose([Validators.required, Validators.pattern(/[0-9]{10,12}/)])],
    });
  }

  /**
   * To sign up user
   */
  signUp() {
    this.emailExists = false;
    if (this.signUpForm.valid) {
        this.spinner.show();
        this.userService.addUser(this.signUpForm.value).subscribe((token: any) => {
          console.log(token);
          if (token && token.message) {
                this.emailExists = true;
          } else {
            const obj = this.signUpForm.value;
            obj.token = token.token;
            obj.type = 'connect';
            this.authService.sendToken(JSON.stringify(obj));
            this.router.navigate(['/chat']);
            this.spinner.hide();
          }
        }, err => {
          console.log(err.message);
          this.spinner.hide();
        });
    }
  }
  login() {
    this.router.navigate(['']);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logInForm: FormGroup;
  error: any;
  constructor(
    public formBuilder: FormBuilder,
    public userService: UserService,
    public authService: AuthService,
    public router: Router,
    public spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.logInForm = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required])],
    });
  }

  /**
   * To login user
   */
  login() {
    this.error = null;
    if (this.logInForm.valid) {
      this.spinner.show();
      this.userService.loginUser(this.logInForm.value).subscribe((data: any) => {
        console.log(data);
        data.type = 'connect';
        this.authService.sendToken(JSON.stringify(data));
        this.router.navigate(['/chat']);
        this.spinner.hide();
      }, err => {
          this.error = err;
          this.spinner.hide();
      });
    }
  }

  /**
   * To navigate signup page
   */
  signUp() {
    this.router.navigate(['/signup']);
  }
}

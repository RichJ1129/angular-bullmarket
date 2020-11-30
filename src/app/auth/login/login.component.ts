import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, NgForm, Validators} from '@angular/forms';

import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit, OnDestroy{
  isLoading = false;
  private authStatusSub: Subscription;

  loginForm: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor(private formBuilder: FormBuilder, public authService: AuthService) {
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      userName: [null, Validators.required]
    });
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  // onLogin(form: ) {
  //   if (form.invalid) {
  //     return;
  //   }
  //   this.isLoading = true;
  //   this.authService.login(form.value.email, form.value.password);
  // }

  // tslint:disable-next-line:typedef
  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(this.loginForm.value.userName, this.loginForm.value.email);
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}

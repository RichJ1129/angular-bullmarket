import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  isLoading = false;

  signUpForm: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  constructor(private formBuilder: FormBuilder, public authService: AuthService) {}

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required],
      first_name: [null, Validators.required],
      last_name: [null, Validators.required]
    });
  }

  // tslint:disable-next-line:typedef
  register() {
    if (!this.signUpForm.valid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(this.signUpForm.value.email, this.signUpForm.value.password);;
  }
}

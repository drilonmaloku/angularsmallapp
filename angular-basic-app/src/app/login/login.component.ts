import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl, FormGroup,Validators } from "@angular/forms";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";
import Swal from 'sweetalert2';

import { AuthenticationService } from "../_services/authentication.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: ['',
          [
            Validators.required,
            Validators.email
          ]
        ],
        password: [
          '',
          [
            Validators.required
          ]
        ],
      }
    );
  }
  get f(){
    return this.loginForm.controls;
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['']);
        },
        error => {
          Swal.fire('Oops', 'The Credentials are not correct', 'error');
        });
  }

}

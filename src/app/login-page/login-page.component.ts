import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  hide = true;
  isLoading = false;
  error: string = null;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit( form: NgForm ) {
    if( !form.valid ) return;
    this.isLoading = true;
    const username = form.value.username;
    const password = form.value.password;
    this.auth
      .login( username, password )
      .subscribe( 
        authData => {
          this.router.navigate(['/posts'])
          this.isLoading = false;
          form.reset();
        },
        errorMsg => {
          //errorMsg got from auth.service.ts
          this.error = errorMsg;
          this.isLoading = false;
        }
      );
  }
}

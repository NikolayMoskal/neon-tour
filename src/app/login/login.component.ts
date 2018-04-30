import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../service/auth.service';
import {Jwt} from '../model/jwt';
import {Title} from '@angular/platform-browser';

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';

  constructor(private router: Router,
              private authService: AuthService,
              private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Вход на сайт');
    this.authService.logout();
  }

  login() {
    this.loading = true;
    this.authService.login(this.model.username, this.model.password)
      .subscribe(
        (result: Jwt) => {
          if (result) {
            localStorage.setItem('currentUser', JSON.stringify({
              username: this.model.username,
              token: result.token,
              roles: result.role,
              date: new Date().toString()
            }));
            // login successful
            this.router.navigate(['/']);
          } else {
            // login failed
            this.error = 'Username or password is incorrect';
            this.loading = false;
          }
        }, error => {
          this.loading = false;
          this.error = error;
        }
      );
  }
}

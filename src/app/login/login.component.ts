import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../service/auth.service';
import {Jwt} from '../model/jwt';
import {Title} from '@angular/platform-browser';
import {AppConfig} from '../app.config';

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
              private titleService: Title,
              private config: AppConfig) {
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
            this.config.showAdmin(this.authService.hasRole('ROLE_ADMIN'));
            this.config.showPrivateRoom(this.authService.hasRole('ROLE_USER'));
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

  compareArrays(roles: string[], role: string): boolean {
    for (let item of roles) {
      if (item === role) {
        return true;
      }
    }
    return false;
  }
}

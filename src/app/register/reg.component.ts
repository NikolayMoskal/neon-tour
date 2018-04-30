import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {RegService} from '../service/reg.service';
import {Router} from '@angular/router';
import {Jwt} from '../model/jwt';

@Component({
  moduleId: module.id,
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';

  constructor(private titleService: Title,
              private regService: RegService,
              private router: Router) {
  }

  ngOnInit() {
    this.titleService.setTitle('Регистрация');
  }

  signUp() {
    this.loading = true;
    if (this.model.password !== this.model.dblpassword) {
      this.error = 'Пароли не совпадают';
      this.loading = false;
      return;
    }
    this.regService.signUp(
      this.model.first,
      this.model.last,
      this.model.email,
      this.model.birthdate,
      this.model.username,
      this.model.password)
      .subscribe((result: Jwt) => {
        this.router.navigate(['/']);
      }, error => {
        this.loading = false;
        this.error = error;
      });
  }
}

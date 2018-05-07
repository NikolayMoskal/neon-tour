import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {AppConfig} from '../app.config';

@Component({
  moduleId: module.id,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedInAdmin = true;
  isLoggedInUser = true;

  constructor(private authService: AuthService,
              private config: AppConfig) {
  }

  ngOnInit() {
    this.config.SHOW_ADMIN.subscribe(message => this.isLoggedInAdmin = message);
    this.config.SHOW_PRIVATE_ROOM.subscribe(message => this.isLoggedInUser = message);
    this.isLoggedInAdmin = this.authService.isLoggedIn() && this.authService.hasRole('ROLE_ADMIN');
    this.isLoggedInUser = this.authService.isLoggedIn() && this.authService.hasRole('ROLE_USER');
  }
}

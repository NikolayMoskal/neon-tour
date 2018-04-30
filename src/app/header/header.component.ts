import {Component} from '@angular/core';
import {AuthService} from '../service/auth.service';

@Component({
  moduleId: module.id,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn = false;

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn() && this.authService.hasRole('ROLE_ADMIN');
  }
}

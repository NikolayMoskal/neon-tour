import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user';

@Component({
  moduleId: module.id,
  templateUrl: './client.profile.component.html',
  styleUrls: ['./client.profile.component.css']
})
export class ClientProfileComponent implements OnInit {
  type = 'password'; // видимость пароля: text - видимый, password - скрытый
  currentUser: User; // текущий пользователь
  copy: User;
  errName = ''; // ошибки
  errPassword = '';
  errConfirm = '';
  confirmPassword = ''; // подтверждение пароля

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      (data: User[]) => {
        const json = localStorage.getItem('currentUser');
        const user = json ? JSON.parse(json) : null;
        this.currentUser = data.find(value => value.username = user.username);
        this.copy = Object.assign(new User(), this.currentUser);
      }
    );
  }

  clearErrors(): void {
    this.errName = '';
    this.errPassword = '';
  }

  submitChanges(): void {
    this.clearErrors();
    if (this.currentUser.username === '') {
      this.errName = 'Имя пользователя не может быть пустым';
      return;
    }
    if (this.currentUser.username.length < 4) {
      this.errName = 'Имя пользователя слишком короткое';
      return;
    }
    if (this.currentUser.username.length > 15) {
      this.errName = 'Имя пользователя слишком длинное';
    }
    if (!/^[A-Za-z].*/.test(this.currentUser.username)) {
      this.errName = 'Имя пользователя должно начинаться с буквы';
      return;
    }
    if (this.currentUser.password === '') {
      this.errPassword = 'Пароль не может быть пустым';
      return;
    }
    if (this.currentUser.password.length < 8) {
      this.errPassword = 'Пароль слишком короткий';
      return;
    }
    if (this.currentUser.password.length > 20) {
      this.errPassword = 'Пароль слишком длинный';
      return;
    }
    if (this.confirmPassword === '') {
      this.errConfirm = 'Подтвердите введенный пароль';
      return;
    }
    if (this.currentUser.password !== this.confirmPassword) {
      this.errConfirm = 'Пароли не совпадают';
      return;
    }
    this.userService.updateUser(this.currentUser).subscribe();
  }

  showPassword(isChecked): void {
    isChecked ? this.type = 'text' : this.type = 'password';
  }

  rejectChanges(): void {
    this.currentUser = Object.assign(this.currentUser, this.copy);
  }
}

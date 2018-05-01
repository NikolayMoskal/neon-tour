import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user';

@Component({
  moduleId: module.id,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {
  users: User[]; // массив пользователей
  currentUser: User; // текущий выбранный юзер
  birthDate: string; // дата рождения (из timestamp)
  username = ''; // имя юзера
  isEnabled = false; // активность юзера
  userpass = ''; // пароль
  confirmPassword = ''; // подтверждение пароля
  isVisibleUserInfo = false; // флаг видимости информации юзера
  isChanges = false; // режим изменения данных юзера
  usernameError = ''; // ошибки
  passwordError = '';
  confirmPasswordError = '';
  type = 'password';

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        for (let index = 0; index < this.users.length; index++) {
          this.users[index].client.birthDate = new Date(+this.users[index].client.birthDate);
          const date = this.users[index].client.birthDate;
          date.setHours(date.getHours() + -date.getTimezoneOffset() / 60);
          this.users[index].client.birthDate = date;
        }
        this.switchUser('1');
      }
    );
  }

  switchUser(id): void {
    this.isVisibleUserInfo = true;
    this.currentUser = this.users.find(value => value.id === parseInt(id, 0));
    this.birthDate = this.currentUser.client.birthDate.toISOString().substring(0, 10);
    this.username = this.currentUser.username;
    this.userpass = this.currentUser.password;
    this.isEnabled = this.currentUser.enabled;
  }

  switchChecked(): void {
    this.isEnabled = !this.isEnabled;
  }

  changeUserInfo(): void {
    this.isChanges = true;
  }

  submitChanges(): void {
    this.clearErrors();
    if (this.currentUser.username === '') {
      this.usernameError = 'Имя пользователя не может быть пустым';
      return;
    }
    if (this.currentUser.username.length < 4) {
      this.usernameError = 'Имя пользователя слишком короткое';
      return;
    }
    if (this.currentUser.username.length > 15) {
      this.usernameError = 'Имя пользователя слишком длинное';
    }
    if (!/^[A-Za-z].+/.test(this.currentUser.username)) {
      this.usernameError = 'Имя пользователя должно начинаться с буквы';
      return;
    }
    if (this.currentUser.password === '') {
      this.passwordError = 'Пароль не может быть пустым';
      return;
    }
    if (this.currentUser.password.length < 8) {
      this.passwordError = 'Пароль слишком короткий';
      return;
    }
    if (this.currentUser.password.length > 20) {
      this.passwordError = 'Пароль слишком длинный';
      return;
    }
    if (this.confirmPassword === '') {
      this.confirmPasswordError = 'Подтвердите введенный пароль';
      return;
    }
    if (this.currentUser.password !== this.confirmPassword) {
      this.confirmPasswordError = 'Пароли не совпадают';
      return;
    }
    this.currentUser.username = this.username;
    this.currentUser.password = this.userpass;
    this.currentUser.enabled = this.isEnabled;
    this.userService.updateUser(this.currentUser).subscribe(
      (data: User) => {
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].id === data.id) {
            this.users[i] = data;
            break;
          }
        }
      }
    );
  }

  clearErrors(): void {
    this.usernameError = '';
    this.passwordError = '';
    this.confirmPasswordError = '';
  }

  rejectChanges(): void {
    this.clearErrors();
    this.username = this.currentUser.username;
    this.userpass = this.currentUser.password;
    this.isEnabled = this.currentUser.enabled;
    this.confirmPassword = '';
    this.isChanges = false;
  }

  showPassword(isChecked): void {
    isChecked ? this.type = 'text' : this.type = 'password';
  }

  deleteUserInfo(): void {
    const index = this.users.indexOf(this.currentUser);
    if (index > -1) {
      this.users.splice(index, 1);
    }
    this.userService.deleteUser(this.currentUser.id).subscribe();
    this.currentUser = null;
    this.username = '';
    this.userpass = '';
    this.isEnabled = false;
    this.confirmPassword = '';
  }
}

import {Component} from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user';
import {Client} from '../../model/client';
import {ClientService} from '../../service/client.service';

@Component({
  moduleId: module.id,
  templateUrl: './client.data.component.html',
  styleUrls: ['./client.data.component.css']
})
export class ClientDataComponent {
  currentClient: Client; // текущий клиент
  currentUser: User; // текущий пользователь сайта
  birthDate = '';
  errFirstName = ''; // ошибки для каждого поля
  errLastName = '';
  errDate = '';
  errMail = '';

  constructor(private clientService: ClientService,
              private userService: UserService) {
    this.userService.getAllUsers().subscribe(
      (data: User[]) => {
        const json = localStorage.getItem('currentUser');
        const user = json ? JSON.parse(json) : null;
        this.currentUser = data.find(value => value.username === user.username);
        this.currentClient = Object.assign(new Client(), this.currentUser.client);
        this.rejectChanges();
      }
    );
  }

  clearErrors(): void {
    this.errFirstName = '';
    this.errLastName = '';
    this.errDate = '';
    this.errMail = '';
  }

  submitChanges(): void {
    this.clearErrors();
    if (this.currentClient.firstName === '') {
      this.errFirstName = 'Имя не может быть пустым';
      return;
    }
    if (!/^[A-ZА-Я].*/.test(this.currentClient.firstName)) {
      this.errFirstName = 'Имя должно начинаться с заглавной буквы';
      return;
    }
    if (this.currentClient.lastName === '') {
      this.errLastName = 'Фамилия не может быть пустой';
      return;
    }
    if (!/^[A-ZА-Я].*/.test(this.currentClient.lastName)) {
      this.errLastName = 'Фамилия должна начинаться с заглавной буквы';
      return;
    }
    if (this.birthDate === '') {
      this.errDate = 'Установите дату рождения';
      return;
    }
    const regExp = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|' +
      '(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
    if (!regExp.test(this.currentClient.email)) {
      this.errMail = 'Проверьте правильность ввода e-mail адреса';
      return;
    }
    this.currentClient.birthDate = new Date(this.birthDate);
    this.clientService.updateClient(this.currentClient).subscribe();
  }

  rejectChanges(): void {
    this.currentClient = Object.assign(this.currentClient, this.currentUser.client);
    this.currentClient.birthDate = new Date(+this.currentClient.birthDate);
    const date = this.currentClient.birthDate;
    date.setHours(date.getHours() + -date.getTimezoneOffset() / 60);
    this.currentClient.birthDate = date;
    this.birthDate = this.currentClient.birthDate.toISOString().substring(0, 10);
  }
}

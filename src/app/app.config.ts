import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AppConfig {
  static readonly APP_SERVER_URL = 'http://localhost:8080/NeonTour';
  static readonly RSS_CHANNEL_URL = 'https://news.tut.by/rss/s~ex6604.rss';

  private showAdminMessageSource = new BehaviorSubject<boolean>(false);
  SHOW_ADMIN = this.showAdminMessageSource.asObservable();
  private showUserMessageSource = new BehaviorSubject<boolean>(false);
  SHOW_PRIVATE_ROOM = this.showUserMessageSource.asObservable();

  constructor() {
  }

  showAdmin(value: boolean): void {
    this.showAdminMessageSource.next(value);
  }

  showPrivateRoom(value: boolean): void {
    this.showUserMessageSource.next(value);
  }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConfig} from '../app.config';

@Injectable()
export class RegService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: HttpClient) {
  }

  signUp(firstName: string, lastName: string, email: string, birthDate: Date, username: string, password: string) {
    return this.http.post(AppConfig.APP_SERVER_URL + '/client/signup', JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      birthDate: (new Date(birthDate)).getTime(),
      username: username,
      password: password
    }), {headers: this.headers});
  }
}

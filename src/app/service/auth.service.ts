import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConfig} from '../app.config';

@Injectable()
export class AuthService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    return this.http.post(AppConfig.APP_SERVER_URL + '/login', JSON.stringify({
      username: username,
      password: password
    }), {headers: this.headers});
  }

  getToken(): string {
    const json = localStorage.getItem('currentUser');
    const currentUser = json ? JSON.parse(json) : null;
    // if the user is logged on this site then we return his JWT token
    return currentUser ? currentUser.token : '';
  }

  hasRole(role: string): boolean {
    const json = localStorage.getItem('currentUser');
    const currentUser = json ? JSON.parse(json) : null;
    const roles: string[] = currentUser ? currentUser.roles : '';
    let i: string;
    for (i of roles) {
      if (i === role) {
        return true;
      }
    }
    return false;
  }

  getDate(): Date {
    const json = localStorage.getItem('currentUser');
    const currentUser = json ? JSON.parse(json) : null;
    // return the login date
    return currentUser ? new Date(currentUser.date) : null;
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    const token: String = this.getToken();
    const ms: number = +new Date() - +this.getDate();
    // if no more than 10 minutes has passed after the login then return true
    return token && token.length > 0 && ms < 1000 * 60 * 60;
  }
}

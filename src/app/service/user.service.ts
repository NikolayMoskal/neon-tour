import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {User} from '../model/user';
import {AppConfig} from '../app.config';

@Injectable()
export class UserService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.authService.getToken()
  });

  constructor(private authService: AuthService,
              private http: HttpClient) {
  }

  getAllUsers(): Observable<any> {
    return this.http.get(AppConfig.APP_SERVER_URL + '/user/get/all', {headers: this.headers});
  }

  updateUser(updatedUser: User): Observable<any> {
    return this.http.put(AppConfig.APP_SERVER_URL + '/user/update', updatedUser, {headers: this.headers});
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(AppConfig.APP_SERVER_URL + '/user/delete?id=' + id, {headers: this.headers});
  }
}

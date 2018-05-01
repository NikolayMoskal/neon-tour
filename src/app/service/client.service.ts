import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import {AppConfig} from '../app.config';

@Injectable()
export class ClientService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.authService.getToken()
  });

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  getData(): Observable<any> {
    return this.http.get(AppConfig.APP_SERVER_URL, {headers: this.headers});
  }

  getClientList(): Observable<any> {
    return this.http.get(AppConfig.APP_SERVER_URL + '/client/get/all', {headers: this.headers});
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(AppConfig.APP_SERVER_URL + '/client/delete?id=' + id, {headers: this.headers});
  }
}

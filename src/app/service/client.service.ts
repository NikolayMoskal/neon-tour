import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import {AppConfig} from '../app.config';
import {Client} from '../model/client';

@Injectable()
export class ClientService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.authService.getToken()
  });

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  getClientList(): Observable<any> {
    return this.http.get(AppConfig.APP_SERVER_URL + '/client/get/all', {headers: this.headers});
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(AppConfig.APP_SERVER_URL + '/client/delete?id=' + id, {headers: this.headers});
  }

  updateClient(client: Client): Observable<any> {
    return this.http.put(AppConfig.APP_SERVER_URL + '/client/update', client, {headers: this.headers});
  }
}

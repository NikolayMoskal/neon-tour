import {Injectable} from '@angular/core';
import {Order} from '../model/order';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConfig} from '../app.config';
import {AuthService} from './auth.service';
import {Client} from '../model/client';

@Injectable()
export class OrderService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.authService.getToken()
  });

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  addOrder(order: Order): Observable<any> {
    return this.http.post(AppConfig.APP_SERVER_URL + '/client/orders/add', order, {headers: this.headers});
  }

  getAllOrders(client: Client): Observable<any> {
    return this.http.get(AppConfig.APP_SERVER_URL + '/client/orders/get?id=' + client.id, {headers: this.headers});
  }

  deleteOrder(order: Order): Observable<any> {
    return this.http.delete(AppConfig.APP_SERVER_URL + '/client/orders/delete?id=' + order.id, {headers: this.headers});
  }
}

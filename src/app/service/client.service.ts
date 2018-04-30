import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ClientService {
  private url = 'http://localhost:8080/NeonTour';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authService.getToken()
  });

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  getData(): Observable<any> {
    return this.http.get(this.url, {headers: this.headers});
  }
}

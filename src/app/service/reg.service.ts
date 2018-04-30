import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class RegService {
  private signUpUrl = 'http://localhost:8080/NeonTour/client/signup';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: HttpClient) {
  }

  signUp(firstName: string, lastName: string, email: string, birthdate: Date, username: string, password: string) {
    return this.http.post(this.signUpUrl, JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      birthdate: (new Date(birthdate)).getTime(),
      username: username,
      password: password
    }), {headers: this.headers});
  }
}

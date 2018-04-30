import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TourService {
  private url = 'http://localhost:8080/NeonTour/tour';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  getCityFrom(country: string): Observable<any> {
    return this.http.get(this.url + '/from/location?country=' + country, {headers: this.headers});
  }

  getCountriesFrom(): Observable<any> {
    return this.http.get(this.url + '/from/country', {headers: this.headers});
  }

  getCountriesTo(): Observable<any> {
    return this.http.get(this.url + '/to/country', {headers: this.headers});
  }

  getLocations(country: string): Observable<any> {
    return this.http.get(this.url + '/to/location?country=' + country, {headers: this.headers});
  }

  getCategories(): Observable<any> {
    return this.http.get(this.url + '/hotel/category', {headers: this.headers});
  }

  getHotels(category?: string, location?: string): Observable<any> {
    if (category && location) {
      return this.http.get(this.url + '/hotel/get?category=' + category + '&location=' + location, {headers: this.headers});
    } else {
      if (category) {
        return this.http.get(this.url + '/hotel/get?category=' + category, {headers: this.headers});
      } else if (location) {
        return this.http.get(this.url + '/hotel/get?location=' + location, {headers: this.headers});
      }
    }
  }
}

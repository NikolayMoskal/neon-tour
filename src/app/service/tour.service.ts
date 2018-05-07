import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AppConfig} from '../app.config';

@Injectable()
export class TourService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  getCityFrom(country?: string): Observable<any> {
    return this.http.get(AppConfig.APP_SERVER_URL + '/tour/from/location' + (country ? '?country=' + country : ''),
      {headers: this.headers});
  }

  getCountriesFrom(): Observable<any> {
    return this.http.get(AppConfig.APP_SERVER_URL + '/tour/from/country', {headers: this.headers});
  }

  getCountriesTo(): Observable<any> {
    return this.http.get(AppConfig.APP_SERVER_URL + '/tour/to/country', {headers: this.headers});
  }

  getLocations(country: string): Observable<any> {
    return this.http.get(AppConfig.APP_SERVER_URL + '/tour/to/location?country=' + country, {headers: this.headers});
  }

  getCategories(): Observable<any> {
    return this.http.get(AppConfig.APP_SERVER_URL + '/tour/hotel/category', {headers: this.headers});
  }

  getHotels(category?: string, location?: string): Observable<any> {
    if (category && location) {
      return this.http.get(AppConfig.APP_SERVER_URL + '/tour/hotel/get?category=' + category + '&location=' + location,
        {headers: this.headers});
    } else {
      if (category) {
        return this.http.get(AppConfig.APP_SERVER_URL + '/tour/hotel/get?category=' + category, {headers: this.headers});
      } else if (location) {
        return this.http.get(AppConfig.APP_SERVER_URL + '/tour/hotel/get?location=' + location, {headers: this.headers});
      }
    }
  }

  getCurrencyList(): Observable<any> {
    return this.http.get(AppConfig.APP_SERVER_URL + '/tour/currency/all', {headers: this.headers});
  }

  getTours(priceFrom?: number, priceTo?: number, dateFrom?: number, dateTo?: number, hotel?: string): Observable<any> {
    if (priceFrom && priceTo) {
      return this.http.get(AppConfig.APP_SERVER_URL + '/tour/get/price?from=' + priceFrom + '&to=' + priceTo, {headers: this.headers});
    } else {
      if (priceFrom) {
        return this.http.get(AppConfig.APP_SERVER_URL + '/tour/get/price?from=' + priceFrom, {headers: this.headers});
      }
      if (priceTo) {
        return this.http.get(AppConfig.APP_SERVER_URL + '/tour/get/price?to=' + priceTo, {headers: this.headers});
      }
    }
    if (dateFrom && dateTo) {
      return this.http.get(AppConfig.APP_SERVER_URL + '/tour/get/date?from=' + dateFrom + '&to=' + dateTo, {headers: this.headers});
    } else {
      if (priceFrom) {
        return this.http.get(AppConfig.APP_SERVER_URL + '/tour/get/date?from=' + dateFrom, {headers: this.headers});
      }
      if (priceTo) {
        return this.http.get(AppConfig.APP_SERVER_URL + '/tour/get/date?to=' + dateTo, {headers: this.headers});
      }
    }
    if (hotel) {
      return this.http.get(AppConfig.APP_SERVER_URL + '/tour/get?hotel=' + hotel, {headers: this.headers});
    }
  }
}

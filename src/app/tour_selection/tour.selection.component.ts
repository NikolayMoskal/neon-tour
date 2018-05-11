import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TourService} from '../service/tour.service';
import {CityFrom} from '../model/city.from';
import {CountryFrom} from '../model/country.from';
import {CountryTo} from '../model/country.to';
import {LocationTo} from '../model/location.to';
import {HotelCategory} from '../model/hotel.category';
import {Hotel} from '../model/hotel';
import {Currency} from '../model/currency';
import {Tour} from '../model/tour';
import {AuthService} from '../service/auth.service';
import {User} from '../model/user';
import {UserService} from '../service/user.service';
import {OrderService} from '../service/order.service';
import {Order} from '../model/order';
import {Client} from '../model/client';

@Component({
  moduleId: module.id,
  templateUrl: './tour.selection.component.html',
  styleUrls: ['./tour.selection.component.css'],
  providers: [TourService, OrderService]
})
export class TourSelectionComponent implements OnInit {
  currentUser: User;
  cities: CityFrom[];
  countryFrom: CountryFrom[];
  countryTo: CountryTo[];
  locations: LocationTo[];
  categories: HotelCategory[];
  currencyList: Currency[];
  hotels: Hotel[];
  tours: Tour[];
  locationId = '';
  categoryId = '';
  startDate: string;
  endDate: string;
  currentRate: string;
  priceFrom: number;
  priceTo: number;
  maxPriceFrom = '1';
  minPF = 1;
  minPriceFrom = '1';
  maxPF = 1;
  maxPriceTo = '1';
  minPT = 1;
  minPriceTo = '1';
  maxPT = 1;
  error = false;

  constructor(private titleService: Title,
              private tourService: TourService,
              private authService: AuthService,
              private userService: UserService,
              private orderService: OrderService) {
  }

  ngOnInit() {
    this.titleService.setTitle('Подбор тура - Neon Tour');
    this.tourService.getCountriesFrom().subscribe(
      (data: CountryFrom[]) => {
        this.countryFrom = data;
      }
    );
    this.tourService.getCityFrom().subscribe((list: CityFrom[]) => this.cities = list);
    this.tourService.getCountriesTo().subscribe(
      (data: CountryTo[]) => {
        this.countryTo = data;
        this.changeCountryTo('1');
      }
    );
    this.tourService.getCategories().subscribe((data: HotelCategory[]) => this.categories = data);
    this.tourService.getCurrencyList().subscribe((data: Currency[]) => this.currencyList = data);
    this.tourService.getAllTours().subscribe(
      (data: Tour[]) => {
        this.tours = data;
        this.maxPriceFrom = this.findMax().toString();
        this.minPriceFrom = this.findMin().toString();
        this.maxPriceTo = this.maxPriceFrom;
        this.minPriceTo = this.minPriceFrom;
        this.minPF = parseFloat(this.minPriceFrom);
        this.maxPF = parseFloat(this.maxPriceFrom);
        this.minPT = parseFloat(this.minPriceTo);
        this.maxPT = parseFloat(this.maxPriceTo);
      }
    );
  }

  changeCountryFrom(id): void {
    const u: CountryFrom = this.countryFrom.find(value => value.id === parseInt(id, 0));
    this.tourService.getCityFrom(u.name).subscribe((data: CityFrom[]) => this.cities = data);
  }

  changeCountryTo(id): void {
    const u: CountryTo = this.countryTo.find(value => value.id === parseInt(id, 0));
    this.tourService.getLocations(u.countryName).subscribe(
      (data: LocationTo[]) => {
        this.locations = data;
        this.changeLocation('1');
      }
    );
  }

  changeLocation(id): void {
    this.locationId = id;
    const u: LocationTo = this.locations.find(value => value.id === parseInt(id, 0));
    let c: HotelCategory;
    if (this.categoryId) {
      c = this.categories.find(value => value.id === parseInt(this.categoryId, 0));
    }
    this.tourService.getHotels(this.categoryId ? c.description : undefined, u.shortDescription).subscribe(
      (data: Hotel[]) => {
        this.hotels = data;
        for (let i = 0; i < this.hotels.length; i++) {
          this.hotels[i].selected = false;
        }
      }
    );
  }

  changeCategory(id): void {
    this.categoryId = id;
    const u: HotelCategory = this.categories.find(value => value.id === parseInt(this.categoryId, 0));
    let c: LocationTo;
    if (this.locationId) {
      c = this.locations.find(value => value.id === parseInt(this.locationId, 0));
    }
    this.tourService.getHotels(u.description, this.locationId ? c.shortDescription : undefined).subscribe(
      (data: Hotel[]) => {
        this.hotels = data;
        for (let i = 0; i < this.hotels.length; i++) {
          this.hotels[i].selected = false;
        }
      }
    );
  }

  changeSelectHotel(item): void {
    for (let i = 0; i < this.hotels.length; i++) {
      this.hotels[i].selected = this.hotels[i].id === item;
    }
  }

  findTours(): void {
    const ts1: number = +new Date(this.startDate) / 1000;
    const ts2: number = +new Date(this.endDate) / 1000;
    const hotel: Hotel = this.hotels.find(value => value.selected === true);
    this.tourService.getTours(this.priceFrom, this.priceTo, ts1, ts2, hotel.hotelName).subscribe(
      (data: Tour[]) => {
        this.tours = data;
        this.maxPriceFrom = this.findMax().toString();
        this.minPriceFrom = this.findMin().toString();
        this.maxPriceTo = this.maxPriceFrom;
        this.minPriceTo = this.minPriceFrom;
        this.minPF = parseFloat(this.minPriceFrom);
        this.maxPF = parseFloat(this.maxPriceFrom);
        this.minPT = parseFloat(this.minPriceTo);
        this.maxPT = parseFloat(this.maxPriceTo);
      }
    );
  }

  findMax(): number {
    let max = this.tours[0].price;
    for (let item = 0; item < this.tours.length; item++) {
      if (this.tours[item].price > max) {
        max = this.tours[item].price;
      }
    }
    return max;
  }

  findMin(): number {
    let min = this.tours[0].price;
    for (let item = 0; item < this.tours.length; item++) {
      if (this.tours[item].price < min) {
        min = this.tours[item].price;
      }
    }
    return min;
  }

  changeCurrency(rate): void {
    this.currentRate = rate;
    this.minPriceFrom = (parseFloat(this.currentRate) * this.findMin()).toFixed(2);
    this.maxPriceFrom = (parseFloat(this.currentRate) * this.findMax()).toFixed(2);
    this.minPriceTo = (parseFloat(this.currentRate) * this.findMin()).toFixed(2);
    this.maxPriceTo = (parseFloat(this.currentRate) * this.findMax()).toFixed(2);
    this.minPF = parseFloat(this.minPriceFrom);
    this.maxPF = parseFloat(this.maxPriceFrom);
    this.minPT = parseFloat(this.minPriceTo);
    this.maxPT = parseFloat(this.maxPriceTo);
  }

  timestampToDateString(ts: number): string {
    return new Date(ts).toLocaleDateString();
  }

  makeOrder(tour: Tour): void {
    if (this.authService.isLoggedIn() && this.authService.hasRole('ROLE_USER')) {
      this.error = false;
      this.userService.getAllUsers().subscribe(
        (data: User[]) => {
          const json = localStorage.getItem('currentUser');
          const user = json ? JSON.parse(json) : null;
          this.currentUser = data.find(value => value.username === user.username);
          const order: Order = new Order();
          order.client = Object.assign(new Client(), this.currentUser.client);
          order.date = new Date();
          order.tour = Object.assign(new Tour(), tour);
          this.orderService.addOrder(order).subscribe();
        }
      );
    } else {
      this.error = true;
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TourService} from '../service/tour.service';
import {CityFrom} from '../model/city.from';
import {CountryFrom} from '../model/country.from';
import {CountryTo} from '../model/country.to';
import {LocationTo} from '../model/location.to';
import {HotelCategory} from '../model/hotel.category';
import {Hotel} from '../model/hotel';

@Component({
  moduleId: module.id,
  templateUrl: './tour.selection.component.html',
  styleUrls: ['./tour.selection.component.css'],
  providers: [TourService]
})
export class TourSelectionComponent implements OnInit {
  cities: CityFrom[];
  countryFrom: CountryFrom[];
  countryTo: CountryTo[];
  locations: LocationTo[];
  categories: HotelCategory[];
  hotels: Hotel[];
  locationId = '';
  categoryId = '';
  selCountryFrom = '';

  constructor(private titleService: Title,
              private tourService: TourService) {
  }

  ngOnInit() {
    this.titleService.setTitle('Подбор тура - Neon Tour');
    this.tourService.getCountriesFrom().subscribe(
      (data: CountryFrom[]) => {
        this.countryFrom = data;
        this.changeCountryFrom('1');
      }
    );
    this.tourService.getCountriesTo().subscribe(
      (data: CountryTo[]) => {
        this.countryTo = data;
        this.changeCountryTo('1');
      }
    );
    this.tourService.getCategories().subscribe((data: HotelCategory[]) => this.categories = data);
  }

  changeCountryFrom(id): void {
    const u: CountryFrom = this.countryFrom.find(value => value.id === parseInt(id, 0));
    this.tourService.getCityFrom(u.name).subscribe((data: CityFrom[]) => this.cities = data);
  }

  changeCountryTo(id): void {
    const u: CountryTo = this.countryTo.find(value => value.id === parseInt(id, 0));
    this.tourService.getLocations(u.countryName).subscribe((data: LocationTo[]) => this.locations = data);
  }

  changeLocation(id): void {
    this.locationId = id;
    const u: LocationTo = this.locations.find(value => value.id === parseInt(id, 0));
    this.tourService.getHotels(this.categoryId ? this.categoryId : undefined, u.shortDescription)
      .subscribe((data: Hotel[]) => this.hotels = data);
  }

  changeCategory(id): void {
    this.categoryId = id;
    const u: HotelCategory = this.categories.find(value => value.id === parseInt(id, 0));
    this.tourService.getHotels(u.description, this.locationId ? this.locationId : undefined)
      .subscribe((data: Hotel[]) => this.hotels = data);
  }
}

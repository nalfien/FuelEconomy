import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MenuItems } from './menuItems';
import { Car } from './car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
	private vehicleUrl = 'https://www.fueleconomy.gov/ws/rest/vehicle/'; // Base Url of all fuel economy APIs.
	private vehicleMenuUrl = this.vehicleUrl + 'menu/'; // Base Url plus menu

	// Constructor, pulls in HttpClient for getting data from web services
  constructor(private http: HttpClient) {}
	
	// Retrieve list of available model years
	public getYears(): Observable<MenuItems> {
		return this.http.get<MenuItems>(this.vehicleMenuUrl + 'year');
	}
	
	// Retrieve list of makes by year
	public getMakes<MenuItems>(year: string): Observable<MenuItems> {
		return this.http.get<MenuItems>(this.vehicleMenuUrl + 'make?year=' + year);
	}
	
	// Retrieve list of models by year and make
	public getModels<MenuItems>(year: string, make: string): Observable<MenuItems> {
		return this.http.get<MenuItems>(this.vehicleMenuUrl + 'model?year=' + year + '&make=' + make);
	}
	
	// Get list of specific types of car
	public getOptions<MenuItems>(year: string, make: string, model: string): Observable<MenuItems> {
		return this.http.get<MenuItems>(this.vehicleMenuUrl + 'options?year=' + year + '&make=' + make + '&model=' + model);
	}
	
	// Get data for individual car
	public getCar<Car>(carId: string): Observable<Car> {
		return this.http.get<Car>(this.vehicleUrl + carId);
	}
}

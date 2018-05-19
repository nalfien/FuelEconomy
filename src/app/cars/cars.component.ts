import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';
import { MenuItems } from '../menuItems';
import { Car } from '../car';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
	years: MenuItems; // List of available years
	makes: MenuItems; // List of car makes
	models: MenuItems; // List of car models
	options: MenuItems; // List of individual options by car
	carList: Car[]; // List of cars retrieved by user

	// Pull in car service
  constructor(private carService: CarService) { }

  ngOnInit() {
		this.getYears(); // Get list of years from service
		
		// Get car list from local storage, if it exists, otherwise create a new array
		if(!localStorage.getItem('carList')) {
			this.carList = [];
		} else {
			this.carList = JSON.parse(localStorage.getItem('carList'));
		}
  }

	// Get list of years from service
	getYears(): void {
		this.carService.getYears().subscribe((yearInput: MenuItems) => this.years = yearInput);
	}
	
	// Get list of makes from service, clear make and option drop downs as needed
	getMakes(year: string): void {
		this.models = null;
		this.options = null;
		this.carService.getMakes(year).subscribe((makeInput: MenuItems) => this.makes = makeInput);
	}
	
	// Get list of models from service, clear option as needed
	getModels(year: string, make: string): void {
		this.options = null;
		this.carService.getModels(year, make).subscribe((modelInput: MenuItems) => this.models = modelInput);
	}
	
	// Gets options from service, if a single option is returned, change the sub-object to an array
	getOptions(year: string, make: string, model: string): void {
		console.log('options?year=' + year + '&make=' + make + '&model=' + model);
		this.carService.getOptions(year, make, model).subscribe((optionInput: MenuItems) => {
			if(!(optionInput.menuItem instanceof Array)) {
				this.options = new MenuItems();
				this.options.menuItem = [];
				this.options.menuItem.push(optionInput.menuItem);
			} else {
				this.options = optionInput;
			}
			
			console.log(this.options);
		});
	}
	
	// Get an invidual car from the service, check to see if it's already in the 
	// saved car list, if not, save it both to the current list and to local storage
	getCar(carId: string): void {
		this.carService.getCar(carId).subscribe((carInput: Car) => {
			let doAdd = true;
			this.carList.forEach(car => {
				if(car.id == carInput.id) {
					doAdd = false;
				}
			});
			
			if(doAdd) {
				this.carList.push(carInput);
				localStorage.setItem('carList', JSON.stringify(this.carList));
			}
		});
	}
	
	// Remove a car from the current list
	removeCar(carId: number): void {
		for(let i = 0; i < this.carList.length; i++) {
			if(Number(this.carList[i].id) == carId) {
				this.carList.splice(i, 1);
				break;
			}
		}
		
		localStorage.setItem('carList', JSON.stringify(this.carList));
	}
}

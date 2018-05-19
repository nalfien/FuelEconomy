export class Car {
	id: string; // Internal car ID
	year: string; // Production year of car
	make: string; // Make of car
	model: string; // Model of car
	atvType: string; // type of alternative fuel or advanced technology vehicle
	city08: number; // city MPG for fuelType1
	cityA08: number; // city MPG for fuelType2
	cityE: number; // city electricity consumption in kw-hrs/100 miles
	fuelType1: string; // fuel type 1. For single fuel vehicles, this will be the only fuel. For dual fuel vehicles, this will be the conventional fuel.
	fuelType2: string; // fuel type 2. For dual fuel vehicles, this will be the alternative fuel (e.g. E85, Electricity, CNG, LPG). For single fuel vehicles, this field is not used
	highway08: number; // highway MPG for fuelType1
	highwayA08: number; // highway MPG for fuelType2
	highwayE: number; // highway electricity consumption in kw-hrs/100 miles
}
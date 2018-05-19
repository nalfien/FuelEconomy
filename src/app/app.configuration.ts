import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server = 'https://www.fueleconomy.gov/';
    public ApiUrl = 'ws/rest/';
    public ServerWithApiUrl = this.Server + this.ApiUrl;
}
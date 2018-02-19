import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DadosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DadosProvider {

  constructor(public http: HttpClient) {
  }

  getData(){
    return this.http.get('assets/data/data.json');
  }
  getData2(){
    return this.http.get('assets/data/data3.json');
  }
}

import { Injectable, Inject }    from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

class promise {};

@Injectable() 
export class DataService {

  host: string = 'https://medium-demo-angular.blockbinder.com/api/';

  constructor(private http: HttpClient) {}

  tableData() : Observable<promise> {
    return this.http.get(
      this.host+'retrieve-database'
    );
  }
}


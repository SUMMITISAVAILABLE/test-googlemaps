import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataDTO } from '../models/dataDTO';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GooglemapsService {

  constructor(public http: HttpClient) { }

  storeData(data: DataDTO): Observable<any> {
    return this.http.post(environment.apiUrl + 'data', data);
  }
}

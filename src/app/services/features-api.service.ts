import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { API_URL } from '../env';
import { Recommendation } from '../models/recommendation'

@Injectable()
export class FeaturesApiService {

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  getFeatures(): Observable<Any[]> {
    return this.http
      .get<Any[]>(`${API_URL}/features`)
      .catch(FeaturesApiService._handleError);
  }
}

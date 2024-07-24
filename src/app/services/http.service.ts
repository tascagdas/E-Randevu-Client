import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResultModel } from '../models/result.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  post<T>(
    apiUrl: string,
    body: any,
    successCallback: (resp: ResultModel<T>) => void,
    errorCallback?: (err: HttpErrorResponse) => void
  ) {
    this.http.post<ResultModel<T>>(`${apiUrl}`, body).subscribe({
      next: (resp) => {
        successCallback;
      },
      error: ((err: HttpErrorResponse) => {
        if (errorCallback!== undefined) {
          errorCallback(err)
        }
      })
    });
  }
}

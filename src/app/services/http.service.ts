import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResultModel } from '../models/result.model';
import { api } from '../Constans/constans';

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
    this.http.post<ResultModel<T>>(`${api}${apiUrl}`, body).subscribe({
      next: (resp) => {
        if (resp.data!==undefined && resp.data!==null) {
          successCallback(resp);
        }
      },
      error: ((err: HttpErrorResponse) => {
        if (errorCallback!== undefined) {
          errorCallback(err)
        }
      })
    });
  }
}

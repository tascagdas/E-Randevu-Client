import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResultModel } from '../models/result.model';
import { api } from '../Constans/constans';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient,
    private errorService : ErrorService
  ) {}

  post<T>(
    apiUrl: string,
    body: any,
    successCallback: (resp: ResultModel<T>) => void,
    errorCallback?: (err: HttpErrorResponse) => void
  ) {
    this.http.post<ResultModel<T>>(`${api}${apiUrl}`, body).subscribe({
      next: (resp) => {
          successCallback(resp);
      },
      error: ((err: HttpErrorResponse) => {
          this.errorService.errorHandler(err);
        if (errorCallback!== undefined) {
          errorCallback(err)
        }
      })
    });
  }
}

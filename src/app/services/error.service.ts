import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SweetalService } from './sweetal.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private alert : SweetalService
  ) { }

  errorHandler(error : HttpErrorResponse) {
    console.log(error);

    let message = "Hata"
    if (error.status == 0) {
      message = error.message;
    } else if (error.status == 401) {
      message = 'API-401 Yetkisiz Erişim.';
    } else if (error.status == 404) {
      message = 'API-404 Yapılan istek bulunamadı.';
    } else if (error.status == 500) {
      for (const e of error.error.errorMessages) {
        message = '';
        message += e + '\n';
      }
    }

    this.alert.callToast("Hata!", message, "error",10000);
  }
}

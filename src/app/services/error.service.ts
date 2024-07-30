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
      message = "Sunucuya şuan ulaşılamıyor.";
    } else if (error.status == 404) {
      message = 'API-404 Yapılan istek bulunamadı.';
    } else if (error.status == 500) {
      for (const e of error.error.errorMessages) {
        message = "";
        message += e + "\n";
      }
    }

    this.alert.callToast("Hata!", message, "error",10000);
  }
}

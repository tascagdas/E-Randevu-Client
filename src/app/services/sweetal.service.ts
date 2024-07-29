import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetalService {
  constructor() {}

  callToast(title: string,message:string, icon: SweetAlertIcon = 'info') {
    Swal.fire({
      title: title,
      text: message,
      icon: icon,
      // confirmButtonText: 'Cool',
      timer: 3000,
      showConfirmButton:false,
      showCloseButton: true,
      showCancelButton: false,
      toast: true,
      position: 'bottom-end',
    });
  }
}

export type SweetAlertIcon =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'question';

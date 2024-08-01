import { Pipe, PipeTransform } from '@angular/core';
import { PatientModel } from '../models/patient.model';

@Pipe({
  name: 'patient',
  standalone: true,
})
export class PatientPipe implements PipeTransform {
  transform(value: PatientModel[], search: string): PatientModel[] {
    if (!search) {
      return value;
    }

    return value.filter(
      (d) =>
        d.fullName.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        d.identityNumber
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        d.city.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }
}

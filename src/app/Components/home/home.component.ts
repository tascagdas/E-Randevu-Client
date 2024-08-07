import { Component } from '@angular/core';
import { departments } from '../../Constans/constans';
import { DoctorModel } from '../../models/doctor-model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DxSchedulerModule } from 'devextreme-angular';
import { locale } from 'devextreme/localization';
import { HttpService } from '../../services/http.service';
import { AppointmentModel } from '../../models/appointment.model';
declare var $:any


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, DxSchedulerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  currentDate: Date = new Date(Date.now());

  constructor(private http: HttpService) {
    locale('tr');
  }

  departments = departments;
  doctors: DoctorModel[] = [];
  selectedDepartmentValue: number = -1;
  selectedDoctorId: string;

  appointments: AppointmentModel[] = [];
  getDoctors() {
    this.selectedDoctorId = '';
    this.http.post<DoctorModel[]>(
      'Appointments/GetDoctorsByDepartment',
      { DepartmentValue: this.selectedDepartmentValue },
      (resp) => {
        this.doctors = resp.data;
      }
    );
  }

  getAppointments() {
    if (this.selectedDoctorId) {
          this.http.post<AppointmentModel[]>(
            'Appointments/GetAppointmentsByDoctorId',
            { DoctorId: this.selectedDoctorId },
            (resp) => {
              this.appointments = resp.data;
            }
          );
    }

  }
}

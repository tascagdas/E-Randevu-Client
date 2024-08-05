import { Component } from '@angular/core';
import { departments } from '../../Constans/constans';
import { DoctorModel } from '../../models/doctor-model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DxSchedulerModule } from 'devextreme-angular';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../models/appointment.model';
import { locale } from 'devextreme/localization';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, DxSchedulerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  dummyAppointments: Appointment[];
  currentDate: Date = new Date(Date.now());

  constructor(appoService: AppointmentService) {
    locale('tr');
    this.dummyAppointments = appoService.getAppointments();
  }

  appointments: any = [
    {
      startDate: new Date('08.05.2024 08:45'),
      endDate: new Date('08.05.2024 09:45'),
      title: 'Install New Database',
    },
    {
      startDate: new Date('08.05.2024 11:45'),
      endDate: new Date('08.05.2024 12:45'),
      title: 'UnInstall New Database',
    },
    {
      startDate: new Date('08.06.2024 14:45'),
      endDate: new Date('08.06.2024 15:45'),
      title: 'Setup Database',
    }
  ];

  departments = departments;
  doctors: DoctorModel[] = [];
  selectedDepartmentValue: number = -1;
  selectedDoctorId: string;
}

import { Component } from '@angular/core';
import { departments } from '../../Constans/constans';
import { DoctorModel } from '../../models/doctor-model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DxSchedulerModule } from 'devextreme-angular';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../models/appointment.model';

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
    this.dummyAppointments = appoService.getAppointments();
  }

  departments = departments;
  doctors: DoctorModel[] = [];
  selectedDepartmentValue: number = -1;
  selectedDoctorId: string;
}

import { Component, OnInit } from '@angular/core';
import { departments } from '../../Constans/constans';
import { DoctorModel } from '../../models/doctor-model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { DxSchedulerModule } from 'devextreme-angular';
import { locale } from 'devextreme/localization';
import { HttpService } from '../../services/http.service';
import { AppointmentModel } from '../../models/appointment.model';
import { AppointmentAddedEvent, AppointmentDeletedEvent, AppointmentFormOpeningEvent, AppointmentUpdatedEvent } from 'devextreme/ui/scheduler';
import { CreateAppointmentModel } from '../../models/create-appointment.model';
import { FormValidateDirective } from 'form-validate-angular';
import { SweetalService } from '../../services/sweetal.service';
import notify from 'devextreme/ui/notify';

declare var $: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    DxSchedulerModule,
    FormValidateDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [DatePipe],
})
export class HomeComponent {
  currentDate: Date = new Date(Date.now());

  constructor(
    private http: HttpService,
    private date: DatePipe,
    private alert: SweetalService
  ) {
    locale('tr');
  }

  departments = departments;
  doctors: DoctorModel[] = [];
  selectedDepartmentValue: number = -1;
  selectedDoctorId: string;
  createAppointmentModel: CreateAppointmentModel = new CreateAppointmentModel();

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

  onAppointmentFormOpening(event: AppointmentFormOpeningEvent) {

    this.createAppointmentModel.doctorId = this.selectedDoctorId;

  }

  createAppointment(e: AppointmentAddedEvent) {
    this.createAppointmentModel.startDate = this.date.transform(e.appointmentData.startDate,'dd.MM.yyyy HH:mm') ?? '';
    this.createAppointmentModel.endDate = this.date.transform(e.appointmentData.endDate,'dd.MM.yyyy HH:mm') ?? '';
    this.createAppointmentModel.identityNumber = e.appointmentData.description;
    this.http.post<string>('Appointments/CreateByIdentityNumber',this.createAppointmentModel,(resp) => {
        this.alert.callToast('Başarılı', resp.data, 'success');
      }
    );
    if (e.appointmentData.description) {
    notify('Randevu eklendi', 'success', 1000);
    }else{
      notify('Açıklama kısmına hastanın TC Kimlik Numarasını giriniz.', 'error', 3000);
    }
  }

  deleteAppointment(e: AppointmentDeletedEvent) {
    this.alert.callSweetAlert(
      'Silmek istediğinize emin misiniz?',
      'Silmek istediğiniz randevuya ait bilgiler silinecektir.',
      'warning',
      'Sil',
      () => {
        this.http.post<string>(
          'Appointments/DeleteByAppointmentId',
          {
            AppointmentId: e.appointmentData['id'],
          },
          (resp) => {
            this.alert.callToast('Başarılı', resp.data, 'info');
            this.getAppointments();
          }
        );
      }
    );
  }

  updateAppointment(e: AppointmentUpdatedEvent) {
    console.log(e.appointmentData);
    this.http.post<string>(
      'Appointments/UpdateAppointment',
      {
        AppointmentId: e.appointmentData['id'],
        startDate: this.date.transform(e.appointmentData.startDate,'dd.MM.yyyy HH:mm'),
        endDate: this.date.transform(e.appointmentData.endDate,'dd.MM.yyyy HH:mm'),
      },
      (resp) => {
        this.alert.callToast('Başarılı', resp.data, 'info');
        this.getAppointments();
      }
    );
    notify("Randevu güncellendi.", "info", 3000);
  }
}

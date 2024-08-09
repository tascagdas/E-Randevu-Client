import { Component, OnInit } from '@angular/core';
import { departments } from '../../Constans/constans';
import { DoctorModel } from '../../models/doctor-model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { DxSchedulerModule } from 'devextreme-angular';
import { locale } from 'devextreme/localization';
import { HttpService } from '../../services/http.service';
import { AppointmentModel } from '../../models/appointment.model';
import { AppointmentAddedEvent, AppointmentDeletedEvent, AppointmentFormOpeningEvent } from 'devextreme/ui/scheduler';
import { CreateAppointmentModel } from '../../models/create-appointment.model';
import { FormValidateDirective } from 'form-validate-angular';
import { SweetalService } from '../../services/sweetal.service';

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

  constructor(private http: HttpService,
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
    const form = event.form;

    form.itemOption('description', { visible: false });
    form.itemOption('identityNumber', {
      editorType: 'dxTextBox',
      editorOptions: { placeholder: 'Identity Number' },
      dataField: 'identityNumber',
      label: { text: 'Identity Number' },
      visible: true,
    });
    // $.noConflict();

    // event.cancel = true;

    this.createAppointmentModel.startDate =
      this.date.transform(
        event.appointmentData.startDate,
        'dd.MM.yyyy HH:mm'
      ) ?? '';

    this.createAppointmentModel.endDate =
      this.date.transform(event.appointmentData.endDate, 'dd.MM.yyyy HH:mm') ??
      '';

    this.createAppointmentModel.doctorId = this.selectedDoctorId;

    // $('#createAppointmentModal').modal("show");
  }

  createAppointment(e: AppointmentAddedEvent) {
    this.createAppointmentModel.identityNumber=e.appointmentData.description
    this.http.post<string>('Appointments/CreateByIdentityNumber', this.createAppointmentModel, resp => {
      this.alert.callToast("Başarılı",resp.data,"success")
    });
  }

  deleteAppointment(e: AppointmentDeletedEvent) {
    this.alert.callSweetAlert("Silmek istediğinize emin misiniz?", "Silmek istediğiniz randevuya ait bilgiler silinecektir.", "warning", "Sil", () => {
          this.http.post<string>(
            'Appointments/DeleteByAppointmentId',
            {
              AppointmentId: e.appointmentData['id'],
            },
            (resp) => {
              this.alert.callToast('Başarılı', resp.data, 'success');
            }
          );
    })
  }
}

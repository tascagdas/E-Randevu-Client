import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PatientModel } from '../../models/patient.model';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { FormValidateDirective } from 'form-validate-angular';
import { PatientPipe } from '../../pipes/patient.pipe';
import { HttpService } from '../../services/http.service';
import { SweetalService } from '../../services/sweetal.service';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [
    RouterLink,
    LucideAngularModule,
    CommonModule,
    FormsModule,
    FormValidateDirective,
    PatientPipe,
  ],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css',
})
export class PatientsComponent implements OnInit {
  patients: PatientModel[];

  @ViewChild('addModalCloseButton') addModalCloseButton:
    | ElementRef<HTMLButtonElement>
    | undefined;
  @ViewChild('updateModalCloseButton') updateModalCloseButton:
    | ElementRef<HTMLButtonElement>
    | undefined;

  createPatientModel: PatientModel = new PatientModel();
  updatePatientModel: PatientModel = new PatientModel();

  constructor(private http: HttpService, private alert: SweetalService) {}

  search: string;

  ngOnInit(): void {
    this.getAllPatients();
  }

  getAllPatients() {
    this.http.post<PatientModel[]>('patients/getallpatients', {}, (resp) => {
      this.patients = resp.data;
    });
  }

  add(form: NgForm) {
    if (form.valid) {
      this.http.post<string>(
        'patients/CreatePatient',
        this.createPatientModel,
        (resp) => {
          this.alert.callToast('Ekleme Başarılı', resp.data, 'success');
          this.getAllPatients();
          this.addModalCloseButton?.nativeElement.click();
          this.createPatientModel = new PatientModel();
        }
      );
    }
  }
  delete(patientId: string, fullName: string) {
    this.alert.callSweetAlert(
      'Hasta Sil',
      `Seçilen "${fullName}" isimli hastayı kalıcı olarak silmek istediğinizden emin misiniz?`,
      'question',
      'Sil',
      () => {
        this.http.post<string>(
          'patients/DeletePatientById',
          { id: patientId },
          (resp) => {
            this.alert.callToast(
              'Başarılı',
              `${fullName} başarıyla silinmiştir. \n ${resp.data}`,
              'info'
            );
            this.getAllPatients();
          }
        );
      }
    );
  }

  getDataBeforeUpdate(data: PatientModel) {
    this.updatePatientModel = { ...data };

  }

  update(_t117: NgForm) {
    if (_t117.valid) {
      this.http.post<string>(
        'Doctors/UpdateDoctor',
        this.updatePatientModel,
        (resp) => {
          this.alert.callToast('Ekleme Başarılı', resp.data, 'success');
          this.getAllPatients();
          this.updateModalCloseButton?.nativeElement.click();
        }
      );
    }
  }
}

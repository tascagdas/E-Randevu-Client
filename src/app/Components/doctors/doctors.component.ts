import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { HttpService } from '../../services/http.service';
import { DoctorModel } from '../../models/doctor-model';
import { CommonModule } from '@angular/common';
import { departments } from '../../Constans/constans';
import { FormsModule, NgForm } from '@angular/forms';
import { FormValidateDirective } from 'form-validate-angular';
import { SweetalService } from '../../services/sweetal.service';
import { DoctorPipe } from '../../pipes/doctor.pipe';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [
    RouterLink,
    LucideAngularModule,
    CommonModule,
    FormsModule,
    FormValidateDirective,
    DoctorPipe
  ],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css',
})
export class DoctorsComponent implements OnInit {
  doctors: DoctorModel[];

  departments = departments;

  @ViewChild('addModalCloseButton') addModalCloseButton:ElementRef<HTMLButtonElement> | undefined
  @ViewChild('updateModalCloseButton') updateModalCloseButton:ElementRef<HTMLButtonElement> | undefined
  createDoctorModel: DoctorModel = new DoctorModel();
  updateDoctorModel: DoctorModel = new DoctorModel();

  constructor(private http: HttpService,
    private alert:SweetalService
  ) {}

  search: string;

  ngOnInit(): void {
    this.getAllDoctors();
  }

  getAllDoctors() {
    this.http.post<DoctorModel[]>('doctors/getalldoctors', {}, (resp) => {
      this.doctors = resp.data;

    });
  }

  add(form: NgForm) {
    if (form.valid) {
      this.http.post<string>('Doctors/CreateDoctor', this.createDoctorModel, (resp) => {
          this.alert.callToast('Ekleme Başarılı', resp.data,'success');
          this.getAllDoctors();
          this.addModalCloseButton?.nativeElement.click()
          this.createDoctorModel = new DoctorModel();
        }
      );
    }
  }
  delete(doctorId: string, fullName: string) {
    this.alert.callSweetAlert("Doktor Sil", `Seçilen "${fullName}" isimli doktoru kalıcı olarak silmek istediğinizden emin misiniz?`, "question", "Sil", () => {
      this.http.post<string>("Doctors/DeleteDoctorById", { id: doctorId }, (resp) => {
        this.alert.callToast("Başarılı", `${fullName} başarıyla silinmiştir. \n ${resp.data}`, "info")
        this.getAllDoctors();
    })
    })
  }

  getDataBeforeUpdate(data : DoctorModel) {
    this.updateDoctorModel = { ...data };
    this.updateDoctorModel.departmentValue = data.department.value;
  }

  update(_t117: NgForm) {
    if (_t117.valid) {
      this.http.post<string>(
        'Doctors/UpdateDoctor',
        this.updateDoctorModel,
        (resp) => {
          this.alert.callToast('Ekleme Başarılı', resp.data, 'success');
          this.getAllDoctors();
          this.updateModalCloseButton?.nativeElement.click();
        }
      );
    }
  }
}

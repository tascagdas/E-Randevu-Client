import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { HttpService } from '../../services/http.service';
import { DoctorModel } from '../../models/doctor-model';
import { CommonModule } from '@angular/common';
import { departments } from '../../Constans/constans';
import { FormsModule, NgForm } from '@angular/forms';
import { FormValidateDirective } from 'form-validate-angular';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [
    RouterLink,
    LucideAngularModule,
    CommonModule,
    FormsModule,
    FormValidateDirective,
  ],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css',
})
export class DoctorsComponent implements OnInit {
  doctors: DoctorModel[];

  departments = departments;

  @ViewChild('addModalCloseButton') addModalCloseButton:ElementRef<HTMLButtonElement> | undefined
  createDoctorModel: DoctorModel = new DoctorModel();

  constructor(private http: HttpService) {}

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
      this.http.post<string>('Doctors/CreateDoctor',this.createDoctorModel,(resp) => {
          this.getAllDoctors();
          this.addModalCloseButton.nativeElement.click()
          this.createDoctorModel = new DoctorModel();
        }
      );
    }
  }
}

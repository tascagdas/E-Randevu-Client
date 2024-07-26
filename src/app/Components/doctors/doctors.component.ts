import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { HttpService } from '../../services/http.service';
import { DoctorModel } from '../../models/doctor-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, CommonModule],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css',
})
export class DoctorsComponent implements OnInit {
  doctors: DoctorModel[];

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.getAllDoctors();
  }
  
  getAllDoctors() {
    this.http.post<DoctorModel[]>("doctors/getalldoctors", {}, (resp) => {
      this.doctors=resp.data
    })
  }
}

import { Component } from '@angular/core';
import { departments } from '../../Constans/constans';
import { DoctorModel } from '../../models/doctor-model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  departments = departments;
  doctors: DoctorModel[] = [];
  selectedDepartmentValue: number = -1;
  selectedDoctorId:string
}

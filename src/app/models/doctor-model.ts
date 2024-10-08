import { DepartmentModel } from './department.model';

export class DoctorModel {
  doctorId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  department: DepartmentModel = new DepartmentModel();
  departmentValue: number = 0
}

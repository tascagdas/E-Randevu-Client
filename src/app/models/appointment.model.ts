import { PatientModel } from "./patient.model";

export class AppointmentModel {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  patient: PatientModel;
  dayLong?: boolean;
  recurrence?: string;
}

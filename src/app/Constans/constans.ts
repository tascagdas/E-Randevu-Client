import { Appointment } from 'devextreme/ui/scheduler';
import { DepartmentModel } from '../models/department.model';

export const api: string = 'https://localhost:7053/api/';

export const departments: DepartmentModel[] = [
  {
    name: 'Doktor',
    value: 0,
  },
  {
    name: 'Acil',
    value: 1,
  },
  {
    name: 'Radyoloji',
    value: 2,
  },
  {
    name: 'Kardioloji',
    value: 3,
  },
  {
    name: 'Dermatoloji',
    value: 4,
  },
  {
    name: 'Endokrinoloji',
    value: 5,
  },
  {
    name: 'Gastroenteroloji',
    value: 6,
  },
  {
    name: 'Genel Cerrahi',
    value: 7,
  },
  {
    name: 'Jinekoloji ve Obstetrik',
    value: 8,
  },
  {
    name: 'Hematoloji',
    value: 9,
  },
  {
    name: 'Enfeksiyon Hastalıkları',
    value: 10,
  },
  {
    name: 'Nefroloji',
    value: 11,
  },
  {
    name: 'Nöroloji',
    value: 12,
  },
  {
    name: 'Ortopedi',
    value: 13,
  },
  {
    name: 'Pediatri',
    value: 14,
  },
  {
    name: 'Psikiyatri',
    value: 15,
  },
  {
    name: 'Pulmonoloji',
    value: 16,
  },
];

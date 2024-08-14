import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { FormValidateDirective } from 'form-validate-angular';
import { HttpService } from '../../services/http.service';
import { SweetalService } from '../../services/sweetal.service';
import { HttpStatusCode } from '@angular/common/http';
import { UserPipe } from '../../pipes/user.pipe';
import { RoleModel } from '../../models/role.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    RouterLink,
    LucideAngularModule,
    CommonModule,
    FormsModule,
    FormValidateDirective,
    UserPipe,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users: UserModel[];
  roles: RoleModel[];

  @ViewChild('addModalCloseButton') addModalCloseButton:
    | ElementRef<HTMLButtonElement>
    | undefined;
  @ViewChild('updateModalCloseButton') updateModalCloseButton:
    | ElementRef<HTMLButtonElement>
    | undefined;

  createUserModel: UserModel = new UserModel();
  updateUserModel: UserModel = new UserModel();

  constructor(private http: HttpService, private alert: SweetalService) {}

  search: string;

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllRoles();
  }

  getAllUsers() {
    this.http.post<UserModel[]>('Users/GetAll', {}, (resp) => {
      this.users = resp.data;
    });
  }
  getAllRoles() {
    this.http.post<RoleModel[]>('Users/GetAllRoles', {}, (res) => {
      this.roles = res.data;
    });
  }

  add(form: NgForm) {
    if (form.valid) {
      this.http.post<HttpStatusCode>(
        'Users/Create',
        this.createUserModel,
        (resp) => {
          this.alert.callToast('Ekleme Başarılı', resp.data, 'success');
          this.getAllUsers();
          this.addModalCloseButton?.nativeElement.click();
          this.createUserModel = new UserModel();
          form.resetForm();
        }
      );
    }
  }
  delete(userId: string, fullName: string) {
    this.alert.callSweetAlert(
      'kullanici Sil',
      `Seçilen "${fullName}" isimli kullaniri kalıcı olarak silmek istediğinizden emin misiniz?`,
      'question',
      'Sil',
      () => {
        this.http.post<HttpStatusCode>(
          'Users/DeleteById',
          { id: userId },
          (resp) => {
            this.alert.callToast(
              'Başarılı',
              `${fullName} başarıyla silinmiştir. \n ${resp.data}`,
              'info'
            );
            this.getAllUsers();
          }
        );
      }
    );
  }

  getDataBeforeUpdate(data: UserModel) {
    this.updateUserModel = { ...data };
  }

  update(_t117: NgForm) {
    if (_t117.valid) {
      this.http.post<HttpStatusCode>(
        'Users/Update',
        this.updateUserModel,
        (resp) => {
          this.alert.callToast('Ekleme Başarılı', resp.data, 'success');
          this.getAllUsers();
          this.updateModalCloseButton?.nativeElement.click();
        }
      );
    }
  }
}

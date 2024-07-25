import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { LoginModel } from '../../models/login.model';
import { FormValidateDirective } from 'form-validate-angular';
import { HttpService } from '../../services/http.service';
import { LoginResponseModel } from '../../models/login-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LucideAngularModule, FormsModule, FormValidateDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private http: HttpService,
    private router: Router
  ) {}

  login: LoginModel = new LoginModel();

  @ViewChild('passwordInput') passwordInput:
    | ElementRef<HTMLInputElement>
    | undefined
  handleShowPassword() {
    if (this.passwordInput == undefined) return;
    if (this.passwordInput.nativeElement.type == 'password') {
      this.passwordInput.nativeElement.type = 'text';
    } else {
      this.passwordInput.nativeElement.type = 'password';
    }
  }

  signIn(form: NgForm) {
    if (form.valid) {
      this.http.post<LoginResponseModel>("auth/login", this.login, (resp) => {
        localStorage.setItem('token', resp.data!.token);
        this.router.navigateByUrl("/")
      })
    }
  }
}

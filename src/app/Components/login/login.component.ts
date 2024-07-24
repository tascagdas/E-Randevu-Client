import { Component, ElementRef, ViewChild } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('passwordInput') passwordInput: ElementRef<HTMLInputElement> | undefined 
  handleShowPassword() {
    if (this.passwordInput == undefined) return;
    if (this.passwordInput.nativeElement.type == 'password') {
      this.passwordInput.nativeElement.type = 'text';
    } else {
      this.passwordInput.nativeElement.type = 'password';
    }
  }
}

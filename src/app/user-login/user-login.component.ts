import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  constructor(private router: Router) {}

  formData: { username: string, password: string } = { username: '', password: '' };

  login() {
    if (this.formData.username === 'user' && this.formData.password === 'password') {
      this.router.navigate(['/user-dashboard']);
    } else if (this.formData.username === 'admin' && this.formData.password === 'password') {
        this.router.navigate(['/admin-dashboard']);
    } else if (this.formData.username === 'proccurement' && this.formData.password === 'password') {
      this.router.navigate(['/proccurement-dashboard']);
    }
  }
}

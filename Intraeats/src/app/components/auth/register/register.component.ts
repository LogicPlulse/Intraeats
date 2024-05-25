import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    const user: User = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.authService.register(user).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/login']);
      },
      err => {
        console.error(err);
        this.error = err.error.msg || 'Registration failed';
      }
    );
  }
}

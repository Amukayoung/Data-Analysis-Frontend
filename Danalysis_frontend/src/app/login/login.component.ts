import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginObj = { username: '', password: '' };
  signupObj = { username: '', email: '', password: '' };

  constructor(private http: HttpClient, private router: Router) { }

  signup() {
    this.http.post('http://localhost:8000/signup', this.signupObj)
      .subscribe((response: any) => {
        console.log('Signup Response:', response);
  
        if (response.token) {
          console.log('User Data:', response.user);
          this.handleAuthentication(response);
        } else {
          console.error('Signup failed:', response.Status);
        }
      });
  }
  
  login() {
    this.http.post('http://localhost:8000/login', this.loginObj)
      .subscribe((response: any) => {
        console.log('Login Response:', response);
        if (response.token) {
          console.log('User Data:', response.user);
          this.handleAuthentication(response);
        } else {
          console.error('Login failed:', response.Status);
        }
      });
  }

  private handleAuthentication(response: any) {
    const userData = response.user;

    localStorage.setItem('currentUser', JSON.stringify(userData));
    localStorage.setItem('token', response.token);
 
    this.router.navigate(['/workers']);
  }
}

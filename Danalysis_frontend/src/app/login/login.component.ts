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
  
        // Assuming the API returns user details upon successful signup
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
  
        // Assuming the API returns user details upon successful login
        if (response.token) {
          console.log('User Data:', response.user);
          this.handleAuthentication(response);
        } else {
          console.error('Login failed:', response.Status);
        }
      });
  }

  private handleAuthentication(response: any) {
    // Extract user details from the response
    const userData = response.user;
  
    // Save user details and token to local storage
    localStorage.setItem('currentUser', JSON.stringify(userData));
    localStorage.setItem('token', response.token);
  
    // Redirect the user to the home page
    this.router.navigate(['/home']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Danalysis_frontend';
  isLoggedIn = false;

  status = false;

  constructor(private authService: AuthService, private router: Router) {
    this.checkLoginStatus();
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  addToggle()
  {
    this.status = !this.status;       
  }

  isLoginPage(): boolean {
  
    return this.router.url === '/login';
  }
  checkLoginStatus() {

    const userData = localStorage.getItem('currentUser');
    this.isLoggedIn = !!userData; 
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.checkLoginStatus(); 
    this.router.navigate(['/login']);
  }

}

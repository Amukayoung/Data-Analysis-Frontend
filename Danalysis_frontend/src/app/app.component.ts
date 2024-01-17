import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Danalysis_frontend';

  status = false;

  ngOnInit(): void {
    
  }

  addToggle()
  {
    this.status = !this.status;       
  }

}

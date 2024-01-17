import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';

interface AgeData {
  age: string;
  worker_count: number;
}
@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {
  public pieChart: any;
  public apiAgeData!: AgeData[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchAgeData();
  }

  fetchAgeData() {
    this.http.get('http://localhost:8000/uniqueagecounts').subscribe(
      (data: any) => {
        this.apiAgeData = data.data.UniqueAgeCounts;
        this.createPieChart();
      },
      (error) => {
        console.error('Error fetching age data:', error);
      }
    );
  }

  createPieChart() {
    const labels = this.apiAgeData.map(item => item.age);
    const data = this.apiAgeData.map(item => item.worker_count);

    this.pieChart = new Chart("AgePieChart", {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
              'rgba(255, 159, 64, 0.7)',
            ],
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
            display: true,
            text: 'Worker Age Distribution',
            font: {
              size: 18,
              weight: 'bold',
            }
          },
          legend: {
            display: true,
            labels: {
              font: {
                size: 14,
              }
            }
          },
        },
        animation: {
          duration: 2000,
        },
      }
    });
  }

}

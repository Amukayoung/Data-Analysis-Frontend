import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';

interface RouteData {
  routeId__id: number;
  routeId__route: string;
  total_count: number;
}

@Component({
  selector: 'app-route-pie-chart',
  templateUrl: './routes-pie-chart.component.html',
  styleUrls: ['./routes-pie-chart.component.css']
})
export class RoutesPieChartComponent implements OnInit {
  public pieChart: any;
  public apiRouteData!: RouteData[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchRouteData();
  }

  fetchRouteData() {
    this.http.get('http://localhost:8000/toproutes/lastyear').subscribe(
      (data: any) => {
        this.apiRouteData = data.data.TopRoutesLastYear;
        this.createPieChart();
      },
      (error) => {
        console.error('Error fetching route data:', error);
      }
    );
  }

  createPieChart() {
    const labels = this.apiRouteData.map(item => item.routeId__route);
    const data = this.apiRouteData.map(item => item.total_count);

    this.pieChart = new Chart("RoutePieChart", {
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
            text: 'Top 5 Routes Last Year',
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
        // tooltips: {
        //   callbacks: {
        //     label: (tooltipItem: any) => `${labels[tooltipItem.index]}: ${data[tooltipItem.index]} counts`,
        //   }
        // }
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';

interface ActiveUserData {
  year: number;
  month: number;
  total_instances: number;
}

@Component({
  selector: 'app-worker-bar-chart',
  templateUrl: './worker-bar-chart.component.html',
  styleUrls: ['./worker-bar-chart.component.css']
})
export class WorkerBarChartComponent implements OnInit {
  public chart: any;
  public apiActiveUserData!: ActiveUserData[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchActiveUserData();
  }

  fetchActiveUserData() {
    this.http.get('http://localhost:8000/activeusers/lastyear').subscribe(
      (data: any) => {
        this.apiActiveUserData = data.data.ActiveUsersLastYearGroupedByMonth;
        this.createChart();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  createChart() {
    const data = this.apiActiveUserData.map(item => item.total_instances);

    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Active Users Last Year",
            data: data,
            backgroundColor: "rgba(255, 99, 132, 0.7)",
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true, // Allows you to set a fixed height
        plugins: {
          title: {
            display: true,
            text: "Active Users Last Year",
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
        scales: {
          x: {
            grid: {
              display: false // Hide X-axis grid lines for a cleaner look
            },
            ticks: {
              font: {
                size: 14
              }
            }
          },
          y: {
            grid: {
              color: 'rgba(0, 0, 0, 0.1)', // Add a light grey color to Y-axis grid lines
            },
            ticks: {
              font: {
                size: 14
              },
            }
          }
        },
        animation: {
          duration: 3000, // Set animation duration (milliseconds)
        },
        // tooltips: {
        //   mode: 'index',
        //   intersect: false,
        //   callbacks: {
        //     label: (tooltipItem: any) => `${tooltipItem.value} instances`,
        //   } 
        // } as ChartTooltipOptions
      }
    });
  }
}

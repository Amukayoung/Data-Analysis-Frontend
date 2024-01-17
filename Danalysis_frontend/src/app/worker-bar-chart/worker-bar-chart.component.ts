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
    const instancesData = this.apiActiveUserData.map(item => item.total_instances);
  
  
    this.http.get('http://localhost:8000/inlinequestionresponses/lastyear').subscribe(
      (response: any) => {
        const feedbackData = response.data.MonthlyInlineQuestionFeedbackLastYear.map((item: any) => item.count);
  
        
        const data = [instancesData, feedbackData];
  
        this.chart = new Chart("MyChart", {
          type: 'bar',
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
              {
                label: "Active Users Last Year",
                data: data[0],
                backgroundColor: "rgba(255, 99, 132, 0.7)",
              },
              {
                label: "Number of Inline Question Response",
                data: data[1],
                backgroundColor: "rgba(54, 162, 235, 0.7)", 
              },
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              title: {
                display: true,
                text: "Active Users and Responses Last Year",
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
                  display: false
                },
                ticks: {
                  font: {
                    size: 14
                  }
                }
              },
              y: {
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)',
                },
                ticks: {
                  font: {
                    size: 14
                  },
                }
              }
            },
            animation: {
              duration: 3000,
            },
          }
        });
      },
      (error) => {
        console.error('Error fetching inline question feedback data:', error);
      }
    );
  }
}

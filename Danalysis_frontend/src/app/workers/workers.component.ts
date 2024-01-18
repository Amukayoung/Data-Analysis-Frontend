import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {

  ageChart: any;
  organisationChart: any;
  routeChart: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8000/uniqueagecounts/')
      .subscribe((ageData: any) => {
        this.plotAgePieChart(ageData.data.UniqueAgeCounts);
      });

    this.http.get('http://localhost:8000/organisationworkercount/')
      .subscribe((orgData: any) => {
        this.plotOrganisationPieChart(orgData.data.OrganisationWorkerCounts);
      });

      this.http.get('http://localhost:8000/workerroutecount/')
      .subscribe((routeData: any) => {
        this.plotRouteBarChart(routeData.data.WorkerRouteCounts);
      });
  }

  plotRouteBarChart(workerRouteCounts: any[]): void {
    const labels = workerRouteCounts.map(entry => entry.route);
    const data = workerRouteCounts.map(entry => entry.worker_count);

    if (this.routeChart) {
      this.routeChart.destroy(); 
    }

    const ctx = document.getElementById('routeBarChart') as HTMLCanvasElement;
    this.routeChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Worker Count',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          x: {
            type: 'category',
            position: 'bottom',
            title: {
              display: true,
              text: 'Routes',
              font: {
                size: 18,
                weight: 'bold'
              }
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Worker Count',
              font: {
                size: 18,
                weight: 'bold'
              }
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: "Number of Workers Per Route",
            font: {
              size: 18,
              weight: 'bold',
            }
          },
          legend: {
            display: false,
          }
        },
        animation: {
          duration: 2000,
        }
      }
    });
  }

  plotAgePieChart(uniqueAgeCounts: any[]): void {
    const labels = uniqueAgeCounts.map(entry => entry.age);
    const data = uniqueAgeCounts.map(entry => entry.worker_count);

    this.ageChart = new Chart('agePieChart', {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
          ],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
            display: true,
            text: 'Workers Age Distributions ',
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

  plotOrganisationPieChart(organisationWorkerCounts: any[]): void {
    const labels = organisationWorkerCounts.map(entry => entry.organisation);
    const data = organisationWorkerCounts.map(entry => entry.worker_count);

    this.organisationChart = new Chart('organisationPieChart', {
      type: 'polarArea',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: this.generateRandomColors(organisationWorkerCounts.length),
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
            display: true,
            text: 'Organisation Worker Counts',
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

  generateRandomColors(count: number): string[] {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(this.getRandomColor());
    }
    return colors;
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';

interface QuestionFeedbackData {
  year: number;
  month: number;
  total_feedback: number;
}

interface TopAnsweredQuestion {
  name: string;
  feedback_count: number;
}

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  public chart: any;
  public apiQuestionFeedbackData!: QuestionFeedbackData[];
  public topAnsweredQuestions: TopAnsweredQuestion[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchTopAnsweredQuestions();
    this.fetchActiveUserData();
  }

  fetchTopAnsweredQuestions() {
    this.http.get('http://localhost:8000/topansweredinlinequestions').subscribe(
      (response: any) => {
        this.topAnsweredQuestions = response.data.TopAnsweredQuestions;
      },
      (error) => {
        console.error('Error fetching top answered questions:', error);
      }
    );
  }


  fetchActiveUserData() {
    this.http.get('http://localhost:8000/monthfeedbackcount').subscribe(
      (data: any) => {
        this.apiQuestionFeedbackData = data.data.MonthlyQuestionFeedbackCounts2023;
        this.createChart();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  createChart() {
    const instancesData = this.apiQuestionFeedbackData.map(item => item.total_feedback);
  
  
    this.http.get('http://localhost:8000/inlinequestionresponses/lastyear').subscribe(
      (response: any) => {
        const feedbackData = response.data.MonthlyInlineQuestionFeedbackLastYear.map((item: any) => item.count);
  
        
        const data = [instancesData, feedbackData];
  
        this.chart = new Chart("MyChart", {
          type: 'line',
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
              {
                label: "Number of Chapter Question Responses",
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
                text: "User Inline and Chapter Questions Stats",
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

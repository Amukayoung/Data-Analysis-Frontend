import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ApiResponse {
  total_count: number;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  workerCount: number = 0;
  inlineQuestionFeedbackCount: number = 0;
  chapterQuestionFeedbackCount: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchWorkerCount();
    this.fetchInlineQuestionFeedbackCount();
    this.fetchChapterQuestionFeedbackCount();
  }
  fetchWorkerCount() {
    this.http.get<ApiResponse>('http://localhost:8000/workercount/').subscribe(
      (data) => {
        this.workerCount = data.total_count;
      },
      (error) => {
        console.error('Error fetching worker count:', error);
      }
    );
  }

  fetchInlineQuestionFeedbackCount() {
    this.http.get<ApiResponse>('http://localhost:8000/inlinequestionfeedbackcount/').subscribe(
      (data) => {
        this.inlineQuestionFeedbackCount = data.total_count;
      },
      (error) => {
        console.error('Error fetching inline question feedback count:', error);
      }
    );
  }

  fetchChapterQuestionFeedbackCount() {
    this.http.get<ApiResponse>('http://localhost:8000/chapterquestionfeedbackcount/').subscribe(
      (data) => {
        this.chapterQuestionFeedbackCount = data.total_count;
      },
      (error) => {
        console.error('Error fetching chapter question feedback count:', error);
      }
    );
  }

}

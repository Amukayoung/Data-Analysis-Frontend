import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerBarChartComponent } from './worker-bar-chart.component';

describe('WorkerBarChartComponent', () => {
  let component: WorkerBarChartComponent;
  let fixture: ComponentFixture<WorkerBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerBarChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

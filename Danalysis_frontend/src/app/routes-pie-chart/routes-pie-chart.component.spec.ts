import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesPieChartComponent } from './routes-pie-chart.component';

describe('RoutesPieChartComponent', () => {
  let component: RoutesPieChartComponent;
  let fixture: ComponentFixture<RoutesPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutesPieChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutesPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

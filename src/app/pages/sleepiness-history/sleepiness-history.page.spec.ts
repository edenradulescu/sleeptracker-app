import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SleepinessHistoryPage } from './sleepiness-history.page';

describe('SleepinessHistoryPage', () => {
  let component: SleepinessHistoryPage;
  let fixture: ComponentFixture<SleepinessHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepinessHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

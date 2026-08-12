import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SleepHistoryPage } from './sleep-history.page';

describe('SleepHistoryPage', () => {
  let component: SleepHistoryPage;
  let fixture: ComponentFixture<SleepHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonBackButton,
  IonContent, 
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { SleepService } from '../../services/sleep.service';
import { OvernightSleepData } from '../../data/overnight-sleep-data';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';

@Component({
  selector: 'app-sleep-history',
  templateUrl: './sleep-history.page.html',
  styleUrls: ['./sleep-history.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonFab,
    IonFabButton,
    IonIcon
  ]
})
export class SleepHistoryPage implements OnInit {
  sleepData: OvernightSleepData[] = [];

  constructor(private sleepService: SleepService) {
    addIcons({ add });
  }

  ngOnInit() {
    // Get all overnight sleep data entries
    this.sleepData = SleepService.AllOvernightData;
  }

  // Helper function to format time
  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }
}
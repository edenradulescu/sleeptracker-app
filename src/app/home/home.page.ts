import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular/standalone';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { addIcons } from 'ionicons';
import { 
  bedOutline, 
  listOutline, 
  alertCircleOutline, 
  analyticsOutline, 
  moonOutline,
  timeOutline,
  cloudOutline,
  calendarOutline,
  speedometerOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol
  ],
})
export class HomePage {
  constructor(public sleepService: SleepService) {
    addIcons({ 
      bedOutline, 
      listOutline, 
      alertCircleOutline, 
      analyticsOutline,
      moonOutline,
      timeOutline,
      cloudOutline,
      calendarOutline,
      speedometerOutline
    });
  }

  ngOnInit() {
    console.log(this.allSleepData);
  }

  /* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
  get allSleepData() {
    return SleepService.AllSleepData;
  }

  /* Get the most recent overnight sleep data entry */
  get recentSleep(): OvernightSleepData | null {
    if (SleepService.AllOvernightData && SleepService.AllOvernightData.length > 0) {
      // Sort by logged date (most recent first)
      const sortedData = [...SleepService.AllOvernightData].sort((a, b) => 
        b.startTime.getTime() - a.startTime.getTime()
      );
      return sortedData[0];
    }
    return null;
  }
  
  /* Get the most recent sleepiness data entry */
  get recentSleepiness(): StanfordSleepinessData | null {
    if (SleepService.AllSleepinessData && SleepService.AllSleepinessData.length > 0) {
      // Sort by logged date (most recent first)
      const sortedData = [...SleepService.AllSleepinessData].sort((a, b) => 
        b.loggedAt.getTime() - a.loggedAt.getTime()
      );
      return sortedData[0];
    }
    return null;
  }

  /* Format time for display */
  formatTime(date: Date): string {
    return date ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '';
  }
  
  /* Format date and time for display */
  formatDateTime(date: Date): string {
    return date ? date.toLocaleString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) : '';
  }
}
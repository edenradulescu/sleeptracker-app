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
  IonIcon,
  IonBadge
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { SleepService } from '../../services/sleep.service';
import { StanfordSleepinessData } from '../../data/stanford-sleepiness-data';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';

@Component({
  selector: 'app-sleepiness-history',
  templateUrl: './sleepiness-history.page.html',
  styleUrls: ['./sleepiness-history.page.scss'],
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
    IonIcon,
    IonBadge
  ]
})
export class SleepinessHistoryPage implements OnInit {
  sleepinessData: StanfordSleepinessData[] = [];

  constructor(private sleepService: SleepService) {
    addIcons({ add });
  }

  ngOnInit() {
    // Get all sleepiness data entries
    this.sleepinessData = SleepService.AllSleepinessData;
    
    // Optional: Sort data by date (most recent first)
    this.sleepinessData.sort((a, b) => 
      b.loggedAt.getTime() - a.loggedAt.getTime()
    );
  }

  // Format date for display
  formatDateTime(date: Date): string {
    return date.toLocaleString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  // Get color based on sleepiness level
  getLevelColor(level: number): string {
    const colors: { [key: number]: string } = {
      1: 'success',
      2: 'success',
      3: 'medium',
      4: 'warning',
      5: 'warning',
      6: 'danger',
      7: 'danger'
    };
    return colors[level] || 'medium';
  }
}
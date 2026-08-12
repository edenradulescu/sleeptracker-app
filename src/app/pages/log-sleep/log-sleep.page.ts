import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  IonCardSubtitle, 
  IonCardContent,
  IonDatetime,
  IonButton,
  IonIcon,
  AlertController
} from '@ionic/angular/standalone';
import { SleepService } from '../../services/sleep.service';
import { OvernightSleepData } from '../../data/overnight-sleep-data';
import { addIcons } from 'ionicons';
import { 
  bedOutline, 
  sunnyOutline, 
  moonOutline, 
  cloudUploadOutline,
  arrowDownOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-log-sleep',
  templateUrl: './log-sleep.page.html',
  styleUrls: ['./log-sleep.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonDatetime,
    IonButton,
    IonIcon  // Make sure IonIcon is included here
  ]
})
export class LogSleepPage {
  // Default to current date for both times
  sleepStartDate: string = new Date().toISOString();
  sleepEndDate: string = new Date().toISOString();
  
  constructor(
    private sleepService: SleepService,
    private router: Router,
    private alertController: AlertController
  ) {
    // Add the new icons
    addIcons({ 
      bedOutline, 
      sunnyOutline, 
      moonOutline, 
      cloudUploadOutline,
      arrowDownOutline
    });
  }


  async logSleep() {
    // Convert string ISO dates to Date objects
    const sleepStart = new Date(this.sleepStartDate);
    const sleepEnd = new Date(this.sleepEndDate);
    
    // Basic validation
    if (sleepEnd.getTime() <= sleepStart.getTime()) {
      const alert = await this.alertController.create({
        header: 'Invalid Times',
        message: 'Wake-up time must be after bedtime',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    
    // Create new sleep data entry
    const newSleepEntry = new OvernightSleepData(sleepStart, sleepEnd);
    
    // Log the entry using the service
    this.sleepService.logOvernightData(newSleepEntry);
    
    // Navigate back to home
    this.router.navigateByUrl('/home');
  }
}
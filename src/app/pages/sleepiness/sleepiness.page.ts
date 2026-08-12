import { Component, OnInit } from '@angular/core';
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
  IonList,
  IonItem,
  IonLabel,
  IonDatetime,
  IonButton,
  IonRange,
  IonText,
  IonIcon,
  AlertController
} from '@ionic/angular/standalone';
import { SleepService } from '../../services/sleep.service';
import { StanfordSleepinessData } from '../../data/stanford-sleepiness-data';

@Component({
  selector: 'app-sleepiness',
  templateUrl: './sleepiness.page.html',
  styleUrls: ['./sleepiness.page.scss'],
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
    IonLabel,
    IonDatetime,
    IonButton,
    IonRange,
    IonText,
    IonIcon
  ]
})
export class SleepinessPage implements OnInit {
  sleepinessLevel: number = 1;
  loggedAt: string = new Date().toISOString();
  
  // Access the Stanford Sleepiness Scale values
  scaleValues = StanfordSleepinessData.ScaleValues;
  
  constructor(
    private sleepService: SleepService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Optional: Set default time to current moment
    this.loggedAt = new Date().toISOString();
  }

  // Get the description for the current sleepiness level
  get sleepinessDescription(): string { 
    return this.scaleValues[this.sleepinessLevel] || 'No description available'; 
  }

  async logSleepiness() {
    try {
      // Create new sleepiness data entry
      const sleepinessData = new StanfordSleepinessData(
        this.sleepinessLevel, 
        new Date(this.loggedAt)
      );
      
      // Log the entry using the service
      await this.sleepService.logSleepinessData(sleepinessData);
      
      // Show confirmation
      const alert = await this.alertController.create({
        header: 'Sleepiness Logged',
        message: 'Your sleepiness level has been recorded successfully.',
        buttons: ['OK']
      });
      await alert.present();
      
      // Navigate back to home
      this.router.navigateByUrl('/home');
    } catch (error) {
      // Handle any potential errors
      const errorAlert = await this.alertController.create({
        header: 'Error',
        message: 'Failed to log sleepiness. Please try again.',
        buttons: ['OK']
      });
      await errorAlert.present();
    }
  }
}
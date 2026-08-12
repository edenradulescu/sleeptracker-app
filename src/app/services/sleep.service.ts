import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SleepService {
  private static LoadDefaultData: boolean = true;
  public static AllSleepData: SleepData[] = [];
  public static AllOvernightData: OvernightSleepData[] = [];
  public static AllSleepinessData: StanfordSleepinessData[] = [];
  
  // Storage keys
  private readonly SLEEP_DATA_KEY = 'all_sleep_data';
  private readonly OVERNIGHT_SLEEP_KEY = 'overnight_sleep_data';
  private readonly SLEEPINESS_KEY = 'sleepiness_data';
  
  // Storage instance
  private _storage: Storage | null = null;
  
  // BehaviorSubjects for reactive updates
  private overnightDataSubject = new BehaviorSubject<OvernightSleepData[]>([]);
  private sleepinessDataSubject = new BehaviorSubject<StanfordSleepinessData[]>([]);
  
  // Observable streams
  public overnightData$ = this.overnightDataSubject.asObservable();
  public sleepinessData$ = this.sleepinessDataSubject.asObservable();

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // Create storage instance
    const storage = await this.storage.create();
    this._storage = storage;
    
    // Load saved data first
    await this.loadAllData();
    
    // Add default data only if no data exists and flag is set
    if (SleepService.LoadDefaultData && 
        SleepService.AllOvernightData.length === 0 && 
        SleepService.AllSleepinessData.length === 0) {
      this.addDefaultData();
      SleepService.LoadDefaultData = false;
      
      // Save default data to storage
      await this.saveAllData();
    }
  }

  private async loadAllData() {
    if (!this._storage) {
      console.error('Storage not initialized');
      return;
    }
    
    try {
      // Load overnight sleep data
      const overnightData = await this._storage.get(this.OVERNIGHT_SLEEP_KEY) || '[]';
      const parsedOvernightData = JSON.parse(overnightData);
      
      // Convert plain objects back to OvernightSleepData instances
      SleepService.AllOvernightData = parsedOvernightData.map((item: any) => {
        const sleepData = new OvernightSleepData(
          new Date(item.sleepStart),
          new Date(item.sleepEnd)
        );
        sleepData.id = item.id;
        sleepData.loggedAt = new Date(item.loggedAt);
        return sleepData;
      });
      
      // Load sleepiness data
      const sleepinessData = await this._storage.get(this.SLEEPINESS_KEY) || '[]';
      const parsedSleepinessData = JSON.parse(sleepinessData);
      
      // Convert plain objects back to StanfordSleepinessData instances
      SleepService.AllSleepinessData = parsedSleepinessData.map((item: any) => {
        const sleepinessData = new StanfordSleepinessData(
          item.loggedValue,
          new Date(item.loggedAt)
        );
        sleepinessData.id = item.id;
        return sleepinessData;
      });
      
      // Rebuild the combined AllSleepData array
      SleepService.AllSleepData = [
        ...SleepService.AllOvernightData,
        ...SleepService.AllSleepinessData
      ];
      
      // Update the subjects
      this.overnightDataSubject.next(SleepService.AllOvernightData);
      this.sleepinessDataSubject.next(SleepService.AllSleepinessData);
      
    } catch (error) {
      console.error('Failed to load sleep data', error);
      
      // Reset arrays if loading fails
      SleepService.AllSleepData = [];
      SleepService.AllOvernightData = [];
      SleepService.AllSleepinessData = [];
      
      this.overnightDataSubject.next([]);
      this.sleepinessDataSubject.next([]);
    }
  }

  private async saveAllData() {
    if (!this._storage) {
      console.error('Storage not initialized');
      return;
    }
    
    try {
      // Save overnight sleep data
      await this._storage.set(
        this.OVERNIGHT_SLEEP_KEY, 
        JSON.stringify(SleepService.AllOvernightData)
      );
      
      // Save sleepiness data
      await this._storage.set(
        this.SLEEPINESS_KEY, 
        JSON.stringify(SleepService.AllSleepinessData)
      );
      
      // Save combined data
      await this._storage.set(
        this.SLEEP_DATA_KEY, 
        JSON.stringify(SleepService.AllSleepData)
      );
      
    } catch (error) {
      console.error('Failed to save sleep data', error);
    }
  }

  private addDefaultData() {
    var goToBed = new Date();
    goToBed.setDate(goToBed.getDate() - 1); // set to yesterday
    goToBed.setHours(1, 3, 0); // 1:03am
    var wakeUp = new Date();
    wakeUp.setTime(goToBed.getTime() + 8 * 60 * 60 * 1000); // Sleep for exactly eight hours, waking up at 9:03am
    this.logOvernightData(new OvernightSleepData(goToBed, wakeUp)); // add that person was asleep 1am-9am yesterday

    var sleepinessDate = new Date();
    sleepinessDate.setDate(sleepinessDate.getDate() - 1); // set to yesterday
    sleepinessDate.setHours(14, 38, 0); // 2:38pm
    this.logSleepinessData(new StanfordSleepinessData(4, sleepinessDate)); // add sleepiness at 2pm

    goToBed = new Date();
    goToBed.setDate(goToBed.getDate() - 1); // set to yesterday
    goToBed.setHours(23, 11, 0); // 11:11pm
    wakeUp = new Date();
    wakeUp.setTime(goToBed.getTime() + 9 * 60 * 60 * 1000); // Sleep for exactly nine hours
    this.logOvernightData(new OvernightSleepData(goToBed, wakeUp));
  }

  public logOvernightData(sleepData: OvernightSleepData) {
    // Add to arrays (maintaining original behavior)
    SleepService.AllSleepData.push(sleepData);
    SleepService.AllOvernightData.push(sleepData);
    
    // Update the subject
    this.overnightDataSubject.next(SleepService.AllOvernightData);
    
    // Save to persistent storage
    this.saveAllData();
  }

  public logSleepinessData(sleepData: StanfordSleepinessData) {
    // Add to arrays (maintaining original behavior)
    SleepService.AllSleepData.push(sleepData);
    SleepService.AllSleepinessData.push(sleepData);
    
    // Update the subject
    this.sleepinessDataSubject.next(SleepService.AllSleepinessData);
    
    // Save to persistent storage
    this.saveAllData();
  }
  
  // New methods for deleting records
  
  public deleteOvernightData(id: string) {
    // Remove from arrays
    SleepService.AllOvernightData = SleepService.AllOvernightData.filter(item => item.id !== id);
    SleepService.AllSleepData = SleepService.AllSleepData.filter(item => item.id !== id);
    
    // Update the subject
    this.overnightDataSubject.next(SleepService.AllOvernightData);
    
    // Save to persistent storage
    this.saveAllData();
  }
  
  public deleteSleepinessData(id: string) {
    // Remove from arrays
    SleepService.AllSleepinessData = SleepService.AllSleepinessData.filter(item => item.id !== id);
    SleepService.AllSleepData = SleepService.AllSleepData.filter(item => item.id !== id);
    
    // Update the subject
    this.sleepinessDataSubject.next(SleepService.AllSleepinessData);
    
    // Save to persistent storage
    this.saveAllData();
  }
  
  // Clear all data (for testing purposes)
  public async clearAllData() {
    if (!this._storage) {
      console.error('Storage not initialized');
      return;
    }
    
    try {
      await this._storage.clear();
      
      // Reset arrays
      SleepService.AllSleepData = [];
      SleepService.AllOvernightData = [];
      SleepService.AllSleepinessData = [];
      
      // Update subjects
      this.overnightDataSubject.next([]);
      this.sleepinessDataSubject.next([]);
      
    } catch (error) {
      console.error('Failed to clear data', error);
    }
  }
}
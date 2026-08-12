import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'log-sleep',
    loadComponent: () => import('./pages/log-sleep/log-sleep.page').then( m => m.LogSleepPage)
  },
  {
    path: 'sleep-history',
    loadComponent: () => import('./pages/sleep-history/sleep-history.page').then( m => m.SleepHistoryPage)
  },
  {
    path: 'sleepiness',
    loadComponent: () => import('./pages/sleepiness/sleepiness.page').then( m => m.SleepinessPage)
  },
  {
    path: 'sleepiness-history',
    loadComponent: () => import('./pages/sleepiness-history/sleepiness-history.page').then( m => m.SleepinessHistoryPage)
  },
];

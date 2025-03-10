import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()), 
    provideFirebaseApp(() => initializeApp(
      { 
        projectId: "sjsumsa-d2131", 
        appId: "1:800776159141:web:6a0278b1d062ad291f724c", 
        storageBucket: "sjsumsa-d2131.firebasestorage.app", 
        apiKey: process.env['FIREBASE_API_KEY'], 
        authDomain: "sjsumsa-d2131.firebaseapp.com", 
        messagingSenderId: "800776159141",
        measurementId: "G-WQB86NKJEB" 
      }
    )), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore())
  ]
};

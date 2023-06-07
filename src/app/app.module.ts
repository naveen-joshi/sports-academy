import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { ActivityComponent } from './components/activity/activity.component';
import { SocialMediaLinksComponent } from './components/social-media-links/social-media-links.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroComponent,
    ActivityComponent,
    SocialMediaLinksComponent,
    ContactComponent,
    FooterComponent,
    AboutComponent,
    LoginComponent,
    HomeComponent,
    AdminDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyA_V7-bSwyrFeXPz3dzezDm3K7k7MmlawY',
      authDomain: 'the-sports-academy-3950c.firebaseapp.com',
      projectId: 'the-sports-academy-3950c',
      storageBucket: 'the-sports-academy-3950c.appspot.com',
      messagingSenderId: '1028105689719',
      appId: '1:1028105689719:web:e044f20976ec0c5c070472',
      measurementId: 'G-H98XR19MN1',
    }),
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

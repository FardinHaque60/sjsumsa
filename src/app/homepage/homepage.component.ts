import { Component } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from "../shared/footer/footer.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-homepage',
  imports: [NavbarComponent, FooterComponent, MatIconModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  // TODO, make api request to get prayer times
  adhanTimes = {
    Fajr: 'X:XX',
    Dhuhr: 'X:XX',
    ShafiAsr: 'X:XX',
    HanafiAsr: 'X:XX',
    Maghrib: 'X:XX',
    Isha: 'X:XX'
  };
  iqamahTimes = {
    Fajr: 'X:XX',
    Dhuhr: 'X:XX',
    ShafiAsr: 'X:XX',
    HanafiAsr: 'X:XX',
    Maghrib: 'X:XX',
    Isha: 'X:XX'
  }
}

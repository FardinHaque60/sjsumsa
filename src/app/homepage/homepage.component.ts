import { Component } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from "../shared/footer/footer.component";
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../service/api.service';
import { format } from 'path';

@Component({
  selector: 'app-homepage',
  imports: [NavbarComponent, FooterComponent, MatIconModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  constructor(private apiService: ApiService) {};

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
    Fajr: '6:35 AM',
    Dhuhr: '1:30 PM',
    Dhuhr2: '3:00 PM',
    ShafiAsr: '5:00 PM',
    HanafiAsr: '5:45 PM',
    Maghrib: 'Loading...',
    Isha: '8:45 PM'
  };

  formatDate(date: Date): string {
    const stringDate = date.toISOString().split('T')[0];
    // format the date into DD-MM-YYYY
    const dateParts = stringDate.split('-');
    const day = dateParts[2];
    const month = dateParts[1];
    const year = dateParts[0];
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };

  convertTo12HourFormat(time: string): string {
    const [hour, minute] = time.split(':');
    let hourInt = parseInt(hour);
    const period = hourInt >= 12 ? 'PM' : 'AM';
    const formattedHour = hourInt % 12 || 12; // Convert to 12-hour format
    const formattedTime = `${formattedHour}:${minute} ${period}`;
    return formattedTime;
  };

  getCurrentPSTDate(): Date {
    const currentDate = new Date();
    const utcOffset = -7; // UTC-7 for Pacific Standard Time (PST)
    const pstDate = new Date(currentDate.getTime() + (utcOffset * 60 * 60 * 1000));
    return pstDate;
  };

  ngOnInit() {
    const currentDate = this.getCurrentPSTDate();
    const formattedDate = this.formatDate(currentDate); // TODO add this to api url

    // get adhan times
    const prayerTimeApiURL = `https://api.aladhan.com/v1/timingsByCity/${formattedDate}?city=San%Jose&country=USA&method=2&shafaq=general&calendarMethod=UAQ`;
    this.apiService.getRegRequest(prayerTimeApiURL)
      .subscribe({
        next: (response) => {
          console.log(response);
          const prayerTimings = response.data.timings;
          /* 
            very strange bug in javascript where looping through the prayerTimings object 
            causes times to convert with AM append to it in browser console, but find in terminal browser.
            Assuming this is something wrong with how terminal and browser are running code, but going to 
            avoid this loop and just convert it individually below.
          */
          /* 
          for (const [key, value] of Object.entries(prayerTimings)) {
            const convertedTime = this.convertTo12HourFormat(value as string);
            prayerTimings[key] = convertedTime; 
          } */

          // set prayer times
          this.adhanTimes.Fajr = this.convertTo12HourFormat(prayerTimings.Fajr);
          this.adhanTimes.Dhuhr = this.convertTo12HourFormat(prayerTimings.Dhuhr);
          this.adhanTimes.ShafiAsr = this.convertTo12HourFormat(prayerTimings.Asr);
          this.adhanTimes.Maghrib = this.convertTo12HourFormat(prayerTimings.Maghrib);
          this.iqamahTimes.Maghrib = this.convertTo12HourFormat(prayerTimings.Maghrib);
          this.adhanTimes.Isha = this.convertTo12HourFormat(prayerTimings.Isha);
        },
        error: (error) => {
          console.error(error);
        }
      });

    // get hanafi asr time
    const hanafiAsrTimeApiURL = `https://api.aladhan.com/v1/timingsByCity/${formattedDate}?city=San%Jose&country=USA&method=2&shafaq=general&calendarMethod=UAQ&school=1`;
    this.apiService.getRegRequest(hanafiAsrTimeApiURL)
      .subscribe({
        next: (response) => {
          console.log(response);
          const prayerTimings = response.data.timings;

          this.adhanTimes.HanafiAsr = this.convertTo12HourFormat(prayerTimings.Asr);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }
}

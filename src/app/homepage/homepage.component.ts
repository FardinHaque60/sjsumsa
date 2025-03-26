import { Component } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from "../shared/footer/footer.component";
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-homepage',
  imports: [NavbarComponent, FooterComponent, MatIconModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  constructor(private apiService: ApiService) {};
  tempVar = "";

  adhanTimes = {
    fajr: 'X:XX',
    dhuhr: 'X:XX',
    shafiAsr: 'X:XX',
    hanafiAsr: 'X:XX',
    maghrib: 'X:XX',
    isha: 'X:XX'
  };
  iqamahTimes = {
    fajr: '6:35 AM',
    dhuhr: '1:30 PM',
    dhuhr2: '3:00 PM',
    shafiAsr: '5:00 PM',
    hanafiAsr: '5:45 PM',
    maghrib: 'Loading...',
    isha: '8:45 PM'
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

  fetchPrayerTimesFromApi() {
    console.log('fetching prayer times from api');
    const currentDate = this.getCurrentPSTDate();
    const formattedDate = this.formatDate(currentDate); // TODO add this to api url

    // get adhan times
    const prayerTimeApiURL = `https://api.aladhan.com/v1/timingsByCity/${formattedDate}?city=San%Jose&country=USA&method=2&shafaq=general&calendarMethod=UAQ`;
    this.apiService.getRegRequest(prayerTimeApiURL)
      .subscribe({
        next: (response) => {
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
          this.adhanTimes.fajr = this.convertTo12HourFormat(prayerTimings.Fajr);
          this.adhanTimes.dhuhr = this.convertTo12HourFormat(prayerTimings.Dhuhr);
          this.adhanTimes.shafiAsr = this.convertTo12HourFormat(prayerTimings.Asr);
          this.adhanTimes.maghrib = this.convertTo12HourFormat(prayerTimings.Maghrib);
          this.iqamahTimes.maghrib = this.convertTo12HourFormat(prayerTimings.Maghrib);
          this.adhanTimes.isha = this.convertTo12HourFormat(prayerTimings.Isha);
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
          const prayerTimings = response.data.timings;

          this.adhanTimes.hanafiAsr = this.convertTo12HourFormat(prayerTimings.Asr);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  ngOnInit() {
    // TODO add supabase methods to push prayer time to db if not current date
    // if it has current date just pull it from db
    // see homepage component.html for todo on adding tooltip
    this.fetchPrayerTimesFromApi();
    // write to db
    console.log("test call to db");
    this.apiService.getPrayerTimes()
      .subscribe({
        next: (response) => {
          this.tempVar = JSON.stringify(response);
        }
        , 
        error: (error) => {
          console.error(error);
        }
      });
  }
}

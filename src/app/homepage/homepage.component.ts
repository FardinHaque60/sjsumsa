import { ChangeDetectorRef, Component, PLATFORM_ID, Inject, InjectionToken } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from "../shared/footer/footer.component";
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../service/api.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-homepage',
  imports: [NavbarComponent, FooterComponent, MatIconModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
})
export class HomepageComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private cdRef: ChangeDetectorRef, private apiService: ApiService) {};
  todayDate: string = ''; // todays date in DD-MM-YYYY format

  adhanTimes = {
    fajr: 'X:XX',
    dhuhr: 'X:XX',
    shafiAsr: 'X:XX',
    hanafiAsr: 'X:XX',
    maghrib: 'X:XX',
    isha: 'X:XX',
  };
  iqamahTimes = {
    fajr: '6:35 AM',
    dhuhr: '1:30 PM',
    dhuhr2: '3:00 PM',
    shafiAsr: '5:00 PM',
    hanafiAsr: '5:45 PM',
    maghrib: 'XX:XX',
    isha: '8:45 PM'
  };

  // returns data object DD-MM-YYYY format for api
  formatDate(date: Date): string {
    const stringDate = date.toISOString().split('T')[0];
    const dateParts = stringDate.split('-');
    const day = dateParts[2];
    const month = dateParts[1];
    const year = dateParts[0];
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };

  // returns XX:XX AM/PM format in 12 hour time given 24 hour time string to render in frontend
  convertTo12HourTime(time: string): string {
    const [hour, minute] = time.split(':');
    let hourInt = parseInt(hour);
    const period = hourInt >= 12 ? 'PM' : 'AM';
    const formattedHour = hourInt % 12 || 12; // Convert to 12-hour format
    const formattedTime = `${formattedHour}:${minute} ${period}`;
    return formattedTime;
  };

  // returns date object of current date in PST
  getCurrentPSTDate(): Date {
    const currentDate = new Date();
    const utcOffset = -7; // UTC-7 for Pacific Standard Time (PST)
    const pstDate = new Date(currentDate.getTime() + (utcOffset * 60 * 60 * 1000));
    return pstDate;
  };

  // fetches prayer times from api and updates adhanTimes object
  async fetchPrayerTimesFromApi() {
    console.log('CLIENT: fetching prayer times from api');

    // get adhan times
    const prayerTimeApiUrl = `https://api.aladhan.com/v1/timingsByCity/${this.todayDate}?city=San%Jose&country=USA&method=2&shafaq=general&calendarMethod=UAQ`;
    await firstValueFrom(this.apiService.getRequest(prayerTimeApiUrl))
      .then((response) => {
        const prayerTimings = response.data.timings;
        this.adhanTimes.fajr = this.convertTo12HourTime(prayerTimings.Fajr);
        this.adhanTimes.dhuhr = this.convertTo12HourTime(prayerTimings.Dhuhr);
        this.adhanTimes.shafiAsr = this.convertTo12HourTime(prayerTimings.Asr);
        this.adhanTimes.maghrib = this.convertTo12HourTime(prayerTimings.Maghrib);
        this.iqamahTimes.maghrib = this.convertTo12HourTime(prayerTimings.Maghrib);
        this.adhanTimes.isha = this.convertTo12HourTime(prayerTimings.Isha);
      }).catch((error) => {
        console.error("CLIENT: error: ", error);
      });

    // get hanafi asr time
    const hanafiAsrTimeApiUrl = `https://api.aladhan.com/v1/timingsByCity/${this.todayDate}?city=San%Jose&country=USA&method=2&shafaq=general&calendarMethod=UAQ&school=1`;
    await firstValueFrom(this.apiService.getRequest(hanafiAsrTimeApiUrl))
      .then((response) => {
        const prayerTimings = response.data.timings;
        this.adhanTimes.hanafiAsr = this.convertTo12HourTime(prayerTimings.Asr);
      }).catch((error) => {
        console.error("CLIENT: error: ", error);
      });
  }

  // updates prayer times given db cache response
  async updatePrayerTimes(prayerTimesData: any) {
    const postPrayerTimesApiUrl = "api/postPrayerTimes";

    // if response is empty that means no db entry for today
    if (!prayerTimesData) {
      console.log("CLIENT: no prayer times for today cached, fetching from api");
      await this.fetchPrayerTimesFromApi();
      // add date field to prayerTimes
      const prayerTimes = {
        ...this.adhanTimes,
        date: this.todayDate
      }; 
      // post these prayer times to db
      this.apiService.postRequest(postPrayerTimesApiUrl, { prayerTimes })
        .subscribe({
          next: (response) => {
            console.log("CLIENT: prayer times updated in db: ", JSON.stringify(response));
          },
          error: (error) => {
            console.error(error);
          }
        });
    } else { // if prayer times data is in db, read it from db
      console.log("CLIENT: prayer times for today cached in db, loading times from db: \n" + JSON.stringify(prayerTimesData));
      this.adhanTimes.fajr = prayerTimesData.fajr;
      this.adhanTimes.dhuhr = prayerTimesData.dhuhr;
      this.adhanTimes.shafiAsr = prayerTimesData.shafiAsr;
      this.adhanTimes.hanafiAsr = prayerTimesData.hanafiAsr;
      this.adhanTimes.maghrib = prayerTimesData.maghrib;
      this.iqamahTimes.maghrib = prayerTimesData.maghrib;
      this.adhanTimes.isha = prayerTimesData.isha;
    }
  }

  ngOnInit() {
    /* TODO
     see homepage component.html for todo on adding tooltip
     delete entries for adhan times if old (add something to !prayerTimesData case for deleting everything in db before post request)
     add iqamah times to db
    */
    const currentDate = this.getCurrentPSTDate();
    this.todayDate = this.formatDate(currentDate); // initialize todayDate for all function calls to use
    const getPrayerTimesTodayApiUrl = "api/getPrayerTimes?todayDate=" + this.todayDate;

    console.log("CLIENT: checking db if it has prayer time for today (DD-MM-YYYY): ", this.todayDate);
    if (isPlatformBrowser(this.platformId)) {
      this.apiService.getRequest(getPrayerTimesTodayApiUrl)
        .subscribe({
          next: (response) => {
            this.updatePrayerTimes(response[0]);
          },
          error: (error) => {
            console.error(error);
          }
        });
    }
  }
}

'use client';
import './styles/styles.css'; 

import { useEffect, useState } from 'react';
import axios from 'axios';

import Image from "next/image";

import { adhanTimesInt, iqamahTimesInt, adhanApiInt, adhanDbInt } from "@/interfaces/prayerTimeInt";
import { getCurrentPSTDate, formatDate, convertTo12HourTime } from '@/lib/dates/dateHelper';

import ToolTip from "@/components/Tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Assuming you have a Footer component
import TowerBg from "@/assets/sjsu_tower_bg.jpg";
import SalamArt from "@/assets/salam_art.png"; 

export default function Home() {
  const [adhanTimes, setAdhanTimes] = useState<adhanTimesInt>({
    fajr: "X:XX",
    dhuhr: "X:XX",
    shafiAsr: "X:XX", 
    hanafiAsr: "X:XX", 
    maghrib: "X:XX",
    isha: "X:XX" 
  });

  const [iqamahTimes, setIqamahTimes] = useState<iqamahTimesInt>({
    fajr: '6:35 AM',
    dhuhr: '1:30 PM',
    dhuhr2: '3:00 PM',
    shafiAsr: '5:00 PM',
    hanafiAsr: '5:45 PM',
    maghrib: 'XX:XX',
    isha: '8:45 PM'
  });

  const [currentDate, setCurrentDate] = useState<string>("");

  // update the cache holding prayer time for today
  const updateAdhanTimesDb = async (adhanData: adhanApiInt, hanafiAsrTime: string) => {
    const prayerTimings = adhanData.timings;
    const adhanTimesObj = {
      fajr: prayerTimings.Fajr,
      dhuhr: prayerTimings.Dhuhr,
      shafiAsr: prayerTimings.Asr,
      hanafiAsr: hanafiAsrTime,
      maghrib: prayerTimings.Maghrib,
      isha: prayerTimings.Isha,
      date: adhanData.date.gregorian.date,
    } 
    try {
      const response = await axios.post("api/adhanTimes", adhanTimesObj);
      console.log("CLIENT: adhan times updated in db with result - ", response.data);
    } catch (error) {
      console.error('error updating adhan times in DB:', error);
    }
  };

  // sets the table for prayer time state variables
  const setPrayerTable = async (prayerTimes: adhanDbInt) => {
    // update state variables
    setAdhanTimes({
      ...adhanTimes,
      fajr: convertTo12HourTime(prayerTimes.fajr),
      dhuhr: convertTo12HourTime(prayerTimes.dhuhr),
      shafiAsr: convertTo12HourTime(prayerTimes.shafiAsr),
      hanafiAsr: convertTo12HourTime(prayerTimes.hanafiAsr),
      maghrib: convertTo12HourTime(prayerTimes.maghrib),
      isha: convertTo12HourTime(prayerTimes.isha)
    });
    setIqamahTimes({
      ...iqamahTimes,
      maghrib: convertTo12HourTime(prayerTimes.maghrib),
    });
  };

  // fetches prayer times from api and calles updateAdhanTimesDb to update db
  const fetchPrayerTimes = async (prayerTimesApiUrl: string, hanafiAsrApiUrl: string) => {
    try {
      const response = await axios.get(prayerTimesApiUrl);
      const hanafiAsrResponse = await axios.get(hanafiAsrApiUrl);

      let adhanData = response.data.data;
      const hanafiAsrTime = hanafiAsrResponse.data.data.timings.Asr;

      // update cache in db
      const deleteResult = await axios.delete("api/adhanTimes"); // delete old entry
      if (!deleteResult.data.success) {
        console.error("CLIENT: error deleting old adhan times from db");
      }
      console.log("CLIENT: old adhan times deleted from db with result - ", deleteResult.data);
      updateAdhanTimesDb(adhanData, hanafiAsrTime);

      // set table render of prayer times
      adhanData = adhanData.timings;
      const prayerTimesObj = {
        fajr: adhanData.Fajr,
        dhuhr: adhanData.Dhuhr,
        shafiAsr: adhanData.Asr,
        hanafiAsr: hanafiAsrTime,
        maghrib: adhanData.Maghrib,
        isha: adhanData.Isha,
      }
      setPrayerTable(prayerTimesObj);

    } catch (error) {
      console.error('CLIENT: error fetching prayer times from api:', error);
    } 
  };

  useEffect(() => {
    const currentDate = getCurrentPSTDate();
    setCurrentDate(currentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }))
    const todayDate = formatDate(currentDate);
    const getPrayerTimesTodayApiUrl = "api/adhanTimes?todayDate=" + todayDate;
    const prayerTimesApiUrl = `https://api.aladhan.com/v1/timingsByCity/${todayDate}?city=San%Jose&country=USA&method=2&shafaq=general&calendarMethod=UAQ`;
    const hanafiAsrApiUrl = `https://api.aladhan.com/v1/timingsByCity/${todayDate}?city=San%Jose&country=USA&method=2&shafaq=general&calendarMethod=UAQ&school=1`

    const checkCache = async () => {
      const response = await axios.get(getPrayerTimesTodayApiUrl); // check db if entry for today exists
      const adhanTimesData = response.data;
      if (adhanTimesData.success) { // if entry exists, set table with response data
        console.log("CLIENT: loading adhan times from db");
        setPrayerTable(adhanTimesData.data);
      } else { // if entry does not exist fetch new entry from api
        fetchPrayerTimes(prayerTimesApiUrl, hanafiAsrApiUrl);
      }
    };

    checkCache();
  }, []);

  return (
    <div>
      <div className="relative h-screen overflow-hidden">
        <Image 
          className="absolute inset-0 w-full h-full object-cover animate-zoom-loop"
          src={TowerBg}
          alt="SJSU Tower Background"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <Navbar />

        <div className="text-amber-50 absolute top-1/3 left-8 z-20">
          <h1 className="text-</p>4xl sm:text-5xl lg:text-6xl font-bold mb-4">Welcome to SJSU MSA</h1>
          <p className="text-lg sm:text-xl lg:text-2xl">
            <a href="https://www.google.com/maps/place/SJSU/@37.3351874,-121.8834954,834m/data=!3m2!1e3!4b1!4m6!3m5!1s0x808fccb864de43d5:0x397ffe721937340e!8m2!3d37.3351874!4d-121.8810715!16zL20vMDIxOTk2?entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoASAFQAw%3D%3D" target="_blank" className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg> One Washington Square, San Jose, CA 95192
            </a>
          </p>
        </div>

        <Image
          src={SalamArt} alt="Salam Art" 
          className="absolute top-7/23 right-10 z-20 w-1/3 max-w-sm hidden sm:block" 
        />
      </div>
        
      {/* Section 1: Daily Prayer Info */}
      <section className="w-full py-16 bg-white text-gray-800 flex justify-center">
          <div className="max-w-4xl text-center">

            <div className="flex justify-center">
              <h2 className="text-3xl font-bold mb-0.1">Daily Prayer Info</h2> 
              <ToolTip text="Prayer times use the ICNA calculation">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
              </ToolTip> 
            </div>

            <p className="text-xl mb-6">{currentDate}</p>
            <div className="flex flex-row items-center justify-evenly space-x-10">

              <div className="text-lg">
                <table className="w-full text-left table-auto min-w-max">

                  <thead>
                    <tr>
                      <th className="p-4 border-b border-slate-300 bg-slate-50">
                        <p className="pr-12 block font-normal leading-none text-slate-500">
                          Prayer
                        </p>
                      </th>
                      <th className="p-4 border-b border-slate-300 bg-slate-50">
                        <p className="block font-normal leading-none text-slate-500">
                          Adhan
                        </p>
                      </th>
                      <th className="p-4 border-b border-slate-300 bg-slate-50">
                        <p className="block font-normal leading-none text-slate-500">
                          Iqamah
                        </p>
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    <tr className="hover:bg-slate-50">
                      <td className="border-b border-slate-200">
                        <div className="flex items-center">
                          <Image
                            src="/images/fajr_icon.png"
                            width={32}
                            height={32} 
                            alt="fajr_icon"
                            className="relative inline-block h-8 w-8 !rounded-full object-contain object-center p-1" 
                          />
                          <p className="block font-sans antialiased font-bold leading-normal text-blue-gray-900">
                            Fajr
                          </p>
                        </div>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-slate-800">
                          {adhanTimes.fajr}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-slate-800">
                          {iqamahTimes.fajr}
                        </p>
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50">
                      <td className="border-b border-slate-200">
                        <div className="flex items-center">
                          <Image
                            src="/images/dhuhr_icon.png" 
                            width={32}
                            height={32} 
                            alt="dhuhr_icon"
                            className="relative inline-block h-8 w-8 !rounded-full object-contain object-center p-1"
                          />
                          <p className="block font-sans antialiased font-bold leading-normal text-blue-gray-900">
                            Dhuhr
                          </p>
                        </div>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="block  text-slate-800">
                          {adhanTimes.dhuhr}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-slate-800">
                          {iqamahTimes.dhuhr}
                        </p>
                        <p className="block text-slate-800">
                          {iqamahTimes.dhuhr2}
                        </p>
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50">
                      <td className="border-b border-slate-200">
                        <div className="flex items-center">
                          <Image
                            src="/images/asr_icon.png"
                            width={32}
                            height={32} 
                            alt="asr_icon"
                            className="relative inline-block h-8 w-8 !rounded-full object-contain object-center p-1" 
                          />
                          <p className="block font-sans antialiased font-bold leading-normal text-blue-gray-900">
                            Asr
                          </p>
                        </div>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-slate-800">
                          {adhanTimes.shafiAsr} (Shafi)
                        </p>
                        <p className="block text-slate-800">
                          {adhanTimes.hanafiAsr} (Hanafi)
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-slate-800">
                          {iqamahTimes.shafiAsr} (Shafi)
                        </p>
                        <p className="block text-slate-800">
                          {iqamahTimes.hanafiAsr} (Hanafi)
                        </p>
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50">
                      <td className="border-b border-slate-200">
                        <div className="flex items-center">
                          <Image
                            src="/images/maghrib_icon.png"
                            width={32}
                            height={32} 
                            alt="maghrib_icon"
                            className="relative inline-block h-8 w-8 !rounded-full object-contain object-center p-1"
                          />
                          <p className="block font-sans antialiased font-bold leading-normal text-blue-gray-900">
                            Maghrib
                          </p>
                        </div>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-slate-800">
                          {adhanTimes.maghrib}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-slate-800">
                          {iqamahTimes.maghrib}
                        </p>
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50">
                      <td className="">
                        <div className="flex items-center">
                          <Image src="/images/isha_icon.png"
                            width={32}
                            height={32} 
                            alt="isha_icon" 
                            className="relative inline-block h-8 w-8 !rounded-full object-contain object-center p-1" 
                          />
                          <p className="block font-sans antialiased font-bold leading-normal text-blue-gray-900">
                            Isha
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="block text-slate-800">
                          {adhanTimes.isha}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="block text-slate-800">
                          {iqamahTimes.isha}
                        </p>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>      

              <div className="items-start border-l border-gray-300 h-64"></div>

              <div className="flex flex-col items-start text-left"> 
                <h2 className="text-2xl">Prayer Location</h2>
                <p className="text-left">Prayer space available in BBC 001 (Women&apos;s) & 002 (Men&apos;s)</p>

              </div>
            </div>
          </div>
      </section>
        
      {/* Section 2 events section info */}
      <section className="w-full py-16 bg-gray-100 text-gray-800 flex justify-center">
          <div className="max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Section 2</h2>
            <p className="text-lg">section for events</p>
          </div>
      </section>
        
      {/* Section 3 resources section info */}
      <section className="w-full py-16 bg-white text-gray-800 flex justify-center">
          <div className="max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Section 3</h2>
            <p className="text-lg">section for resources (roommate spreadsheet?, student handbook, etc.)</p>
          </div>
      </section>  

      <Footer />
    </div>
  );
}

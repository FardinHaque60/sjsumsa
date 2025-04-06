'use client';
import './styles/styles.css'; 

import { useEffect, useState } from 'react';
import axios from 'axios';

import Image from "next/image";

import { adhanTimesInt, iqamahTimesInt, adhanApiInt, adhanDbInt } from "@/interfaces/prayerTimeInt";
import { getCurrentPSTDate, formatDate, convertTo12HourTime, convertTo24HourTime } from '@/lib/dates/dateHelper';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Assuming you have a Footer component
import TowerBg from "@/assets/sjsu_tower_bg.jpg";
import SalamArt from "@/assets/salam_art.png"; 
import checkAdminStatus from '@/lib/admin/adminStatus';

export default function Home() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [editingIqamah, setEditingIqamah] = useState<boolean>(false);
  const [savingIqamah, setSavingIqamah] = useState<boolean>(false);
  const [adhanTimes, setAdhanTimes] = useState<adhanTimesInt>({
    fajr: "X:XX",
    dhuhr: "X:XX",
    shafiAsr: "X:XX", 
    hanafiAsr: "X:XX", 
    maghrib: "X:XX",
    isha: "X:XX" 
  });

  const [iqamahTimes, setIqamahTimes] = useState<iqamahTimesInt>({
    fajr: "X:XX",
    dhuhr: "X:XX",
    dhuhr2: "X:XX",
    shafiAsr: "X:XX", 
    hanafiAsr: "X:XX", 
    maghrib: "X:XX",
    isha: "X:XX" 
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
      const response = await axios.post("api/prayerTimes/adhan", adhanTimesObj);
      console.log("CLIENT: adhan times updated in db with result - ", response.data);
    } catch (error) {
      console.error('error updating adhan times in DB:', error);
    }
  };

  // sets the table for prayer time state variables
  const setPrayerTable = async (prayerTimes: adhanDbInt) => {
    // update state variables
    setAdhanTimes({
      fajr: convertTo12HourTime(prayerTimes.fajr),
      dhuhr: convertTo12HourTime(prayerTimes.dhuhr),
      shafiAsr: convertTo12HourTime(prayerTimes.shafiAsr),
      hanafiAsr: convertTo12HourTime(prayerTimes.hanafiAsr),
      maghrib: convertTo12HourTime(prayerTimes.maghrib),
      isha: convertTo12HourTime(prayerTimes.isha)
    });
    const iqamahTimesData = await axios.get("api/prayerTimes/iqamah/read");
    const iqamahTimes = iqamahTimesData.data.data;
    setIqamahTimes({
      fajr: iqamahTimes.fajr,
      dhuhr: iqamahTimes.dhuhr,
      dhuhr2: iqamahTimes.dhuhr2,
      shafiAsr: iqamahTimes.shafiAsr,
      hanafiAsr: iqamahTimes.hanafiAsr,
      maghrib: convertTo12HourTime(prayerTimes.maghrib),
      isha: iqamahTimes.isha
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
      const deleteResult = await axios.delete("api/prayerTimes/adhan"); // delete old entry
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

  const handleCancelIqamahChanges = async () => {
    // make browser alert that saves do you want to continue
    const confirmCancel = window.confirm("Are you sure you want to cancel changes?");
    if (!confirmCancel) {
      return;
    }
    // get old iqamah times to reload back in
    const oldIqamahTimes = await axios.get("api/prayerTimes/iqamah/read");
    const oldIqamahTimesData = oldIqamahTimes.data.data;
    setIqamahTimes({
      ...oldIqamahTimesData,
      fajr: oldIqamahTimesData.fajr,
      dhuhr: oldIqamahTimesData.dhuhr,
      dhuhr2: oldIqamahTimesData.dhuhr2,
      shafiAsr: oldIqamahTimesData.shafiAsr,
      hanafiAsr: oldIqamahTimesData.hanafiAsr,
      isha: oldIqamahTimesData.isha
    });
    setEditingIqamah(false);
  };

  const handleSaveIqamahChanges = async () => {
    setSavingIqamah(true);
    try {
      const response = await axios.put("api/prayerTimes/iqamah/write", iqamahTimes);
      if (response.data.success) {
        setSavingIqamah(false);
        setEditingIqamah(false);
        window.alert("Iqamah times saved successfully");
      }
    } catch (error) {
      console.error('CLIENT: error saving iqamah times to api:', error);
    } finally {
      setSavingIqamah(false);
    }
  }

  useEffect(() => {
    const currentDate = getCurrentPSTDate();
    setCurrentDate(currentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }))
    const todayDate = formatDate(currentDate);
    const getPrayerTimesTodayApiUrl = "api/prayerTimes/adhan?todayDate=" + todayDate;
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
    checkAdminStatus().then((isAdmin) => {
      setIsAdmin(isAdmin);
    });

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

            <h2 className="text-3xl font-bold mb-0.1">Daily Prayer Info</h2>
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
                        <div className="flex flex-row gap-1">
                          <p className="block font-normal leading-none text-slate-500">
                            Adhan
                          </p>
                        </div>
                      </th>
                      <th className="p-4 border-b border-slate-300 bg-slate-50">
                        <div className="flex flex-row gap-1">
                          <p className="block font-normal leading-none text-slate-500">
                            Iqamah
                          </p>
                          {isAdmin &&
                            (editingIqamah ?
                              (!savingIqamah ?
                                <div className="flex flex-row gap-1">
                                  <svg onClick={handleSaveIqamahChanges} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-green-500 cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                  </svg>
                                  <svg onClick={handleCancelIqamahChanges} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-red-500 cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                  </svg>
                                </div> 
                                
                              :
                              <div className="grid ml-2 place-items-center overflow-x-scroll rounded-lg lg:overflow-visible">
                                <svg className="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
                                  width="20" height="20">
                                  <path
                                  d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                                  stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  <path
                                  d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                                  stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900">
                                  </path>
                                </svg>
                              </div>)
                            :
                              <svg onClick={() => setEditingIqamah(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inline-block size-4 mx-1 text-blue-700 cursor-pointer"> 
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" /> 
                              </svg>)
                          }
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    <tr className="hover:bg-slate-50">
                      <td className="border-b border-slate-200">
                        <div className="flex items-center">
                          <Image
                            src="/images/prayer_icons/fajr_icon.png"
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
                            {editingIqamah ? 
                            <input 
                              type="time" 
                              value={convertTo24HourTime(iqamahTimes.fajr)} 
                              onChange={(e) => setIqamahTimes({ ...iqamahTimes, fajr: convertTo12HourTime(e.target.value) })} 
                              className="border border-gray-300 rounded-md p-1 cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            :
                            <p className="block text-slate-800">{iqamahTimes.fajr}</p>
                            }
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50">
                      <td className="border-b border-slate-200">
                        <div className="flex items-center">
                          <Image
                            src="/images/prayer_icons/dhuhr_icon.png" 
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
                            {editingIqamah ? 
                            <div className="flex flex-col">
                              <input 
                                type="time" 
                                value={convertTo24HourTime(iqamahTimes.dhuhr)} 
                                onChange={(e) => setIqamahTimes({ ...iqamahTimes, dhuhr: convertTo12HourTime(e.target.value) })} 
                                className="border border-gray-300 rounded-md p-1 cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <input 
                                type="time" 
                                value={convertTo24HourTime(iqamahTimes.dhuhr2)} 
                                onChange={(e) => setIqamahTimes({ ...iqamahTimes, dhuhr2: convertTo12HourTime(e.target.value) })} 
                                className="border border-gray-300 rounded-md p-1 cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            :
                            <>
                              <p className="block text-slate-800">{iqamahTimes.dhuhr}</p>
                              <p className="block text-slate-800">{iqamahTimes.dhuhr2}</p>
                            </>
                            }
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50">
                      <td className="border-b border-slate-200">
                        <div className="flex items-center">
                          <Image
                            src="/images/prayer_icons/asr_icon.png"
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
                            {editingIqamah ? 
                            <div className="flex flex-col">
                              <input 
                                type="time" 
                                value={convertTo24HourTime(iqamahTimes.shafiAsr)} 
                                onChange={(e) => setIqamahTimes({ ...iqamahTimes, shafiAsr: convertTo12HourTime(e.target.value) })} 
                                className="border border-gray-300 rounded-md p-1 cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <input 
                                type="time" 
                                value={convertTo24HourTime(iqamahTimes.hanafiAsr)} 
                                onChange={(e) => setIqamahTimes({ ...iqamahTimes, hanafiAsr: convertTo12HourTime(e.target.value) })} 
                                className="border border-gray-300 rounded-md p-1 cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            :
                            <>
                              <p className="block text-slate-800">{iqamahTimes.shafiAsr} (Shafi)</p>
                              <p className="block text-slate-800">{iqamahTimes.hanafiAsr} (Hanafi)</p>
                            </>
                            }
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50">
                      <td className="border-b border-slate-200">
                        <div className="flex items-center">
                          <Image
                            src="/images/prayer_icons/maghrib_icon.png"
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
                        <p className="block text-slate-800">{iqamahTimes.maghrib}</p>
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50">
                      <td className="">
                        <div className="flex items-center">
                          <Image src="/images/prayer_icons/isha_icon.png"
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
                            {editingIqamah ? 
                            <input 
                              type="time" 
                              value={convertTo24HourTime(iqamahTimes.isha)} 
                              onChange={(e) => setIqamahTimes({ ...iqamahTimes, isha: convertTo12HourTime(e.target.value) })} 
                              className="border border-gray-300 rounded-md p-1 cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            :
                            <p className="block text-slate-800">{iqamahTimes.isha}</p>
                            }
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

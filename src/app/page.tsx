'use client';
import './styles/styles.css';

import { useEffect, useState } from 'react';

import Image from "next/image";

import { getCurrentPSTDate } from '@/lib/dates/dateHelper';
import { checkAdminStatus } from '@/lib/admin/adminStatus';

import ToolTip from "@/components/Tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrayerTable from "@/components/PrayerTable";

import TowerBg from "@/assets/sjsu_tower_bg.jpg";
import SalamArt from "@/assets/salam_art.png";
import EventsContent from "@/components/EventsContent";

export default function Home() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [displayDate, setDisplayDate] = useState<string>("");

  useEffect(() => {
    const currentDate = getCurrentPSTDate();
    setDisplayDate(currentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));

    checkAdminStatus().then((status) => {
      setIsAdmin(status);
    });
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

      {/* daily Prayer Info */}
      <section className="w-full py-16 bg-white text-gray-800 flex justify-center">
        <div className="max-w-4xl text-center">

          <div className="flex justify-center">
            <h2 className="text-3xl font-bold mb-0.1">Daily Prayer Info</h2>
            <ToolTip text="Prayer times are for San Jose, CA and use the ICNA calculation">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
            </ToolTip>
          </div>

          <p className="text-xl mb-6">{displayDate}</p>
          <div className="flex flex-row items-center justify-evenly space-x-10">

            <PrayerTable isAdmin={isAdmin} />

            <div className="items-start border-l border-gray-300 h-64"></div>

            <div className="flex flex-col items-start text-left">
              <h2 className="text-2xl">Prayer Location</h2>
              <p className="text-left">Prayer space available in BBC 001 (Women&apos;s) & 002 (Men&apos;s)</p>

            </div>
          </div>
        </div>
      </section>

      {/* events section info */}
      <section className="w-full py-16 bg-gray-100 text-gray-800 flex justify-center">
        <EventsContent isAdmin={isAdmin}/>
      </section>

      {/* resources section info */}
      <section className="w-full py-16 bg-white text-gray-800 flex justify-center">
        <div className="max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Student Resources</h2>
          <p className="text-lg mb-5">
            Useful links and resources to help students succeed and connect
          </p>

          <ul className="space-y-6">
            {/* Student Handbook */}
            <li>
              <a
                href="/msa_handbook.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-xl"
              >
                📘 Student Handbook (PDF)
              </a>
            </li>

            {/* Roommate Finder */}
            <li>
              <p className="text-xl font-semibold mt-2">🏠 Roommate Finder:</p>
              <a
                href="https://docs.google.com/spreadsheets/d/your-brothers-sheet-link"
                target="_blank"
                className="text-blue-600 underline block mb-2"
              >
                Brothers/Sisters Spreadsheet
              </a>
            </li>

            {/* Restaurants Nearby */}
            <li>
              <p className="text-xl font-semibold">🍽️ Restaurants Nearby:</p>
              <a
                href="https://www.google.com/maps/search/halal+restaurants+near+SJSU/"
                target="_blank"
                className="text-blue-600 underline block"
              >
                View Halal Restaurants on Google Maps
              </a>
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  );
}

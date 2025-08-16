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
import Modal from '@/components/Modal';

import TowerBg from "@/assets/sjsu_tower_bg.jpg";
import SalamArt from "@/assets/salam_art.png";
import EventsContent from "@/components/EventsContent";

export default function Home() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [displayDate, setDisplayDate] = useState<string>("");
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [prayerRoomVideoOpen, setPrayerRoomVideoOpen] = useState<boolean>(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const slides = [{
    title: "Welcome to SJSU MSA",
    content: (
      <p className="text-lg sm:text-xl lg:text-2xl">
        <a href="https://www.google.com/maps/place/SJSU/@37.3351874,-121.8834954,834m/data=!3m2!1e3!4b1!4m6!3m5!1s0x808fccb864de43d5:0x397ffe721937340e!8m2!3d37.3351874!4d-121.8810715!16zL20vMDIxOTk2?entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoASAFQAw%3D%3D" target="_blank" className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg> One Washington Square, San Jose, CA 95192
        </a>
      </p>
    )
  },
  {
    title: "Check out our upcoming events!",
    content: (
      <div>
        <p className="text-lg sm:text-xl lg:text-2xl mb-4">
          Join us for exciting events throughout the semester!
        </p>
        <button
          onClick={() => scrollToSection('events-section')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          View Events
        </button>
      </div>
    )
  },
  {
    title: "Join The Community",
    content: (
      <div>
        <p className="text-lg sm:text-xl lg:text-2xl mb-4">
          Check out resources and programs to get involved
        </p>
        <button
          onClick={() => scrollToSection('resources-section')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Explore Resources
        </button>
      </div>
    )
  }
  ];

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

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

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

        <div className="text-amber-50 absolute top-1/3 left-8 z-20 transition-opacity w-full h-100">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 pr-10 ${currentSlide === index
                ? "translate-x-0 opacity-100 absolute"
                : " -translate-x-full opacity-0 absolute"
                }`}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">{slide.title}</h1>
              {slide.content}
            </div>
          ))}

          <div className="flex space-x-2 absolute bottom-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 cursor-pointer ${currentSlide === index ? "bg-white" : "bg-gray-400"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <Image
          src={SalamArt} alt="Salam Art"
          className="absolute top-7/23 right-10 z-20 w-1/3 max-w-sm hidden md:block"
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
          <div className="flex flex-col sm:flex-row items-center sm:space-x-10 sm:overflow-x-auto">
            <PrayerTable isAdmin={isAdmin} />

            <div className="flex flex-col items-start mt-6 mx-5 sm:mt-0 sm:mx-0">
              <h2 className="text-2xl">Prayer Location</h2>
              <p className="text-left">Prayer space available in BBC 001 (Women&apos;s) & 002 (Men&apos;s)</p>
              <br></br>
              <p onClick={() => setPrayerRoomVideoOpen(true)} className="text-blue-600 underline text-lg cursor-pointer">
                Video Directions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* events section info */}
      <section id="events-section" className="w-full py-16 bg-gray-100 text-gray-800 flex justify-center scroll-mt-16">
        <EventsContent isAdmin={isAdmin} />
      </section>

      {/* resources section info */}
      <section id="resources-section" className="w-full py-16 bg-white text-gray-800 flex justify-center scroll-mt-16">
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

            {/* Sign up */}
            <li>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeNDYc8FBP59NyUqiJyV7VNyVgXmt0kmZrkin2puytCHz_o7A/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-xl"
              >
                📝 Membership form for the SJSU MSA
              </a>
            </li>

            {/* Linktree */}
            <li>
              <a
                href="https://linktr.ee/SJSUMSA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-xl"
              >
                🌲 Check out our linktree for more!
              </a>
            </li>
          </ul>
        </div>
      </section>

      <Footer />

      <Modal isOpen={prayerRoomVideoOpen}>
        <div className="flex flex-col bg-white rounded-lg max-w-3xl">
          <svg
            onClick={() => setPrayerRoomVideoOpen(false)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer self-end mr-2 mt-2 mb-1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
          <video controls preload="metadata" className="w-80 h-auto px-6 pb-6">
            <source src="/prayer_room_location.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </Modal>
    </div>
  );
}
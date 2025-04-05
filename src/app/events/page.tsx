'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Image from "next/image";

import TowerBg from "@/assets/sjsu_tower_bg.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Events() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error("CLIENT: error fetching events:", error);
    }
  };

  useEffect(() => {
    // TODO implementing fetching events from DB
    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content */}
      <div className="flex-grow">
        {/* Background Image and Navbar */}
        <div className="flex flex-col items-center justify-end relative h-85 overflow-hidden">
          <Image 
            className="absolute inset-0 w-full h-full object-cover animate-zoom-loop"
            src={TowerBg}
            alt="Event Page Background"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>

          <Navbar />

          <h1 className="z-20 text-amber-50 text-4xl sm:text-5xl lg:text-6xl font-bold mb-8">Events</h1>
        </div>
        
        {/* Event Information */}
        <div className="w-full flex items-start justify-center py-8">
          <p className="text-lg">insert event information here</p>
          <p> {events} </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

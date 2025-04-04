'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Image from "next/image";

import TowerBg from "@/assets/sjsu_tower_bg.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Assuming you have a Footer component

export default function Home() {
  useEffect(() => {
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="flex flex-col items-center justify-end relative h-85 overflow-hidden">
          <Image 
          className="absolute inset-0 w-full h-full object-cover animate-zoom-loop"
          src={TowerBg}
          alt="SJSU Tower Background"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>

          <Navbar />

          <h1 className="z-20 text-amber-50 text-4xl sm:text-5xl lg:text-6xl font-bold mb-8">Events</h1>

          {/* <div className="absolute bottom-4 left-8 z-20 text-amber-50">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">Welcome to SJSU MSA</h1>
          </div> */}
        </div>
        
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
      </div>

      <Footer />
    </div>
  );
}

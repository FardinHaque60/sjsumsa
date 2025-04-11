import Image from "next/image";

import TowerBg from "@/assets/sjsu_tower_bg.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Resources() {
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

          <h1 className="z-20 text-amber-50 text-4xl sm:text-5xl lg:text-6xl font-bold mb-8">Resources</h1>
        </div>
        
        {/* Resources Information */}
        <div className="flex justify-center p-8">
          <p className="text-lg text-center">insert resources information here (prayer room location, student handbook, roomate finder, etc.)</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

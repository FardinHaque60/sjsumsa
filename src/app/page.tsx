import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Assuming you have a Footer component
import TowerBg from "@/assets/sjsu_tower_bg.jpg";
import SalamArt from "@/assets/salam_art.png"; 
import FajrIcon from "@/assets/fajr_icon.png"; 
import DhuhrIcon from "@/assets/dhuhr_icon.png";
import AsrIcon from "@/assets/asr_icon.png"; 
import MaghribIcon from "@/assets/maghrib_icon.png";
import IshaIcon from "@/assets/isha_icon.png"; 

export default function Home() {
  const adhanTimes = {
    fajr: "5:30 AM",
    dhuhr: "1:00 PM",
    shafiAsr: "3:30 PM", 
    hanafiAsr: "4:30 PM", 
    maghrib: "6:00 PM",
    isha: "7:30 PM" 
  };

  const iqamahTimes = {
    fajr: "5:45 AM", 
    dhuhr: "1:15 PM",
    dhuhr2: "2:45 PM",
    shafiAsr: "3:45 PM",
    hanafiAsr: "4:45 PM",
    maghrib: "6:15 PM",
    isha: "7:45 PM" 
  };

  // TODO on init make api call to get prayer times

  return (
    <div>
      <div className="relative h-screen overflow-hidden">
        <Image 
          className="absolute inset-0 w-full h-full object-cover animate-zoom-in"
          style={{ transform: "scale(1.1)", transition: "transform 10s ease-in-out" }} // add transform to zoom in and out slowly
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

            <h2 className="text-3xl font-bold mb-10">Daily Prayer Info</h2>
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
                            src={FajrIcon} 
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
                            src={DhuhrIcon} alt="dhuhr_icon"
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
                            src={AsrIcon} alt="asr_icon"
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
                            src={MaghribIcon} alt="maghrib_icon"
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
                          <Image src={IshaIcon} alt="isha_icon" 
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
        
      {/* Section 2 */}
      <section className="w-full py-16 bg-gray-100 text-gray-800 flex justify-center">
          <div className="max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Section 2</h2>
            <p className="text-lg">section for events</p>
          </div>
      </section>
        
      {/* Section 3 */}
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

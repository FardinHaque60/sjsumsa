import Image from "next/image";

import TowerBg from "@/assets/sjsu_tower_bg.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Assuming you have a Footer component

export default function About() {
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

          <h1 className="z-20 text-amber-50 text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-center px-4">
            About
          </h1>
        </div>
        
        {/* msa description */}
        <section className="w-full py-10 bg-gray-100 text-gray-800 flex justify-center">
            <div className="flex flex-col md:flex-row items-center max-w-6xl">
              <div className="w-full md:w-1/2 px-8">
                <Image 
                  src={TowerBg} 
                  alt="MSA About Image" 
                  className="rounded-lg shadow-lg object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 px-8">
                <h2 className="text-3xl font-bold mb-4 mt-4 md:mt-0">What is the SJSU MSA?</h2>
                <p className="text-lg">
                The Muslim Student Association of San Jose State University is dedicated to building an awesome environment of brotherhood and sisterhood on campus
                through social, religious, interfaith, educational and outreach events. Our goal is to promote the true, balanced message of Islam within ourselves 
                and to the general public by being the best possible Muslims we can be in terms of our manners, morale characters, and worship. We hope to achieve 
                this inshAllah through following the Qur&apos;an and example of the Prophet Muhammad (peace be upon him).
                </p>
              </div>
            </div>
        </section>
          
        {/* msa board members */}
        <section className="w-full py-10 bg-white text-gray-800 flex justify-center">
            <div className="max-w-6xl">
              <h2 className="text-3xl font-bold mb-8 text-center">MSA Board Members</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
                {/* First row: 4 members */}
                {["Board Member 1", "Board Member 2", "Board Member 3", "Board Member 4"].map((role, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-24 h-24 p-1 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                      <Image
                        src="/images/board_members/Jordan_Poole.png"
                        alt="Board Member"
                        width={96}
                        height={96}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <p className="mt-4 text-lg font-medium">{role}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Second row: 3 members */}
                {["Board Member 5", "Board Member 6", "Board Member 7"].map((role, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-24 h-24 p-1 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                      <Image
                        src="/images/board_members/Jordan_Poole.png"
                        alt="Board Member"
                        width={96}
                        height={96}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <p className="mt-4 text-lg font-medium">{role}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* <div className="max-w-4xl text-center">
              <h2 className="text-3xl font-bold mb-4">Section 3</h2>
              <p className="text-lg">section for resources (roommate spreadsheet?, student handbook, etc.)</p>
            </div> */}
        </section> 
      </div>

      <Footer />
    </div>
  );
}
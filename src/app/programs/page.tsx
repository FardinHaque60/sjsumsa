import Image from "next/image";

import TowerBg from "@/assets/sjsu_tower_bg.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Programs() {
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

          <h1 className="text-amber-50 z-20 text-4xl sm:text-5xl lg:text-6xl font-bold mb-8">Programs</h1>
        </div>
        
        <div className="w-full max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-700">
              The SJSU Muslim Student Association offers various programs to help students learn, grow, and connect with their faith and community.
            </p>
          </div>

          <div className="space-y-16">
            <section className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-emerald-600 p-4">
                <h2 className="text-2xl font-bold text-white">Arabic Classes</h2>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-semibold mb-3">MSA Weekly Arabic/Tajweed Classes</h3>
                    <p className="text-gray-700 mb-4 whitespace-pre-line">
                      The Prophet (ﷺ) said, &quot;The best among you (Muslims) are those who learn the Qur&apos;an and teach it.&quot;

                      Our Arabic classes cater to students from beginner learners to intermediate learners.
                      Class timings will be chosen to accomodate the majority of students.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <span className="text-emerald-600 font-bold mr-2">•</span>
                        <p><span className="font-medium">Beginner Level:</span> If you can&apos;t read Arabic yet, this is a great opportunity to learn!</p>
                      </div>
                      <div className="flex items-start">
                        <span className="text-emerald-600 font-bold mr-2">•</span>
                        <p><span className="font-medium">Intermediate Level:</span> If you can read Arabic but want to strengthen your Tajweed or brush up on the rules, this class is perfect for you!</p>
                      </div>
                      <div className="flex items-start">
                        {/* <span className="text-emerald-600 font-bold mr-2">•</span> */}
                        <p><span className="font-medium">All classes will be held in person in our prayer room</span> • BBC 001 & BBC 002</p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <a className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded transition duration-300"
                        href="https://docs.google.com/forms/d/e/1FAIpQLSf9YaWj3SsfTkafU6Ixu1UXwbkXBRVwRmMl_jBnEeWUhAl8Bw/viewform"
                        target="_blank"
                        rel="noopener noreferrer">
                        Register for Classes
                      </a>
                    </div>
                  </div>
                  <div className="md:w-1/3 h-1/3 bg-emerald-50 p-6 relative top-5 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">Program Benefits</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="text-emerald-500 mr-2">✓</span>
                        <span>Qualified instructors for both brothers and sisters</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-emerald-500 mr-2">✓</span>
                        <span>Free materials</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-emerald-500 mr-2">✓</span>
                        <span>Flexible schedules</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-600 p-4">
                <h2 className="text-2xl font-bold text-white">Dawah Initiatives</h2>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-semibold mb-3">Spreading Knowledge & Understanding</h3>
                    <p className="text-gray-700 mb-4">
                      Our dawah initiatives aim to spread awareness and understanding of Islam through various programs
                      and activities designed to engage both Muslims and non-Muslims.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-lg mb-1">Events Committee</h4>
                        <p className="text-gray-600 text-sm">Responsible for organizing a variety of Dawah events</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-lg mb-1">Mentorship Committee</h4>
                        <p className="text-gray-600 text-sm">Give advice and guidance to your Muslim Mentee/Buddy according to the Quran and Sunnah</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-lg mb-1">Marketing Committee</h4>
                        <p className="text-gray-600 text-sm">Work to make flyers, strategize new marketing techniques to advertise MSA events and strengthen Dawah presence on campus</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-lg mb-1">Tabling Committee</h4>
                        <p className="text-gray-600 text-sm">Engage table visitors and SJSU students to approach and interact with the table</p>
                      </div>
                    </div>
                    <div>
                      <a className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300"
                         href="https://docs.google.com/forms/d/e/1FAIpQLSdugNm93U50HLNOUWDVTJtIfnH8tZ4lEknUU9rQbWjMKWRqqw/viewform"
                         target="_blank"
                         rel="noopener noreferrer">
                        Get Involved
                      </a>
                    </div>
                  </div>
                  <div className="md:w-1/3">
                    <div className="p-4 rounded-lg h-full flex items-center justify-center">
                      <h4 className="font-semibold text-lg text-center">
                        In our Dawah Initiative, we have created small committees to satisfy different needs the initiative has. Each position under the committee is meant to be flexible with your schedule and have a lower time commitment than being on Board.
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-amber-400 p-4">
                <h2 className="text-2xl font-bold text-white">MTC Initiatives</h2>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-semibold mb-3">Muslim Tech Collaborative</h3>
                    <p className="text-gray-700 mb-4 whitespace-pre-line">
                    The Muslim Tech Collaborative Initiative at SJSU is a plan to help bridge the gap between Muslim tech students and local Muslim tech needs. We will serve as a consulting group that works on technical projects for various different people, organizations, and businesses in our immediate community. 
                    The MSA at SJSU is working on building up this initiative from the ground up and would like the help of the Muslim student body on campus. There will be many different roles that you can take part in as the initiative is developed. Our immediate need is for students with coding experience or students who want to gain experience through projects. 
                    </p>
                    <div className="mt-6">
                      <a className="bg-amber-400 hover:bg-amber-500 text-white py-2 px-4 rounded transition duration-300"
                        href="https://docs.google.com/forms/d/e/1FAIpQLSca6495NQPe7q15QLkgBCJ8WWgOHiV6WjL__cv5KLw7AAQF2g/viewform"
                        target="_blank"
                        rel="noopener noreferrer">
                        Get involved
                      </a>
                    </div>
                  </div>
                  <div className="md:w-1/3 h-1/3 bg-amber-50 p-6 relative top-5 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">Why Join?</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="text-amber-500 mr-2">✓</span>
                        <span>Gain great coding experience</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-amber-500 mr-2">✓</span>
                        <span>Work on projects that have impact</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-amber-500 mr-2">✓</span>
                        <span>Put it on your resume!</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
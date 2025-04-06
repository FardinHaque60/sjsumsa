import React from "react";

const Section3: React.FC = () => {
  return (
    <section className="w-full py-16 bg-white text-gray-800 flex justify-center">
      <div className="max-w-4xl w-full px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Student Resources</h2>
        <p className="text-lg mb-10">
          Useful links and resources to help students succeed and connect in HALAL MODE.
        </p>

        <div className="space-y-6">
          {/* Student Handbook */}
          <div>
            <a
              href="https://sjsumsa.org/handbook.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-xl"
            >
              📘 Student Handbook (PDF)
            </a>
          </div>

          {/* Roommate Finder */}
          <div>
            <p className="text-xl font-semibold mb-2">🏠 Roommate Finder:</p>
            <a
              href="https://docs.google.com/spreadsheets/d/your-brothers-sheet-link"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline block"
            >
              Brothers/Sister Spreadsheet
            </a>
          </div>

          {/* Restaurants Nearby */}
          <div>
            <p className="text-xl font-semibold mb-2">🍽️ Restaurants Nearby:</p>
            <ul className="space-y-1 text-blue-600 underline">
              <li>
                <a
                  href="https://www.google.com/maps/search/halal+restaurants+near+SJSU/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Halal Restaurants on Google Maps
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section3;

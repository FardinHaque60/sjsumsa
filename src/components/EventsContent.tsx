import React, { useEffect, useState } from "react";

import Modal from "@/components/Modal";
import '../app/styles/events.css';

// Event type definition
type EventType = {
  id: number;
  name: string;
  postedDate: string;
  eventDate: string;
  eventTime: string;
  link?: string;
  location?: string;
  note?: string;
  description: string;
};

const EventsContent: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([
    {
      id: 0,
      name: "XXX",
      postedDate: "XX/XX/XXXX",
      eventDate: "XX/XX/XXXX",
      eventTime: "XX:XX AM/PM",
      description: "XXX",
    },
  ]);
  const [selectedEvent, setSelectedEvent] = useState<EventType>(events[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //DB and API rough draft stuff
  useEffect(() => {
    const fetchEvents = async () => {
      const mockData: EventType[] = [
        {
          id: 1,
          name: "Students Iftar",
          postedDate: "04/20/2025",
          eventDate: "04/20/2025",
          eventTime: "2:00 PM",
          link: "https://example.com",
          description: "Join at the Student Center for a community iftar.",
        },
        {
          id: 2,
          name: "Quran Khatem",
          postedDate: "04/20/2025",
          eventDate: "04/20/2025",
          eventTime: "2:00 PM",
          link: "https://example.com",
          description: "Join at the Student Center for a community iftar.",
          location: "Student Center",
          note: "Bring your own Quran.",
        },
      ];
      //sort order by time
      const sorted = mockData.sort(
        (a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
      );
      setEvents(sorted);
    };

    fetchEvents();
  }, []);

  const handleCardClick = (event: EventType) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <section>
      <div className="relative px-5">
        {/* left arrow */}
        {events.length > 3 && (<button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 px-2 py-1 rounded-full shadow-md cursor-pointer hover:bg-gray-400 transition z-10"
          onClick={() => {
            const container = document.getElementById("event-container");
            if (container) container.scrollBy({ left: -333, behavior: "smooth" });
          }}
        >
          &#8592;
        </button>)}

        <div
          id="event-container"
          className="flex overflow-x-scroll gap-4 scroll-smooth no-scrollbar"
        >
          {events.map((event) => (
            <div
              key={event.id}
              className="w-79.25 flex-shrink-0 bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
              style={{ scrollSnapAlign: "start" }}
              onClick={() => handleCardClick(event)}
            >
              <h3 className="font-semibold text-lg mb-2">
                {event.name.length > 50
                  ? `${event.name.slice(0, 50)}...`
                  : event.name}</h3>
              <p className="text-md text-gray-700">Date: {event.eventDate}</p>
              <p className="text-md text-gray-700">Time: {event.eventTime}</p>
            </div>
          ))}
        </div>

        {/* right arrow */}
        {events.length > 3 && (<button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 px-2 py-1 rounded-full shadow-md cursor-pointer hover:bg-gray-400 transition z-10"
          onClick={() => {
            const container = document.getElementById("event-container");
            if (container) container.scrollBy({ left: 333, behavior: "smooth" });
          }}
        >
          &#8594;
        </button>)}

      </div>

      <Modal isOpen={isModalOpen}>
        <div className="flex flex-col bg-white p-6 rounded-lg max-w-md w-full z-60">
          <p className="text-xl text-gray-600">
            {selectedEvent.eventDate} | {selectedEvent.eventTime}
          </p>
          <h2 className="text-3xl font-bold">{selectedEvent.name}</h2>
          <ul className="space-y-3">
            <li className="text-sm text-gray-500">Posted: {selectedEvent.postedDate}</li>
            <li><p className="font-semibold inline">Description: </p>{selectedEvent.description}</li>
            {selectedEvent.link &&
              <li>
              <p className="font-semibold inline">Link: </p><a 
                href={selectedEvent.link} 
                target="_blank" 
                className="mt-2 text-blue-500 hover:underline"
              >
                {selectedEvent.link}
              </a>
              </li>}
            {selectedEvent.location && <li className="mt-2"><p className="font-semibold inline">Location: </p>{selectedEvent.location}</li>}
            {selectedEvent.note && <li className="mt-2"><p className="font-semibold inline">Note: </p>{selectedEvent.note}</li>}
            </ul>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default EventsContent;

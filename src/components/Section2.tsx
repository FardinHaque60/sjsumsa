import React, { useEffect, useState } from "react";

// Event type definition
type EventType = {
  id: number;
  name: string;
  postedDate: string;
  eventDate: string;
  description: string;
};

// Modal component (basic)
const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  event: EventType | null;
}> = ({ isOpen, onClose, event }) => {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="z-50 bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold">{event.name}</h2>
        <p className="text-sm text-gray-500 mb-2">
          Posted: {event.postedDate} | Event: {event.eventDate}
        </p>
        <p>{event.description}</p>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      <div className="fixed inset-0 bg-black opacity-80 z-40"></div>
    </div>
  );
};

const Section2: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //DB and API rough draft stuff
  useEffect(() => {
    const fetchEvents = async () => {
      const mockData: EventType[] = [
        {
          id: 1,
          name: "Jordan POOLES swim party",
          postedDate: "2025-04-01",
          eventDate: "2025-04-20",
          description: "Celebrate spring with live music and food trucks.",
        },
        {
          id: 2,
          name: "steph CURRY cooking class",
          postedDate: "2025-03-25",
          eventDate: "2025-05-02",
          description: "Annual tech conference with guest speakers.",
        },
        {
          id: 3,
          name: "michael JORDAN shoe exhibition",
          postedDate: "2025-03-20",
          eventDate: "2025-04-18",
          description: "Join us for a 5K charity run downtown.",
        },
        {
          id: 4,
          name: "draymond GREEN paint day",
          postedDate: "2025-03-10",
          eventDate: "2025-04-15",
          description: "Explore local art in the downtown gallery district.",
        },
        {
          id: 5,
          name: "russel WESTBRICK construction day",
          postedDate: "2025-02-28",
          eventDate: "2025-06-01",
          description: "Start summer with music, games, and food.",
        },
        {
          id: 6,
          name: "kareem abdul jabbar is old",
          postedDate: "2024-12-01",
          eventDate: "2024-12-15",
          description: "Archived event for browsing history.",
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

  const recentEvents = events.slice(0, 5);
  const olderEvents = events.slice(5);

  return (
    <section className="section2 p-6 bg-[#f8f8f8]">
      <h2 className="text-2xl font-bold mb-6 text-center">Upcoming Events</h2>

      {/* Carousel*/}
      <div className="flex overflow-x-auto gap-4 pb-4">
        {recentEvents.map((event) => (
          <div
            key={event.id}
            className="min-w-[250px] flex-shrink-0 bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
            onClick={() => handleCardClick(event)}
          >
            <h3 className="font-semibold text-lg">{event.name}</h3>
            <p className="text-sm text-gray-500 mb-2">
              Posted: {event.postedDate}
            </p>
            <p className="text-sm text-gray-700">Event: {event.eventDate}</p>
          </div>
        ))}
      </div>

      {/* Expand button to get the older events*/}
      {olderEvents.length > 0 && (
        <div className="mt-6 text-center">
          {!showAll ? (
            <button
              className="text-blue-600 underline"
              onClick={() => setShowAll(true)}
            >
              Show Older Events
            </button>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {olderEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
                  onClick={() => handleCardClick(event)}
                >
                  <h3 className="font-semibold text-lg">{event.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    Posted: {event.postedDate}
                  </p>
                  <p className="text-sm text-gray-700">
                    Event: {event.eventDate}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
      />
    </section>
  );
};

export default Section2;

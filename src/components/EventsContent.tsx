import '../app/styles/events.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

import Modal from "@/components/Modal";
import ToolTip from '@/components/Tooltip';
import { EventInt } from "@/interfaces/eventInt";
import { convertTo12HourTime, convertToDateWithSlashes, getCurrentPSTDate } from '@/lib/dates/dateHelper';

const mockEvent = {
  _id: "000",
  name: "XXX",
  postedDate: "XX/XX/XXXX",
  eventDate: "XX/XX/XXXX",
  eventTime: "XX:XX AM/PM",
  description: "XXX",
}

export default function EventsContent({ isAdmin }: { isAdmin: boolean }) {
  const [events, setEvents] = useState<EventInt[]>([mockEvent]);
  const [selectedEvent, setSelectedEvent] = useState<EventInt>(events[0]);
  const [eventSelected, setEventSelected] = useState(false); // used to open event selection modal
  const [createEventSelected, setCreateEventSelected] = useState(false); // used to open create event modal
  const [newEvent, setNewEvent] = useState<EventInt>(mockEvent);
  const [isLoading, setIsLoading] = useState(false);

  const handleCardClick = (event: EventInt) => {
    setSelectedEvent(event);
    setEventSelected(true);
  };

  const handleCreateEventClick = () => {
    setCreateEventSelected(true);
  };

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  }

  const handleCancelEvent = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault(); // prevents form submission
    const response = window.confirm("Are you sure you want to cancel? Changes will not be saved.");
    if (response) {
      setCreateEventSelected(false);
    }
  }

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    newEvent.postedDate = convertToDateWithSlashes(getCurrentPSTDate().toISOString().split('T')[0]);
    newEvent.eventDate = convertToDateWithSlashes(newEvent.eventDate);
    newEvent.eventTime = convertTo12HourTime(newEvent.eventTime);
    axios.post('/api/events/write', newEvent)
      .then(() => {
        fetchEvents();
        window.alert("Event created successfully!");
      })
      .catch((error) => {
        console.error("CLIENT: error creating event:", error);
      })
      .finally(() => {
        setNewEvent(mockEvent);
        setIsLoading(false);
        setCreateEventSelected(false);
      });
  };

  const handleDeleteEvent = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, eventToDelete: EventInt) => {
    e.stopPropagation();
    const response = window.confirm("Are you sure you want to delete this event?");
    if (response) {
      try {
        const response = await axios.delete(`/api/events/write?_id=${eventToDelete._id}`);
        const eventDeleted = response.data.deleted;
        setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventDeleted._id));
      } catch (error) {
        console.error("CLIENT: error deleting event:", error);
      }
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events/read');
      setEvents(response.data.body);
    } catch (error) {
      console.error("CLIENT: error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <section className="max-w-5xl text-center">
      <div className="flex flex-row items-center justify-center mb-8">
        <h2 className="text-3xl font-bold">Events</h2>
        {isAdmin &&
          <svg onClick={handleCreateEventClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-green-400 ml-1 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>}
      </div>
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
          className="flex overflow-x-scroll gap-4 scroll-smooth no-scrollbar py-2"
        >
          {events.length === 0 ?
            <p className="text-gray-500">No events at the moment. Check back soon!</p>
            :
            <>
              {events.map((event) => (
                <div
                  key={event._id}
                  className="w-79.25 flex-shrink-0 bg-white rounded-lg shadow-md p-4 cursor-pointer event-hover-animation"
                  style={{ scrollSnapAlign: "start" }}
                  onClick={() => handleCardClick(event)}
                >
                  <h3 className="font-semibold text-lg mb-2">
                    {event.name.length > 50
                      ? `${event.name.slice(0, 50)}...`
                      : event.name}</h3>
                  <p className="text-md text-gray-700">Date: {event.eventDate}</p>
                  <p className="text-md text-gray-700">Time: {event.eventTime}</p>
                  <button
                    className="mt-2 px-4 py-2 w-full bg-red-500 text-white rounded cursor-pointer hover:bg-red-600 transition"
                    onClick={(e) => handleDeleteEvent(e, event)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </>
          }
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

      <Modal isOpen={createEventSelected}>
        <div className="flex flex-col bg-white p-6 rounded-lg z-60 min-w-2xl">
          <div className="flex flex-row justify-center">
            <h2 className="text-3xl font-bold mb-4">Create Event</h2>
            <ToolTip text="Link, location, and notes fields are optional. Leave them blank to exclude them.">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
            </ToolTip>
          </div>
          <form onSubmit={handleSaveEvent}>
            <ul className="space-y-4 text-left">
              <li>
                <p className="font-medium inline">Event Title* </p>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                  placeholder="Enter event title"
                  name="name"
                  onChange={handleEventChange}
                  required
                />
              </li>
              <li>
                <p className="font-medium inline">Description*</p>
                <textarea
                  className="border border-gray-300 rounded px-2 py-1 w-full resize-y"
                  placeholder="Enter description"
                  rows={2}
                  name="description"
                  onChange={handleEventChange}
                  required
                />
              </li>
              <li className="flex flex-row space-x-3 items-center">
                <p className="font-medium inline">Event Date*</p>
                <input
                  type="date"
                  className="border border-gray-300 rounded px-2 py-1 w-1/4"
                  name="eventDate"
                  onChange={handleEventChange}
                  required
                />
                <p className="font-medium inline">Event Time*</p>
                <input
                  type="time"
                  className="border border-gray-300 rounded px-2 py-1 w-1/4"
                  name="eventTime"
                  onChange={handleEventChange}
                  required
                />
              </li>
              <li>
                <p className="font-medium inline">Link</p>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                  placeholder="Enter link"
                  name="link"
                  onChange={handleEventChange}
                />
              </li>
              <li>
                <p className="font-medium inline">Location</p>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                  placeholder="Enter location"
                  name="location"
                  onChange={handleEventChange}
                />
              </li>
              <li>
                <p className="font-medium inline">Notes</p>
                <textarea
                  rows={1}
                  className="border border-gray-300 rounded px-2 py-1 w-full resize-y"
                  placeholder="Enter notes"
                  name="note"
                  onChange={handleEventChange}
                />
              </li>
            </ul>
            <div className="flex flex-row mt-4 justify-between space-x-5">
              <button
                className="w-full px-4 py-2 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600 transition"
                onClick={handleCancelEvent}
              >
                Cancel
              </button>
              {isLoading ?
                <svg className="text-gray-300 animate-spin w-full mx-4 my-2" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
                  width="20" height="20">
                  <path
                    d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                    stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path
                    d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                    stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900">
                  </path>
                </svg>
                :
                <button
                  className="w-full px-4 py-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600 transition"
                >
                  Save
                </button>
              }
            </div>
          </form>
        </div>
      </Modal>

      <Modal isOpen={eventSelected}>
        <div className="flex flex-col bg-white p-6 rounded-lg max-w-3xl">
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
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600 transition"
            onClick={() => setEventSelected(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </section>
  );
};

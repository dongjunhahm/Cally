import React from "react";

const MockComputerScreen = () => {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const dates = [13, 14, 15, 16, 17, 18, 19];
  const hours = Array.from({ length: 10 }, (_, i) => i + 6); // 6 AM to 3 PM

  const events = [
    {
      day: 0,
      start: 20,
      end: 21,
      title: "VSA Cab Meeting",
      color: "bg-red-500",
    },
    {
      day: 1,
      start: 10.67,
      end: 11.75,
      title: "CSE 135",
      color: "bg-blue-300",
    },
    {
      day: 1,
      start: 12,
      end: 13.08,
      title: "MATH 23A",
      color: "bg-purple-500",
    },
    {
      day: 2,
      start: 11.67,
      end: 12.92,
      title: "ECON 10A",
      color: "bg-green-500",
    },
    {
      day: 2,
      start: 12,
      end: 13.08,
      title: "MATH 23A",
      color: "bg-purple-500",
    },
    {
      day: 2,
      start: 20,
      end: 21,
      title: "KASA General Meeting",
      color: "bg-red-500",
    },
    {
      day: 3,
      start: 10.67,
      end: 11.75,
      title: "CSE 135",
      color: "bg-blue-300",
    },
    {
      day: 3,
      start: 12,
      end: 13.08,
      title: "MATH 23A",
      color: "bg-purple-500",
    },
    {
      day: 3,
      start: 15.33,
      end: 16.33,
      title: "135 Section",
      color: "bg-blue-300",
    },
    {
      day: 4,
      start: 11.67,
      end: 12.92,
      title: "ECON 10A",
      color: "bg-green-500",
    },
    {
      day: 5,
      start: 10.67,
      end: 11.75,
      title: "CSE 135",
      color: "bg-blue-300",
    },
    {
      day: 5,
      start: 12,
      end: 13.08,
      title: "MATH 23A",
      color: "bg-purple-500",
    },
  ];

  const specialDays = [
    { day: 1, title: "Columbus Day", color: "bg-green-700" },
    { day: 1, title: "Indigenous Peoples' Day", color: "bg-green-700" },
  ];

  const getEventStyle = (event, overlappingEvents) => {
    const top = (event.start - 6) * 60;
    const height = (event.end - event.start) * 60;
    const width = 100 / 7 / overlappingEvents.length;
    const left =
      (event.day / 7) * 100 + width * overlappingEvents.indexOf(event);
    return {
      top: `${top}px`,
      height: `${height}px`,
      left: `${left}%`,
      width: `${width}%`,
    };
  };

  const getOverlappingEvents = (currentEvent) => {
    return events.filter(
      (event) =>
        event.day === currentEvent.day &&
        ((event.start >= currentEvent.start && event.start < event.end) ||
          (event.end > currentEvent.start && event.end <= currentEvent.end) ||
          (event.start <= currentEvent.start && event.end >= currentEvent.end))
    );
  };

  return (
    <div className="relative w-full aspect-[16/9] m-4">
      <div className="w-full h-full max-w-[95vw] max-h-[48vw] m-4">
        <div className="bg-gray-800 rounded-t-xl p-4 flex items-center justify-between">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-white font-semibold">Google Calendar</div>
          <div className="w-4"></div>
        </div>
        <div
          className="bg-white border-4 border-gray-800 rounded-b-xl p-4 overflow-hidden"
          style={{ height: "calc(100% - 56px)" }}
        >
          <div className="flex mb-2">
            <div className="w-16"></div>
            {days.map((day, index) => (
              <div key={day} className="flex-1 text-center font-semibold">
                <div>{day}</div>
                <div
                  className={`text-2xl ${index === 0 ? "text-blue-500" : ""}`}
                >
                  {dates[index]}
                </div>
              </div>
            ))}
          </div>
          <div className="relative" style={{ height: "calc(100% - 40px)" }}>
            {hours.map((hour) => (
              <div
                key={hour}
                className="flex border-t border-gray-200"
                style={{ height: "10%" }}
              >
                <div className="w-16 text-right pr-2 text-sm text-gray-500">
                  {hour % 12 || 12} {hour < 12 ? "AM" : "PM"}
                </div>
                {days.map((day) => (
                  <div
                    key={`${day}-${hour}`}
                    className="flex-1 border-l border-gray-200"
                  ></div>
                ))}
              </div>
            ))}
            {events.map((event, index) => {
              if (event.start < 15) {
                // Only show events before 3 PM
                const overlappingEvents = getOverlappingEvents(event);
                return (
                  <div
                    key={index}
                    className={`absolute p-1 text-xs text-white overflow-hidden ${event.color}`}
                    style={getEventStyle(event, overlappingEvents)}
                  >
                    {event.title}
                  </div>
                );
              }
              return null;
            })}
            {specialDays.map((day, index) => (
              <div
                key={`special-${index}`}
                className={`absolute p-1 text-xs text-white overflow-hidden ${day.color}`}
                style={{
                  top: "0px",
                  height: "20px",
                  left: `${(day.day / 7) * 100}%`,
                  width: `${100 / 7}%`,
                }}
              >
                {day.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockComputerScreen;

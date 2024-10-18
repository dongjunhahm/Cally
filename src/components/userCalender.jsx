import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

document.addEventListener('DOMContentLoaded', async function() {
    let calendarEl = document.getElementById('calendar');

    // Assume you have the user's auth token available in a variable
    const userToken = 'YOUR_AUTH_TOKEN'; // Replace this with your actual token

    // Fetch events from Google Calendar
    const fetchEvents = async () => {
        const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        return data.items; // This returns the list of events
    };

    try {
        const events = await fetchEvents();

        // Map Google Calendar events to FullCalendar event format
        const fullCalendarEvents = events.map(event => ({
            title: event.summary, // Use the appropriate property for title
            start: event.start.dateTime || event.start.date, // Use dateTime or date based on event
            end: event.end.dateTime || event.end.date, // Use dateTime or date based on event
        }));

        // Initialize FullCalendar with the fetched events
        let calendar = new Calendar(calendarEl, {
            plugins: [dayGridPlugin],
            events: fullCalendarEvents, // Pass the events to FullCalendar
            // other options here
        });

        calendar.render();
    } catch (error) {
        console.error('Error fetching events:', error);
    }
});

//test
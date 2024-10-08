import { google } from "googleapis";
import { useGoogleApi } from "react-gapi";

export default async function handler(req, res) {
  try {
    const { eventDetails, token } = req.body;

    console.log("plswork", token);
    const event = eventDetails;
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: token });
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: eventDetails,
    });

    console.log("Event created:", response.data);

    res.status(200).json({ message: "Event created", event: response.data });
  } catch (err) {
    console.error("Error creating event:", err.message);
    res.status(500).json({ error: "Error creating event" });
  }
}

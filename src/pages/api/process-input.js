import axios from "axios";

// pages/api/process-input.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }
  try {
    const { input } = req.body;

    if (!input) {
      return res
        .status(500)
        .json({ error: "There wasn't an input attached with the request." });
    }

    console.log("input recieved", input);
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `Format the response as JSON attributes: { summary: event_name, location: location || "", description: guests ? Guests: {guests.join(", ")} : "", start: { dateTime: time || new Date().toISOString(), timezone: "PST" }, end: { dateTime: time ? new Date(new Date(time).getTime() + 60 * 60 * 1000).toISOString() : new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(), timezone: "PST" }}`,
          },
          {
            role: "assistant",
            content: `Extract event details from the following input: ${input}`,
          },
        ],
        response_format: { type: "json_object" },
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    const gptResponse = response.data.choices[0].message.content;
    console.log(
      "feedback from gpt was",
      response.data.choices[0].message.content
    );

    if (response.status === 200 && response.data) {
      console.log(response.data.usage);
      res.status(200).json({ gptResponse });
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while processing the input." });
  }
}

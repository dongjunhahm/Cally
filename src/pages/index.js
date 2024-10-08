"use client";
import axios from "axios";
import { Typewriter } from "../components/typewriter";
import { useState } from "react";
import { googleSignIn } from "../services/googleLogin";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [userToken, setUserToken] = useState("");

  const handleSubmit = async () => {
    console.log(inputValue);
    const response = await axios.post("/api/process-input", {
      input: inputValue,
    });
    console.log("full response", response.data);
    const eventDetails = response.data.gptResponse;
    if (response.status === 200) {
      console.log("Response was successful and status code is 200.");
      console.log("Data looks like: " + eventDetails);
    }

    console.log("we are so back", userToken);

    const newApiResponse = await axios.post("/api/create-event", {
      eventDetails,
      token: userToken,
    });

    console.log(newApiResponse);
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleGoogle = async () => {
    const result = await googleSignIn();

    if (result) {
      const { token } = result;
      console.log(token);
      setUserToken(token);
    }
  };

  return (
    <>
      <div>
        <button onClick={handleGoogle} className="btn btn-outline btn-success">
          Login
        </button>
      </div>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInput}
          onKeyDown={handleKeyPress}
          placeholder="Enter Details to Get Started"
        ></input>
        <p> You Entered : {inputValue} </p>
        <Typewriter></Typewriter>
      </div>
    </>
  );
}

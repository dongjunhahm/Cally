"use client";
import axios from "axios";
import Head from "next/head";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/services/firebaseConfig";
import { Typewriter } from "../components/typewriter";
import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");

  const handleInputSubmit = async (e) => {
    try {
      const obj = {
        message: inputValue,
      };
      const response = await fetch("/api/process-input", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ obj }),
      });
      if (response.ok) {
        console.log("saved");
        const eventDetails = await response.json();
        console.log(eventDetails);
        setInputValue("");
      } else {
        console.error("Error processing input", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleInputSubmit();
    }
  };

  const handleGoogle = async (e) => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      const user = result.user;

      console.log("user info", user);
      console.log("Access Token:", token);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used
      const email = error.customData.email;
      // The AuthCredential type that was used
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.error("Error Code:", errorCode);
      console.error("Error Message:", errorMessage);
      console.error("Email:", email);
      console.error("Credential:", credential);
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

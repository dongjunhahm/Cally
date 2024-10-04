"use client";

import Head from "next/head";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/services/firebaseConfig";
import { Typewriter } from "../components/typewriter";
import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");

  const handleInput = async (e) => {
    setInputValue(e.target.value);
    try {
      const response = await fetch("/services/process-input", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
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
        <input type="text" value={inputValue} onInput={handleInput}></input>
        <p> You Entered : {inputValue} </p>
        <Typewriter></Typewriter>
      </div>
    </>
  );
}

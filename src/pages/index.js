"use client";
import axios from "axios";
import { Typewriter } from "../components/typewriter";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import LoginOverlay from "../components/loginOverlay";
import MockComputerScreen from "../components/computerScreen";

import "../styles/globals.css";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [userToken, setUserToken] = useState("");
  const [user, setUser] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [animationState, setAnimationState] = useState("");
  const [showLoginOverlay, setShowLoginOverlay] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setShowLoginOverlay(false);
      } else {
        setUser(null);
        setShowLoginOverlay(true);
      }
    });

    // Auto-logout on page refresh
    const handleBeforeUnload = () => {
      signOut(auth);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      unsubscribe();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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

    const newApiResponse = await axios.post("/api/create-event", {
      eventDetails,
      token: userToken,
    });
    console.log(newApiResponse);

    setShowSuccess(true);
    setAnimationState("grow");

    setTimeout(() => {
      setAnimationState("shrink");

      setTimeout(() => {
        setShowSuccess(false);
        setAnimationState("");
      }, 500);
    }, 2000);
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

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setUser(null);
      setShowLoginOverlay(true);
    });
  };

  return (
    <div className="bg-white min-h-screen w-full relative overflow-hidden fullscreen-container">
      <div className="skewed relative w-full h-full">
        <MockComputerScreen />
        <div className="absolute top-0 left-0 right-0 bottom-0 backdrop-blur-sm bg-white bg-opacity-60 p-8 rounded-lg shadow-xl z-10"></div>
      </div>

      <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center z-10">
        {" "}
        {/* Full-screen content container */}
        {user && (
          <button
            onClick={handleLogout}
            className="btn btn-ghost text-gray-700 transition-transform duration-200 hover:scale-95 fixed top-4 right-4 z-50"
          >
            Logout
          </button>
        )}
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <h1
              className="text-8xl font-bold uppercase tracking-tighter text-gray-950 mb-4"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Cally
            </h1>
            {showSuccess && (
              <div className={`absolute -top-4 -right-4 ${animationState}`}>
                <span className="indicator-item badge badge-success"></span>
              </div>
            )}
          </div>

          <input
            type="text"
            value={inputValue}
            onChange={handleInput}
            onKeyDown={handleKeyPress}
            placeholder="Enter Details to Get Started"
            className="input input-bordered border-gray-300 w-full max-w-xs bg-white text-black mb-2 text-center"
            style={{ padding: "0.5rem", width: "300px" }}
          />
          <p className="text-gray-700 mb-2">You Entered: {inputValue}</p>
          <Typewriter />
        </div>
        {showLoginOverlay && <LoginOverlay setUserToken={setUserToken} />}
      </div>
    </div>
  );
};

export default Home;

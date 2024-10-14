import React, { useState } from "react";
import { googleSignIn } from "../pages/api/googleLogin";

const LoginOverlay = ({ setUserToken }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogle = async () => {
    setIsLoading(true);
    try {
      const result = await googleSignIn();
      if (result) {
        const { token } = result;
        console.log(token);
        setUserToken(token);
      }
    } catch (error) {
      console.error("Error during Google Sign In:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-700 tracking-tighter">
          Sign in to get started.
        </h2>
        <button
          onClick={handleGoogle}
          disabled={isLoading}
          className="btn btn-outline btn-ghost opacity-80 btn-circle w-full transition-transform duration-200 hover:scale-95"
        >
          {isLoading ? "Logging in..." : "Click me!"}
        </button>
      </div>
    </div>
  );
};

export default LoginOverlay;

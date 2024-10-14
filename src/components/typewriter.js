// src/components/typewriter.jsx
import { useState, useEffect } from "react";

const exampleInput = [
  "Pitch with Jason, Ryan, Tommy, Daniel @ 12:30pm @ Stanford University",
  "Meeting ta at toyon 2pm to 3pm",
  "lunch with jae jun and jason at 1230pm at sweet maple",
  "dinner at 7pm",
  "help make mom's gift at 3pm",
];

export const Typewriter = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (subIndex === exampleInput[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1500);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % exampleInput.length);
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
      },
      reverse ? 40 : 40
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500); // <-- set blinking speed, in ms

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="inline-block">
        <p className="inter text-gray-700 inline relative mr-5 font-normal text-sm">
          {exampleInput[index].substring(0, subIndex)}
          <span
            className={`absolute right-0 bottom-0 w-5 h-1font-bold ${
              blink ? "opacity-100" : "opacity-0"
            }`}
          ></span>
        </p>
      </div>
    </>
  );
};

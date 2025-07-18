import React from "react";
import "./Notification.css";
import { useEffect } from "react";
import { useState } from "react";

function Notification({ message, onClose }) {
  const [exitAnimation, setExitAnimation] = useState(false);

  useEffect(() => {
    let timerId;
    if (message) {
      timerId = setTimeout(() => {
        setExitAnimation(true);
        setTimeout(() => {
          onClose();
        }, 3000);
      }, 500);
    }
    return () => clearTimeout(timerId);
  }, [onClose, message]);

  return (
    <div className={`notification ${exitAnimation ? "exit-animation" : ""}`}>
      {message}
    </div>
  );
}

export default Notification;

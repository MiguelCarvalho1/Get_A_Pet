import React, { useEffect, useState } from "react";
import bus from "../../utils/bus";




import styles from "./Message.module.css";

function Message() {
  const [visibility, setVisibility] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    bus.addListener("flash", ({ message, type }) => {
      setVisibility(true);
      setMessage(message);
      setType(type);
      setTimeout(() => {
        setVisibility(false);
      }, 4000); // Hide message after 4 seconds
    });
  }, []);

  return (
    visibility && (
      <div className={`${styles.message} ${styles[type]}`}>{message}</div> // Display message with specific styling
    )
  );
}

export default Message;

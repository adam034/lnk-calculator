import React from "react";
import "../style/button.css";
const Keypad = (props) => {
  return (
    <button
      className={`${props.className}`}
      onClick={() => props.onClick(props.keyValue)}
    >
      {props.keyValue}{" "}
    </button>
  );
};
export default Keypad;

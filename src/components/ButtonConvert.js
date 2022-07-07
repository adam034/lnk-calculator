import React from "react";
import "../style/button-convert.css";
const ButtonConvert = (props) => {
  return (
    <button
      className="button-convert"
      onClick={() => props.onClick(props.keyValue)}
    >
      {props.keyValue}{" "}
    </button>
  );
};
export default ButtonConvert;

import React from "react";
import css from "./Button.module.css";

function getButtonClass(type, isVisible) {
  if (type === "+") return css.addBtn;
  if (type === "-")
    return isVisible ? `${css.removeBtn} ${css.visible}` : css.removeBtn;
}

const Button = ({ type, style, size, onClick, isVisible }) => {
  console.log("render Buttons");

  let buttonClass = getButtonClass(type, isVisible);

  return (
    <button
      style={{
        ...style,
        width: size + "px",
        height: size + "px",
        lineHeight: size + "px",
      }}
      className={buttonClass}
      onClick={onClick}
    >
      {type}
    </button>
  );
};

export default Button;

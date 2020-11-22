import React from "react";
import css from "./Button.module.css";

const Button = ({ type, style, size, onClick, isVisible }) => {
  size = size + "px";
  let buttonClass;
  if (type === "+") {
    buttonClass = css.addBtn;
  } else if (type === "-") {
    buttonClass = css.removeBtn;
  }

  buttonClass = isVisible ? `${buttonClass} ${css.visible}` : buttonClass;

  return (
    <button
      style={{
        ...style,
        width: size,
        height: size,
        lineHeight: size,
      }}
      className={buttonClass}
      onClick={onClick}
    >
      {type}
    </button>
  );
};

export default Button;

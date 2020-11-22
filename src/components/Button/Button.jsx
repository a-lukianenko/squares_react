import React from "react";
import css from "./Button.module.css";

const Button = ({ type, style, cellSize, onClick, isVisible }) => {
  const size = cellSize + "px";

  let buttonType;
  if (type === "+") {
    buttonType = css.addBtn;
  } else if (type === "-") {
    buttonType = css.removeBtn;
  }

  const buttonClass = isVisible ? `${buttonType} ${css.visible}` : buttonType;

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

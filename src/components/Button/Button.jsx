import React from "react";
import css from "./Button.module.css";

const Button = ({
  type,
  cellSize,
  top,
  left,
  right,
  bottom,
  boxShadow,
  handleClick,
  isVisible,
}) => {
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
        top,
        left,
        right,
        bottom,
        width: size,
        height: size,
        lineHeight: size,
        boxShadow,
      }}
      className={buttonClass}
      onClick={handleClick}
    >
      {type}
    </button>
  );
};

export default Button;

import React from "react";
import css from "./Button.module.css";

const Button = ({
  type,
  className,
  cellSize,
  top,
  left,
  handleClick,
  isVisible,
}) => {
  const size = cellSize + "px";

  const s = isVisible ? `${css[className]} ${css.visible}` : css[className];

  return (
    <button
      style={{
        top: top,
        left: left,
        width: size,
        height: size,
        lineHeight: size,
      }}
      className={s}
      onClick={handleClick}
    >
      {type}
    </button>
  );
};

export default Button;

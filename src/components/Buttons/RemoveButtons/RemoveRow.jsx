import React from "react";
import classes from "./RemoveButtons.module.css";

const RemoveRowButton = ({
  offset,
  isVisible,
  initialWidth,
  removeRow,
  buttonLeave,
}) => {
  let className = isVisible
    ? `${classes.removeRow} ${classes.visible}`
    : classes.removeRow;

  const size = initialWidth + "px";

  return (
    <div
      className={className}
      style={{ top: offset, width: size, height: size, lineHeight: size }}
      onClick={removeRow}
      onMouseLeave={buttonLeave}
    >
      -
    </div>
  );
};

export default RemoveRowButton;

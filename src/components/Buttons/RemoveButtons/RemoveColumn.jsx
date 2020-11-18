import React from "react";
import classes from "./RemoveButtons.module.css";

const RemoveColumnBtn = ({
  offset,
  isVisible,
  initialWidth,
  removeColumn,
  buttonLeave,
}) => {
  const className = isVisible
    ? `${classes.removeColumn} ${classes.visible}`
    : classes.removeColumn;

  const size = initialWidth + "px";

  return (
    <div
      className={className}
      style={{ left: offset, width: size, height: size, lineHeight: size }}
      onClick={removeColumn}
      onMouseLeave={buttonLeave}
    >
      -
    </div>
  );
};

export default RemoveColumnBtn;

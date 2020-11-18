import React from "react";
import classes from "./RemoveButtons.module.css";

const RemoveColumnBtn = ({ offset, removeColumn, isVisible }) => {
  const className = isVisible
    ? `${classes.removeColumn} ${classes.visible}`
    : classes.removeColumn;

  return (
    <div className={className} style={{ left: offset }} onClick={removeColumn}>
      -
    </div>
  );
};

export default RemoveColumnBtn;

import React from "react";
import classes from "./RemoveButtons.module.css";

const RemoveRowButton = ({ offset, removeRow, isVisible }) => {
  const className = isVisible
    ? `${classes.removeRow} ${classes.visible}`
    : classes.removeRow;

  return (
    <div className={className} style={{ top: offset }} onClick={removeRow}>
      -
    </div>
  );
};

export default RemoveRowButton;

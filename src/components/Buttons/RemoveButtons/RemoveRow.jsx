import React from "react";
import classes from "./RemoveButtons.module.css";

const RemoveRowButton = ({ offset, removeRow, isVisible }) => {
  let className = isVisible
    ? `${classes.removeRow} ${classes.visible}`
    : classes.removeRow;

  function handleRemoveRow() {
    removeRow();
  }

  return (
    <div
      className={className}
      style={{ top: offset }}
      onClick={handleRemoveRow}
    >
      -
    </div>
  );
};

export default RemoveRowButton;

import React from "react";
import classes from "./AddButtons.module.css";

const AddRowBtn = ({ initialWidth, addRow }) => {
  const size = initialWidth + "px";

  return (
    <div
      style={{
        width: size,
        height: size,
        lineHeight: size,
      }}
      className={classes.addRow}
      onClick={addRow}
    >
      +
    </div>
  );
};

export default AddRowBtn;

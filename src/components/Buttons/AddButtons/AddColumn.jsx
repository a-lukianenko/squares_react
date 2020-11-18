import React from "react";
import classes from "./AddButtons.module.css";

const AddColumnBtn = ({ initialWidth, addColumn }) => {
  const size = initialWidth + "px";

  return (
    <div
      style={{
        width: size,
        height: size,
        lineHeight: size,
      }}
      className={classes.addColumn}
      onClick={addColumn}
    >
      +
    </div>
  );
};

export default AddColumnBtn;

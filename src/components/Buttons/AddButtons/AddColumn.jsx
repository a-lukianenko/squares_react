import React from "react";
import classes from "./AddButtons.module.css";

const AddColumnBtn = ({ addColumn }) => {
  return (
    <div className={classes.addColumn} onClick={addColumn}>
      +
    </div>
  );
};

export default AddColumnBtn;

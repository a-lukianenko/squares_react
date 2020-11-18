import React from "react";
import classes from "./AddButtons.module.css";

const AddRowBtn = ({ addRow }) => {
  return (
    <div className={classes.addRow} onClick={addRow}>
      +
    </div>
  );
};

export default AddRowBtn;

import React from "react";
import Table from "./components/Table/Table";
import AddRowBtn from "./components/Buttons/AddButtons/AddRow";
import AddColumnBtn from "./components/Buttons/AddButtons/AddColumn";
import RemoveColumnBtn from "./components/Buttons/RemoveButtons/RemoveColumn";
import RemoveRowBtn from "./components/Buttons/RemoveButtons/RemoveRow";
import "./App.css";

function App() {
  class State {
    constructor() {
      this.rowsNum = 4;
      this.cellsNum = 4;
      this.rows = [...Array(this.rowsNum).keys()].map(el => ({ id: el }));
      this.cells = [...Array(this.cellsNum).keys()].map(el => ({ id: el }));
      this.left = 0;
      this.top = 0;
      this.rowKey = 0;
      this.cellKey = 0;
      this.removeColumnVisibility = false;
      this.removeRowVisibility = false;
    }
  }
  const initialState = new State();

  const [state, setState] = React.useState(initialState);

  function addRow() {
    setState(state => ({
      ...state,
      rowsNum: state.rowsNum + 1,
      rows: [...Array(state.rowsNum + 1).keys()].map(el => ({ id: el })),
    }));
  }

  function addColumn() {
    setState(state => ({
      ...state,
      cellsNum: state.cellsNum + 1,
      cells: [...Array(state.cellsNum + 1).keys()].map(el => ({ id: el })),
    }));
  }

  function moveButtonX(offset, cellKey) {
    setState(state => ({
      ...state,
      left: offset + 2 + "px",
      cellKey,
      removeRowVisibility: true,
    }));
  }

  function moveButtonY(offset, rowKey) {
    setState(state => ({
      ...state,
      top: offset + 2 + "px",
      rowKey,
      removeColumnVisibility: true,
    }));
  }

  function removeRow() {
    const newRows = state.rows.filter(row => row.id !== state.rowKey);
    setState(state => ({
      ...state,
      rowsNum: state.rowsNum - 1,
      rows: newRows,
    }));
  }

  function removeColumn() {
    const newCells = state.cells.filter(cell => cell.id !== state.cellKey);
    setState(state => ({
      ...state,
      cellsNum: state.cellsNum - 1,
      cells: newCells,
    }));
  }

  return (
    <div className='squaresWrapper'>
      <Table
        rows={state.rows}
        cells={state.cells}
        moveButtonX={moveButtonX}
        moveButtonY={moveButtonY}
      />
      <AddRowBtn addRow={addRow} />
      <AddColumnBtn addColumn={addColumn} />
      <RemoveRowBtn
        offset={state.top}
        removeRow={removeRow}
        isVisible={state.removeColumnVisibility}
      />
      <RemoveColumnBtn
        offset={state.left}
        removeColumn={removeColumn}
        isVisible={state.removeColumnVisibility}
      />
    </div>
  );
}

export default App;

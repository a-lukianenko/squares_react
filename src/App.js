import React from "react";
import SuperTable from "./components/SuperTable/SuperTable";
import "./App.css";

function App() {
  return <SuperTable initialWidth={4} initialHeight={4} cellSize={50} />;
}

export default App;

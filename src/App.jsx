import React from "react";
import CountdownLoader from "./components/CountdownLoader";
import "./App.css";

function App() {
  return (
    <div className="app-viewport">
      <CountdownLoader initialCount={10} intervalMs={1000} />
    </div>
  );
}

export default App;
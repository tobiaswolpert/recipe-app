import "./sass/main.scss";
import { useState } from "react";
import Header from "./components/header.components";
import Results from "./components/results.component";
import React from "react";

function App() {
  const [query, setQuery] = useState("");
  console.log("App", query);

  return (
    <div className="App">
      <Header setInput={setQuery} />
      <Results input={query} />
    </div>
  );
}

export default App;

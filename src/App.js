import "./sass/main.scss";
import { useState } from "react";
import Header from "./components/header.components";
import Results from "./components/results.component";
import React from "react";

function App() {
  const [query, setQuery] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  console.log("Bookmarks", bookmarks);

  return (
    <div className="App">
      <Header setQuery={setQuery} bookmarks={bookmarks} />
      <Results
        query={query}
        setBookmarks={setBookmarks}
        bookmarks={bookmarks}
      />
    </div>
  );
}

export default App;

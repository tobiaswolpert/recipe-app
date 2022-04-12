import "../../sass/main.scss";
import { useState } from "react";
import Header from "../../routes/header/header.component";
import Result from "../../components/results.component";
import React from "react";

function Home() {
  const [query, setQuery] = useState("");
  const [bookmarks, setBookmarks] = useState([]);

  return (
    <div className="App">
      <Header setQuery={setQuery} bookmarks={bookmarks} />
      <Result query={query} setBookmarks={setBookmarks} bookmarks={bookmarks} />
    </div>
  );
}

export default Home;

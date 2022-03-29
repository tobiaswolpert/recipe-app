import React, { useState } from "react";

const Header = () => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
  };

  return (
    <header className="header">
      <div className="logo">
        <div className="logo__container">
          <ion-icon name="fast-food-outline"></ion-icon>
        </div>
        <div className="logo__text">Food App</div>
      </div>

      <form className="search" onSubmit={handleSubmit}>
        <input
          className="search__input"
          type="text"
          placeholder="Search over 1.000.000 recipes..."
          value={search}
          onChange={(e) => {
            setSearch(() => e.target.value);
          }}
        ></input>
        <button className="search__button">
          <ion-icon name="search-outline"></ion-icon>
          <div className="search__button--text">Search</div>
        </button>
      </form>

      <div className="control">
        <div className="recipe">
          <ion-icon name="book-outline"></ion-icon>
          <div className="recipe__text">Add recipe</div>
        </div>

        <div className="bookmark">
          <ion-icon name="bookmark-outline"></ion-icon>
          <div className="bookmark__text">Bookmarks</div>
        </div>
      </div>
    </header>
  );
};

export default Header;

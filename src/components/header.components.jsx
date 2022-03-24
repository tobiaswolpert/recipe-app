import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <ion-icon name="fast-food-outline"></ion-icon>
        <div className="logo__text">Food App</div>
      </div>

      <div className="search">
        <input className="search__input"></input>
        <button className="search__button">
          <ion-icon name="search-outline"></ion-icon>
          <div className="search__button--text">Search</div>
        </button>
      </div>

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

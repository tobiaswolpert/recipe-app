import React from "react";

(async () => {
  try {
    const result = await fetch(
      "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886"
    );
    const data = await result.json();
    console.log(result);
    console.log("Data", data);

    let { recipe } = data.data;
    recipe = {
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };
    console.log(recipe);

    if (!result.ok) {
      throw new Error(`${data.error}. Error: ${result.status}`);
    }
  } catch (err) {
    alert(err);
  }
})();

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <div className="logo__container">
          <ion-icon name="fast-food-outline"></ion-icon>
        </div>
        <div className="logo__text">Food App</div>
      </div>

      <form className="search">
        <input
          className="search__input"
          type="text"
          placeholder="Search over 1.000.000 recipes..."
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

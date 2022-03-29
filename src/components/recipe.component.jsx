import { useState, useEffect } from "react";

const Recipe = () => {
  const [recipeData, setRecipeData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886"
      );
      const data = await result.json();
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
      setRecipeData(recipe);
    };
    fetchData();
  }, []);

  const recipeList = recipeData.ingredients
    ? recipeData.ingredients.map((item) => (
        <li>
          {item.quantity} {item.unit} {item.description}
        </li>
      ))
    : null;

  console.log(recipeData);

  return (
    <div className="container__detail">
      <div
        className="container__detail--img"
        style={{ backgroundImage: `url(${recipeData.image})` }}
      >
        <div className="container__detail--name">{recipeData.title}</div>
      </div>

      <div className="container__detail--individual">
        <div className="container__detail--pair">
          <ion-icon name="time-outline"></ion-icon>
          <div>
            <strong>{recipeData.cookingTime}</strong> Minutes
          </div>
        </div>

        <div className="container__detail--pair">
          <ion-icon name="people-outline"></ion-icon>
          <div>
            <strong>{recipeData.servings}</strong> Servings
          </div>
          <ion-icon name="remove-circle-outline"></ion-icon>
          <ion-icon name="add-circle-outline"></ion-icon>
        </div>

        <div className="container__detail--pair">
          <div className="container__detail--circle">
            <ion-icon name="person-outline"></ion-icon>
          </div>
          <div className="container__detail--circle">
            <ion-icon name="bookmark-outline"></ion-icon>
          </div>
        </div>
      </div>

      <div className="container__detail--ingredients">
        <h1>Recipe Ingredients</h1>
        <ul className="container__detail--list">{recipeList}</ul>
      </div>

      <div className="cooking">
        <h1>How to cook it</h1>
        <p>
          This recipe was carefully designed and tested by{" "}
          {recipeData.publisher}. Please check out directions at their website
        </p>
        <button>Directions</button>

        <p className="last">
          Start by searching for a recipe or an ingredient. Have fun!
        </p>
      </div>
    </div>
  );
};

export default Recipe;

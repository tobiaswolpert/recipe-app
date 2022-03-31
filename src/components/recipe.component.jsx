import { useState, useEffect } from "react";
import Spinner from "../img/refresh-outline.svg";

const Recipe = () => {
  const [recipeData, setRecipeData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
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
      setIsLoading(false);
    };
    setTimeout(() => fetchData(), 1000);
  }, []);

  const recipeList = recipeData.ingredients
    ? recipeData.ingredients.map((item) => (
        <div className="recipe__list--item">
          <ion-icon name="checkmark-outline"></ion-icon>
          <li>
            {item.quantity} {item.unit} {item.description}
          </li>
        </div>
      ))
    : null;

  console.log(recipeData);

  return isLoading ? (
    <div className="recipe loading">
      <div className="spinner">
        <img src={Spinner} alt="Spinner" />
      </div>
    </div>
  ) : (
    <div className="recipe">
      <div
        className="recipe__img"
        style={{ backgroundImage: `url(${recipeData.image})` }}
      >
        <div className="recipe__name">{recipeData.title}</div>
      </div>
      <div className="recipe__detail">
        <div className="recipe__detail--pair">
          <ion-icon name="time-outline"></ion-icon>
          <div>
            <strong>{recipeData.cookingTime}</strong> Minutes{" "}
          </div>
        </div>

        <div className="recipe__detail--pair">
          <ion-icon name="people-outline"></ion-icon>
          <div>
            <strong>{recipeData.servings}</strong> Servings
          </div>
          <ion-icon name="remove-circle-outline"></ion-icon>
          <ion-icon name="add-circle-outline"></ion-icon>
        </div>

        <div className="recipe__detail--pair">
          <div className="recipe__circle">
            <ion-icon name="person-outline"></ion-icon>
          </div>
          <div className="recipe__circle">
            <ion-icon name="bookmark-outline"></ion-icon>
          </div>
        </div>
      </div>
      <div className="recipe__ingredients">
        <h1>Recipe Ingredients</h1>
        <ul className="recipe__list">{recipeList}</ul>
      </div>
      <div className="cooking">
        <h1>How to cook it</h1>
        <p>
          This recipe was carefully designed and tested by{" "}
          <strong> {recipeData.publisher}</strong>. Please check out directions
          at their website
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

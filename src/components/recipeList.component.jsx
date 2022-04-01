import { useState, useEffect } from "react";

const RecipeList = () => {
  const [recipes, setRecipes] = useState({});

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza`
      );
      const data = await res.json();
      const { recipes } = data.data;
      console.log(recipes);
      setRecipes(recipes);
    };
    fetchRecipe();
  }, []);

  console.log(recipes);

  const RecipeList = recipes
    ? recipes.map((item) => {
        return (
          <div className="recipeList__item">
            <img
              className="recipeList__image"
              src={item.image_url}
              alt="Recipe"
            />
            <div className="recipeList__description">
              <div className="recipeList__title">{item.title}</div>
              <div className="recipeList__publisher">{item.publisher}</div>
            </div>
          </div>
        );
      })
    : null;

  return <div className="recipeList">{RecipeList.slice(0, 10)}</div>;
};

export default RecipeList;

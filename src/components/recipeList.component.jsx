import { useState, useEffect } from "react";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [RecipeList, setRecipeList] = useState([]);
  let [page, setPage] = useState(1);
  let [total, setTotal] = useState(0);
  let [range, setRange] = useState([0, 10]);

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza`
      );
      const data = await res.json();
      const { recipes } = data.data;
      console.log("recipes", recipes);
      setRecipes(recipes);
    };
    fetchRecipe();
  }, []);

  useEffect(() => {
    const RecipeList = recipes.length
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
      : [];
    setRecipeList(RecipeList);
    setTotal(Math.ceil(RecipeList.length / 10));
  }, [recipes]);

  console.log("Page Details", page);

  const forward = () => {
    if (page < total) {
      setPage((prev) => prev + 1);
      setRange([range[0] + 10, range[1] + 10]);
    }
  };

  const backward = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      setRange([range[0] - 10, range[1] - 10]);
    }
  };

  return (
    <div className="recipeList">
      {RecipeList.slice(range[0], range[1])}
      <div className="recipeList__pagination">
        <button className="recipeList__pagination--button" onClick={backward}>
          <ion-icon name="arrow-back-outline"></ion-icon>
        </button>
        <div>
          {page} / {total}
        </div>
        <button className="recipeList__pagination--button" onClick={forward}>
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </button>
      </div>
    </div>
  );
};

export default RecipeList;

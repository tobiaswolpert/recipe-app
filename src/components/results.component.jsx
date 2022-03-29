import React, { useState, useEffect } from "react";

const Results = () => {
  const [recipeData, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);

  console.log("1 Before useEffect", isLoading);

  useEffect(() => {
    const fetchData = async () => {
      console.log("1.5 Fetch started", isLoading);
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
      console.log("Async Test", recipe.ingredients[0]);
      setData(recipe);
      setIsLoading(false);
    };
    setIsLoading(true);
    fetchData();
    console.log("2 During useEffect", isLoading);
  }, []);

  // console.log("Hook 1", recipeData);
  // console.log("Ingredients", recipeData.ingredients[0]);
  console.log("3 Render", recipeData.ingredients, isLoading);

  // const result;

  // if (recipeData.ingredients !== undefined) {
  //   console.log("4", recipeData.ingredients[0]);
  //   recipeData.ingredients.forEach((item, idx) => console.log(idx, item));
  // }
  return (
    <div className="container">
      <div className="container__results">Hallo</div>

      {isLoading ? (
        <div>Loading</div>
      ) : (
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
            <div className="container__detail--list">
              <ul className="container__detail--ingredient">
                {/* <li>{recipeData.ingredients[0]}</li> */}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;

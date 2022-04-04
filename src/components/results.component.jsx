import RecipeList from "./recipeList.component";
import Recipe from "./recipe.component";
import { useState, useEffect } from "react";

const Result = (props) => {
  const [recipes, setRecipes] = useState([]);
  let [item, setItem] = useState();
  let [id, setId] = useState();

  useEffect(() => {
    const fetchData = async (param) => {
      const result = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${param}`
      );
      const data = await result.json();
      const { recipes } = data.data;

      setRecipes(recipes);
    };
    fetchData(props.input);
    setId();
    setItem();
  }, [props.input]);

  useEffect(() => {
    if (item !== undefined) {
      setId(recipes[item].id);
    } else return;
  }, [item]);

  return (
    <div className="container">
      <RecipeList recipes={recipes} setItem={setItem} />
      <Recipe id={id} />
    </div>
  );
};

export default Result;

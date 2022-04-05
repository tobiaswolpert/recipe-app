import RecipeList from "./recipeList.component";
import Recipe from "./recipe.component";
import { useState, useEffect } from "react";

const Result = (props) => {
  const [recipes, setRecipes] = useState([]);
  let [item, setItem] = useState();
  let [id, setId] = useState();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { input } = props;

  useEffect(() => {
    const fetchData = async (param) => {
      setIsLoading(true);
      try {
        const result = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes?search=${param}`
        );
        const data = await result.json();
        const { recipes } = data.data;
        setRecipes(recipes);
      } catch (error) {
        setHasError(true);
      }
      setIsLoading(false);
    };
    fetchData(input);
    setId();
    setItem();
  }, [input]);

  useEffect(() => {
    if (recipes !== undefined && item !== undefined) {
      setId(recipes[item].id);
    }
  }, [recipes, item]);

  return (
    <div className="container">
      <RecipeList recipes={recipes} setItem={setItem} />
      <Recipe id={id} />
    </div>
  );
};

export default Result;

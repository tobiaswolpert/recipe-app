import RecipeList from "./recipeList.component";
import Recipe from "./recipe.component";
import { useState, useEffect } from "react";
import { API_URL } from "../utils/config";
import { getJSON } from "../utils/helpers";

const Result = (props) => {
  const [recipes, setRecipes] = useState([]);
  let [item, setItem] = useState();
  let [id, setId] = useState();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { query, setBookmarks, bookmarks } = props;

  useEffect(() => {
    let didCancel = false;
    setId();
    setItem();

    const fetchData = async (param) => {
      if (didCancel) return;
      setIsLoading(true);
      setHasError(false);

      try {
        const data = await getJSON(`${API_URL}?search=${param}`);

        const { recipes } = data.data;
        console.log("recipes", recipes);
        const recipeIngredients = await Promise.all(
          recipes.map((item) => getJSON(`${API_URL}/${item.id}`))
        );
        console.log("RecipeIngredients", recipeIngredients);
        setRecipes(recipes);
      } catch (error) {
        setHasError(true);
      }
      setIsLoading(false);
    };
    fetchData(query);

    return () => {
      didCancel = true;
    };
  }, [query]);

  useEffect(() => {
    if (recipes !== undefined && item !== undefined) {
      setId(recipes[item].id);
    }
  }, [recipes, item]);

  return (
    <div className="container">
      <RecipeList recipes={recipes} setItem={setItem} />
      <Recipe setBookmarks={setBookmarks} bookmarks={bookmarks} />
    </div>
  );
};

export default Result;

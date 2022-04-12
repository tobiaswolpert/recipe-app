import { useState, useEffect } from "react";
import Spinner from "../img/refresh-outline.svg";
import { API_URL } from "../utils/config";
import { getJSON } from "../utils/helpers";
import { useParams } from "react-router-dom";

const Recipe = (props) => {
  const [recipeData, setRecipeData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { setBookmarks, bookmarks } = props;
  const [outline, setOutline] = useState("");
  let { id } = useParams();

  useEffect(() => {
    if (bookmarks.includes(id)) {
      setOutline("bookmark");
    } else {
      setOutline("bookmark-outline");
    }
  }, [bookmarks, id]);

  useEffect(() => {
    let didCancel = false;

    const loadRecipe = async (id) => {
      if (didCancel) return;
      setIsLoading(true);
      setHasError(false);

      try {
        if (!id) throw new Error();
        const data = await getJSON(`${API_URL}/${id}`);

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
      } catch (error) {
        setHasError(true);
      }
      setIsLoading(false);
    };

    loadRecipe(id);

    return () => {
      didCancel = true;
    };
  }, [id]);

  const recipeList = recipeData.ingredients
    ? recipeData.ingredients.map((item, idx) => (
        <div className="recipe__list--item" key={idx}>
          <ion-icon name="checkmark-outline"></ion-icon>
          <li key={idx}>
            {item.quantity} {item.unit} {item.description}
          </li>
        </div>
      ))
    : null;

  const changeServings = (e) => {
    if (e.target.name.includes("remove") && recipeData.servings > 1) {
      setRecipeData((prevData) => ({
        ...prevData,
        servings: prevData.servings - 1,
        ingredients: prevData.ingredients.map((item) => ({
          ...item,
          quantity: item.quantity
            ? (item.quantity / prevData.servings) * (prevData.servings - 1)
            : null,
        })),
      }));
    } else if (e.target.name.includes("add")) {
      setRecipeData((prevData) => ({
        ...prevData,
        servings: prevData.servings + 1,
        ingredients: prevData.ingredients.map((item) => ({
          ...item,
          quantity: item.quantity
            ? (item.quantity / prevData.servings) * (prevData.servings + 1)
            : null,
        })),
      }));
    }
  };

  const bookmark = () => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter((el) => el !== id));
    } else {
      setBookmarks([...bookmarks, id]);
    }
  };

  if (hasError && !id && !isLoading) {
    return (
      <div className="recipe error">
        Start by Searching for a recipe or an ingredient. Have fun!
      </div>
    );
  } else if (hasError && id && !isLoading) {
    return (
      <div className="recipe error">
        We could not find that recipe. Please try another one!
      </div>
    );
  } else {
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
            <ion-icon
              name="remove-circle-outline"
              onClick={(e) => changeServings(e)}
            ></ion-icon>
            <ion-icon
              name="add-circle-outline"
              onClick={(e) => changeServings(e)}
            ></ion-icon>
          </div>

          <div className="recipe__detail--pair">
            <div className="recipe__circle">
              <ion-icon name="person-outline"></ion-icon>
            </div>
            <div className="recipe__circle" onClick={bookmark}>
              <ion-icon name={outline}></ion-icon>
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
            <strong> {recipeData.publisher}</strong>. Please check out
            directions at their website
          </p>
          <button>Directions</button>

          <p className="last">
            Start by searching for a recipe or an ingredient. Have fun!
          </p>
        </div>
      </div>
    );
  }
};

export default Recipe;

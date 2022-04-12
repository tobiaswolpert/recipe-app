import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RecipeList = (props) => {
  const [RecipeList, setRecipeList] = useState([]);
  let [page, setPage] = useState(1);
  let [total, setTotal] = useState(1);
  let [range, setRange] = useState([0, 10]);
  let { setItem, recipes } = props;
  let navigate = useNavigate();

  useEffect(() => {
    const RecipeList = recipes.length
      ? recipes.map((item, idx) => {
          return (
            <div
              className="recipeList__item"
              key={idx}
              onClick={() => {
                setItem(idx);
                navigate(`/${item.id}`);
              }}
            >
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
    setPage(1);
    setRange([0, 10]);
    RecipeList.length
      ? setTotal(Math.ceil(RecipeList.length / 10))
      : setTotal(1);
  }, [recipes, setItem]);

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
      {RecipeList.length ? (
        <div className="recipeList__pagination">
          <button
            className="recipeList__pagination--button"
            onClick={backward}
            style={{ visibility: page === 1 ? "hidden" : "visible" }}
          >
            <ion-icon name="arrow-back-outline"></ion-icon>
          </button>

          <div>
            {page} / {total}
          </div>
          <button
            className="recipeList__pagination--button"
            onClick={forward}
            style={{ visibility: page === total ? "hidden" : "visible" }}
          >
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default RecipeList;

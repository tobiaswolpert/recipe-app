import { useEffect, useState } from "react";
import { getJSON } from "../utils/helpers";
import { API_URL } from "../utils/config";

const Header = (props) => {
  const [search, setSearch] = useState("");
  const [bookmarkList, setBookmarkList] = useState([]);
  const [show, setShow] = useState(false);

  const { setQuery, bookmarks } = props;

  useEffect(() => {
    const fetchBookmarks = async (bookmarks) => {
      try {
        const res = await Promise.all(
          bookmarks.map((item) => getJSON(`${API_URL}/${item}`))
        );
        const recipe = res.map((item) => item.data.recipe);
        console.log(recipe);
        setBookmarkList(recipe);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBookmarks(bookmarks);
  }, [bookmarks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClick = () => {
    if (bookmarkList.length) {
      setShow(!show);
    } else {
      return null;
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <div className="logo__container">
          <ion-icon name="fast-food-outline"></ion-icon>
        </div>
        <div className="logo__text">Food App</div>
      </div>

      <form className="search" onSubmit={handleSubmit}>
        <input
          className="search__input"
          type="text"
          placeholder="Search over 1.000.000 recipes..."
          value={search}
          onChange={handleOnChange}
        ></input>
        <button className="search__button">
          <ion-icon name="search-outline"></ion-icon>
          <div className="search__button--text">Search</div>
        </button>
      </form>

      <div className="control">
        <div className="control__add">
          <ion-icon name="book-outline"></ion-icon>
          <div className="control__text">Add recipe</div>
        </div>

        <div className="control__bookmark" onClick={handleClick}>
          <ion-icon name={show ? "bookmark" : "bookmark-outline"}></ion-icon>
          <div className="control__text">Bookmarks</div>
        </div>
      </div>

      <div className={show ? "bookmark_list" : "bookmark_list invisible"}>
        {bookmarkList.map((item) => (
          <li className="bookmark_list--item">
            <img
              className="bookmark_list--img"
              src={item.image_url}
              alt={item.title}
            />
            <div className="bookmark_list--details">
              <div className="bookmark_list--title">{item.title}</div>
              <div className="bookmark_list--publisher">{item.publisher}</div>
            </div>
          </li>
        ))}
      </div>
    </header>
  );
};

export default Header;

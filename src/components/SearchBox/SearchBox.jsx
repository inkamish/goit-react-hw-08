import styles from "./SearchBox.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../redux/filterSlice";

const SearchBox = () => {
  const filter = useSelector((state) => state.filter?.name || "");
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div className={styles.searchContainer}>
      <label htmlFor="filter">Find contacts by name</label>
      <input
        className={styles.input}
        type="text"
        id="filter"
        value={filter}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBox;

import { NavLink } from "react-router-dom";
import clsx from "clsx";
import styles from "./Navigation.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const buildLink = ({ isActive }) => {
    return clsx(styles.link, isActive && styles.active);
  };

  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={buildLink}>
        Home
      </NavLink>
      {isLoggedIn && <NavLink to="/contacts">Contacts</NavLink>}
    </nav>
  );
};
export default Navigation;

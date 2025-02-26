import { useSelector } from "react-redux";

import Navigation from "../Navigation/Navigation";
import AuthNav from "../AuthNav/AuthNav.jsx";
import UserMenu from "../UserMenu/UserMenu";
import styles from "./AppBar.module.css";

import { selectIsLoggedIn } from "../../redux/auth/selectors";

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className={styles.header}>
      <div>
        <Navigation />
      </div>
      <div>{isLoggedIn ? <UserMenu /> : <AuthNav />}</div>
    </header>
  );
};

export default AppBar;

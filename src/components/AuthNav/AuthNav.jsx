import { NavLink } from "react-router-dom";
import styles from "./AuthNav.module.css";

const AuthNav = () => {
  return (
    <div className={styles.nav}>
      <NavLink to="/registration">Register</NavLink>
      <NavLink to="/login">Login</NavLink>
    </div>
  );
};

export default AuthNav;

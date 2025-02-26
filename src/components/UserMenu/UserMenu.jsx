import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import styles from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.container}>
      <p className={styles.welcomeText}>Welcome, {user?.name || "Guest"}</p>
      <button className={styles.btn} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;

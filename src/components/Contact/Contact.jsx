import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";
import styles from "./Contact.module.css";
import { selectIsLoading } from "../../redux/selectors";

const Contact = ({ contact: { id, name, number } }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  const isLoading = useSelector(selectIsLoading);

  return (
    <div className={styles.contact}>
      <p>{name}</p>
      <p>{number}</p>
      <button
        className={styles.btn}
        type="button"
        onClick={handleDelete}
        disabled={isLoading}
      >
        Delete
      </button>
    </div>
  );
};

export default Contact;

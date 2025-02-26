import { fetchContacts } from "../redux/contacts/operations";
import { selectIsLoading, selectError } from "../redux/contacts/selectors";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ContactsPage.module.css";

import ContactForm from "../components/ContactForm/ContactForm";
import ContactList from "../components/ContactList/ContactList";
import SearchBox from "../components/SearchBox/SearchBox";
import Loader from "../components/Loader/Loader";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      {isLoading && <Loader />}
      {error && <p>Error: {error}</p>}
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
};

export default ContactsPage;

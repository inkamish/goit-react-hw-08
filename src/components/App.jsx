import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import SearchBox from "./SearchBox/SearchBox";
import { container, title } from "./App.module.css";
import { fetchContacts } from "../redux/contactsOps";
import { selectIsLoading, selectError } from "../redux/selectors";
import Loader from "./Loader/Loader";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={container}>
      <h1 className={title}>Phonebook</h1>
      {isLoading && <Loader />}
      {error && <p>Error: {error}</p>}
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
}

export default App;

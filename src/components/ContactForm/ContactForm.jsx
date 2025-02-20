import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import styles from "./ContactForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addContactToServer } from "../../redux/contactsOps";
import { selectIsLoading, selectError } from "../../redux/selectors";

const ContactForm = () => {
  const nameId = useId();
  const numberId = useId();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must not exceed 50 characters")
      .required("Name is required"),
    number: Yup.string()
      .min(7, "Number must be at least 7 characters")
      .max(15, "Number must not exceed 15 characters")
      .required("Phone number is required"),
  });

  const initialValues = {
    name: "",
    number: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(
        addContactToServer({
          name: values.name,
          number: values.number,
        })
      ).unwrap();
      resetForm();
    } catch (error) {
      console.error("Failed to add contact:", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form autoComplete="off" className={styles.form}>
        <div className={styles.formElement}>
          <label htmlFor={nameId}>Name</label>
          <Field className={styles.input} id={nameId} name="name" />
          <ErrorMessage className={styles.error} name="name" component="span" />
        </div>
        <div className={styles.formElement}>
          <label htmlFor={numberId}>Phone Number</label>
          <Field
            className={styles.input}
            id={numberId}
            name="number"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "");
            }}
          />
          <ErrorMessage
            className={styles.error}
            name="number"
            component="span"
          />
        </div>
        <button type="submit" className={styles.btn} disabled={isLoading}>
          Add Contact
        </button>

        {error && <p className={styles.error}>Error: {error}</p>}
      </Form>
    </Formik>
  );
};

export default ContactForm;
